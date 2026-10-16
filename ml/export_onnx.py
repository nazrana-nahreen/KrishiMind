import shutil
from pathlib import Path
import torch
import torch.nn as nn
from torchvision import models
import onnx

def main():
    models_dir = Path("models")
    model_pt = models_dir / "model.pt"
    model_onnx = models_dir / "model.onnx"
    public_onnx = Path("frontend/public/model.onnx")

    m = models.mobilenet_v3_small(weights=None)
    m.classifier[3] = nn.Linear(m.classifier[3].in_features, 4)
    m.load_state_dict(torch.load(model_pt, map_location="cpu"))
    m.eval()

    dummy = torch.randn(1, 3, 224, 224)
    
    # Export using legacy exporter to get single self-contained protobuf file
    torch.onnx.export(
        m,
        dummy,
        str(model_onnx),
        export_params=True,
        input_names=["input"],
        output_names=["output"],
        opset_version=13,
        do_constant_folding=True,
        dynamo=False,
    )
    
    # Verify model with onnx
    model_proto = onnx.load(str(model_onnx))
    onnx.checker.check_model(model_proto)
    
    # Remove any stray .data file if created
    data_file = models_dir / "model.onnx.data"
    if data_file.exists():
        data_file.unlink()

    shutil.copy2(model_onnx, public_onnx)
    print("SUCCESS: Exported single-file self-contained ONNX to", model_onnx, "and", public_onnx)
    print("Size:", public_onnx.stat().st_size, "bytes")

if __name__ == "__main__":
    main()
