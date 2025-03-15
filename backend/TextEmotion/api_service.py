from fastapi import FastAPI
import uvicorn
from pydantic import BaseModel
from TextEmotion import TextEmotion

app = FastAPI()

text_emotion = TextEmotion()

# Define the model for the expected request body
class TextRequest(BaseModel):
    text: str

@app.post("/predict")
async def predict(request: TextRequest):
    # Use the text from the request body
    return text_emotion.predict(request.text)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
