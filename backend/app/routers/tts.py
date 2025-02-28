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
