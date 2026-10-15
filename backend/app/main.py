"""KrishiMind API: ছবি -> রোগ prediction + Grad-CAM heatmap."""
import base64
import io
import json
import threading
from contextlib import asynccontextmanager
from pathlib import Path

import matplotlib
import numpy as np
import torch
import torch.nn as nn
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, UnidentifiedImageError
from torchvision import models, transforms

ROOT = Path(__file__).resolve().parents[2]
MODELS = ROOT / "models"
IMG = 224
THRESHOLD = 0.70            # এর নিচে হলে "নিশ্চিত নই"
MAX_BYTES = 8 * 1024 * 1024
ALLOWED = {"image/jpeg", "image/png", "image/webp"}

TF = transforms.Compose([
    transforms.Resize((IMG, IMG)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]),
])
state: dict = {}
lock = threading.Lock()   # Grad-CAM hook shared model-এ চলে, তাই এক সময়ে একটা request


@asynccontextmanager
async def lifespan(app: FastAPI):
    classes = json.loads((MODELS / "classes.json").read_text())
    m = models.mobilenet_v3_small(weights=None)
    m.classifier[3] = nn.Linear(m.classifier[3].in_features, len(classes))
    m.load_state_dict(torch.load(MODELS / "model.pt", map_location="cpu"))
    m.eval()
    state["model"], state["classes"] = m, classes
    yield


app = FastAPI(title="KrishiMind API", version="1.0", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def infer(x: torch.Tensor):
    """একবার forward + backward: probabilities আর Grad-CAM map দুটোই পাওয়া যায়।"""
    model, store = state["model"], {}

    def hook(_, __, out):
        store["act"] = out
        out.register_hook(lambda g: store.update(grad=g))

    h = model.features[-1].register_forward_hook(hook)
    try:
        with lock, torch.enable_grad():
            logits = model(x)
            idx = int(logits.argmax(1))
            model.zero_grad(set_to_none=True)
            logits[0, idx].backward()
    finally:
        h.remove()
    probs = torch.softmax(logits.detach(), dim=1)[0]
    w = store["grad"].mean(dim=(2, 3), keepdim=True)
    cam = torch.relu((w * store["act"]).sum(1, keepdim=True))
    cam = torch.nn.functional.interpolate(
        cam, size=(IMG, IMG), mode="bilinear", align_corners=False)[0, 0].detach().numpy()
    cam = (cam - cam.min()) / (cam.max() - cam.min() + 1e-8)
    return probs, idx, cam


def overlay_b64(img: Image.Image, cam: np.ndarray) -> str:
    heat = matplotlib.colormaps["jet"](cam)[..., :3]
    base = np.asarray(img.resize((IMG, IMG)), dtype=np.float32) / 255
    mix = (0.55 * base + 0.45 * heat).clip(0, 1)
    buf = io.BytesIO()
    Image.fromarray((mix * 255).astype(np.uint8)).save(buf, "PNG")
    return "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode()


@app.get("/health")
def health():
    return {"status": "ok", "model_loaded": "model" in state}


@app.get("/classes")
def classes():
    return state["classes"]


@app.get("/metrics")
def metrics():
    return json.loads((MODELS / "metrics.json").read_text())


@app.post("/predict")
def predict(file: UploadFile = File(...), explain: bool = True):
    if file.content_type not in ALLOWED:
        raise HTTPException(415, "শুধু JPG, PNG বা WEBP ছবি দিন")
    data = file.file.read(MAX_BYTES + 1)
    if len(data) > MAX_BYTES:
        raise HTTPException(413, "ছবি ৮ MB-এর বেশি")
    try:
        img = Image.open(io.BytesIO(data)).convert("RGB")
    except (UnidentifiedImageError, OSError):
        raise HTTPException(400, "ছবিটি পড়া যাচ্ছে না")

    probs, idx, cam = infer(TF(img).unsqueeze(0))
    conf = float(probs[idx])
    return {
        "label": state["classes"][idx],
        "confidence": conf,
        "uncertain": conf < THRESHOLD,
        "probabilities": {c: float(p) for c, p in zip(state["classes"], probs)},
        "heatmap": overlay_b64(img, cam) if explain else None,
    }