"""MobileNetV3-Small transfer learning with pathology-preserving augmentation,
CosineAnnealingLR schedule, label smoothing, and automatic self-contained ONNX export."""
import json
import shutil
import time
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
import torch
import torch.nn as nn
from sklearn.metrics import classification_report, confusion_matrix
from torch.utils.data import DataLoader
from torchvision import datasets, models, transforms

SPLIT = Path("data/split")
MODELS = Path("models")
DOCS = Path("docs")
PUBLIC = Path("frontend/public")
IMG, BS, SEED = 224, 32, 42
EPOCHS_HEAD, EPOCHS_FT = 4, 14
MEAN, STD = [0.485, 0.456, 0.406], [0.229, 0.224, 0.225]


def make_loaders():
    train_tf = transforms.Compose([
        transforms.Resize((IMG, IMG)),
        transforms.RandomHorizontalFlip(p=0.5),
        transforms.RandomVerticalFlip(p=0.3),
        transforms.RandomRotation(degrees=15),
        # Subtle lighting variations without shifting disease hues:
        transforms.ColorJitter(brightness=0.12, contrast=0.15),
        transforms.ToTensor(),
        transforms.Normalize(MEAN, STD),
    ])
    eval_tf = transforms.Compose([
        transforms.Resize((IMG, IMG)),
        transforms.ToTensor(),
        transforms.Normalize(MEAN, STD),
    ])
    tfs = {"train": train_tf, "val": eval_tf, "test": eval_tf}
    ds = {s: datasets.ImageFolder(SPLIT / s, tfs[s]) for s in tfs}
    dl = {s: DataLoader(ds[s], batch_size=BS, shuffle=(s == "train"), num_workers=2)
          for s in ds}
    return ds, dl


def run_epoch(model, loader, loss_fn, device, opt=None):
    training = opt is not None
    model.train(training)
    total_loss = correct = n = 0
    with torch.set_grad_enabled(training):
        for x, y in loader:
            x, y = x.to(device), y.to(device)
            out = model(x)
            loss = loss_fn(out, y)
            if training:
                opt.zero_grad()
                loss.backward()
                opt.step()
            total_loss += loss.item() * len(y)
            correct += (out.argmax(1) == y).sum().item()
            n += len(y)
    return total_loss / n, correct / n


def fit(model, dl, loss_fn, device, params, lr, epochs, best, tag):
    opt = torch.optim.AdamW(params, lr=lr, weight_decay=1e-4)
    scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(opt, T_max=epochs, eta_min=1e-6)
    for ep in range(1, epochs + 1):
        t0 = time.time()
        tl, ta = run_epoch(model, dl["train"], loss_fn, device, opt)
        vl, va = run_epoch(model, dl["val"], loss_fn, device)
        scheduler.step()
        mark = ""
        # Save model if validation accuracy is best, or equal with lower loss
        if va > best["acc"] or (va == best["acc"] and vl < best["loss"]):
            best["acc"] = va
            best["loss"] = vl
            torch.save(model.state_dict(), MODELS / "model.pt")
            mark = "  <- best"
        print(f"[{tag}] ep {ep:02d}/{epochs:02d}  train_acc {ta:.3f}  val_acc {va:.3f}  "
              f"val_loss {vl:.3f}  {time.time() - t0:.1f}s{mark}", flush=True)


def evaluate(model, dl, classes, device):
    model.eval()
    ys, ps = [], []
    with torch.no_grad():
        for x, y in dl["test"]:
            ps += model(x.to(device)).argmax(1).cpu().tolist()
            ys += y.tolist()
    text = classification_report(ys, ps, target_names=classes, digits=3)
    print("\nFINAL TEST RESULTS\n" + text)
    rep = classification_report(ys, ps, target_names=classes, output_dict=True)
    cm = confusion_matrix(ys, ps)

    metrics = {
        "accuracy": rep["accuracy"],
        "macro_f1": rep["macro avg"]["f1-score"],
        "per_class": {c: {k: rep[c][k] for k in ("precision", "recall", "f1-score", "support")}
                      for c in classes},
        "confusion_matrix": cm.tolist(),
    }
    (MODELS / "metrics.json").write_text(json.dumps(metrics, indent=2))

    fig, ax = plt.subplots(figsize=(6, 5))
    ax.imshow(cm, cmap="Greens")
    ax.set_xticks(range(len(classes)), classes, rotation=30, ha="right")
    ax.set_yticks(range(len(classes)), classes)
    for i in range(len(classes)):
        for j in range(len(classes)):
            ax.text(j, i, cm[i, j], ha="center", va="center",
                    color="white" if cm[i, j] > cm.max() / 2 else "black")
    ax.set_xlabel("Predicted")
    ax.set_ylabel("True")
    ax.set_title(f"Confusion matrix (test acc {rep['accuracy']:.3f})")
    fig.tight_layout()
    fig.savefig(DOCS / "confusion_matrix.png", dpi=150)
    fig.savefig(PUBLIC / "confusion_matrix.png", dpi=150)


def export_onnx(model, device):
    """Export self-contained ONNX model for client-side in-browser inference."""
    model.eval()
    dummy = torch.randn(1, 3, IMG, IMG).to(device)
    model_onnx = MODELS / "model.onnx"
    public_onnx = PUBLIC / "model.onnx"
    
    torch.onnx.export(
        model,
        dummy,
        str(model_onnx),
        export_params=True,
        input_names=["input"],
        output_names=["output"],
        opset_version=13,
        do_constant_folding=True,
        dynamo=False,
    )
    # Remove any stray .data file if created
    data_file = MODELS / "model.onnx.data"
    if data_file.exists():
        data_file.unlink()

    shutil.copy2(model_onnx, public_onnx)
    print(f"ONNX Model exported: {public_onnx} ({public_onnx.stat().st_size} bytes)")


def main():
    torch.manual_seed(SEED)
    MODELS.mkdir(exist_ok=True)
    DOCS.mkdir(exist_ok=True)
    PUBLIC.mkdir(exist_ok=True)
    device = "cuda" if torch.cuda.is_available() else "cpu"
    ds, dl = make_loaders()
    classes = ds["train"].classes
    (MODELS / "classes.json").write_text(json.dumps(classes))
    print("device:", device, "| classes:", classes, "| train images:", len(ds["train"]))

    model = models.mobilenet_v3_small(weights=models.MobileNet_V3_Small_Weights.DEFAULT)
    model.classifier[3] = nn.Linear(model.classifier[3].in_features, len(classes))
    model.to(device)

    counts = np.bincount(ds["train"].targets)
    w = torch.tensor(counts.sum() / (len(classes) * counts), dtype=torch.float32)
    loss_fn = nn.CrossEntropyLoss(weight=w.to(device), label_smoothing=0.08)

    best = {"acc": 0.0, "loss": float("inf")}
    
    print("\n--- Phase 1: Classifier Head Training ---")
    for p in model.features.parameters():
        p.requires_grad = False
    fit(model, dl, loss_fn, device, model.classifier.parameters(), 1e-3, EPOCHS_HEAD, best, "head")
    
    print("\n--- Phase 2: End-to-End Fine-Tuning with Cosine Annealing ---")
    for p in model.parameters():
        p.requires_grad = True
    fit(model, dl, loss_fn, device, model.parameters(), 1.5e-4, EPOCHS_FT, best, "finetune")

    # Load best checkpoint
    model.load_state_dict(torch.load(MODELS / "model.pt", map_location=device))
    evaluate(model, dl, classes, device)
    export_onnx(model, device)


if __name__ == "__main__":
    main()