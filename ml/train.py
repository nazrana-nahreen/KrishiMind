"""MobileNetV3-Small transfer learning.
Phase 1: শুধু নতুন head train, Phase 2: পুরো model fine-tune.
Test set শুধু শেষে একবার ব্যবহার হয়।"""
import json
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
IMG, BS, SEED = 224, 32, 42
EPOCHS_HEAD, EPOCHS_FT = 3, 8
MEAN, STD = [0.485, 0.456, 0.406], [0.229, 0.224, 0.225]


def make_loaders():
    train_tf = transforms.Compose([
        transforms.RandomResizedCrop(IMG, scale=(0.7, 1.0)),
        transforms.RandomHorizontalFlip(),
        transforms.RandomVerticalFlip(),
        transforms.RandomRotation(20),
        transforms.ColorJitter(0.2, 0.2, 0.2),
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
    opt = torch.optim.AdamW(params, lr=lr)
    for ep in range(1, epochs + 1):
        t = time.time()
        tl, ta = run_epoch(model, dl["train"], loss_fn, device, opt)
        vl, va = run_epoch(model, dl["val"], loss_fn, device)
        mark = ""
        if va > best["acc"]:
            best["acc"] = va
            torch.save(model.state_dict(), MODELS / "model.pt")
            mark = "  <- best"
        print(f"[{tag}] ep {ep}/{epochs}  train {ta:.3f}  val {va:.3f}  "
              f"val_loss {vl:.3f}  {time.time() - t:.0f}s{mark}", flush=True)


def evaluate(model, dl, classes, device):
    model.eval()
    ys, ps = [], []
    with torch.no_grad():
        for x, y in dl["test"]:
            ps += model(x.to(device)).argmax(1).cpu().tolist()
            ys += y.tolist()
    text = classification_report(ys, ps, target_names=classes, digits=3)
    print("\nTEST RESULTS\n" + text)
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


def main():
    torch.manual_seed(SEED)
    MODELS.mkdir(exist_ok=True)
    DOCS.mkdir(exist_ok=True)
    device = "cuda" if torch.cuda.is_available() else "cpu"
    ds, dl = make_loaders()
    classes = ds["train"].classes
    (MODELS / "classes.json").write_text(json.dumps(classes))
    print("device:", device, "| classes:", classes, "| train:", len(ds["train"]))

    model = models.mobilenet_v3_small(weights=models.MobileNet_V3_Small_Weights.DEFAULT)
    model.classifier[3] = nn.Linear(model.classifier[3].in_features, len(classes))
    model.to(device)

    counts = np.bincount(ds["train"].targets)
    w = torch.tensor(counts.sum() / (len(classes) * counts), dtype=torch.float32)
    loss_fn = nn.CrossEntropyLoss(weight=w.to(device))

    best = {"acc": 0.0}
    for p in model.features.parameters():
        p.requires_grad = False
    fit(model, dl, loss_fn, device, model.classifier.parameters(), 1e-3, EPOCHS_HEAD, best, "head")
    for p in model.parameters():
        p.requires_grad = True
    fit(model, dl, loss_fn, device, model.parameters(), 1e-4, EPOCHS_FT, best, "finetune")

    model.load_state_dict(torch.load(MODELS / "model.pt", map_location=device))
    evaluate(model, dl, classes, device)


if __name__ == "__main__":
    main()