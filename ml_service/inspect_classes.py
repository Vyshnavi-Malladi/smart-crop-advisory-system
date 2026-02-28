import torch

try:
    checkpoint = torch.load('models/cnn_resnet18_final.pth', map_location='cpu')
    class_names = checkpoint.get('class_names', [])
    print("Class Names found in model:")
    for name in class_names:
        print(f"'{name}'")
except Exception as e:
    print(f"Error inspecting model: {e}")
