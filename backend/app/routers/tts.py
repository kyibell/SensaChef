import uvicorn
from functools import lru_cache
from fastapi import APIRouter
from dotenv import load_dotenv
from pydantic import BaseModel
import config
import boto3
import os

#load the environment variables
load_dotenv()
AWS_AK = os.environ.get("AWS_AK")
AWS_SAK = os.environ.get("AWS_SAK")
router = APIRouter()

#load config settings
@lru_cache()
def get_settings():
    return config.Settings()

#class for text input as well as output audio file type
class Text(BaseModel):
    content: str
    output_format: str


#synthesize speech
@router.post("/tts")
async def get_audio(text: Text):
    client = boto3.client('polly', aws_access_key_id=AWS_AK, aws_secret_access_key=AWS_SAK, region_name='us-east-1')
    result = client.synthesize_speech(Text=text.content, OutputFormat=text.output_format, VoiceId='Joanna')
    audio = result['AudioStream'].read()

    with open('audio.mp3', 'wb') as file:
        file.write(audio)
    return {"message": text.content}

if __name__ == "__main__":
    uvicorn.run("tts:app", host="0.0.0.0", port=8080, reload=True)
