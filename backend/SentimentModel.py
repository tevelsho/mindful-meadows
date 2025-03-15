from transformers import pipeline
import torch
print("PyTorch version:", torch.__version__)
print("CUDA available:", torch.cuda.is_available())
print("Device count:", torch.cuda.device_count())
if torch.cuda.is_available():
    print("GPU Name:", torch.cuda.get_device_name(0))
device = 0 if torch.cuda.is_available() else -1  # 0 for GPU, -1 for CPU
classifier = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base", device=device)

text = "I feel grateful for everything that happened today."
result = classifier(text)
print(result)
