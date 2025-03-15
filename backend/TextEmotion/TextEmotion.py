from transformers import pipeline
import torch


class TextEmotion:
    def __init__(self):
        device = 0 if torch.cuda.is_available() else -1  

        if torch.cuda.is_available():
            print("GPU Name:", torch.cuda.get_device_name(0))
            
        self.classifier = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base", device=device)
    def predict(self, text):
        return self.classifier(text)
    
