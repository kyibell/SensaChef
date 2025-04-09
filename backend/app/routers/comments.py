from fastapi import APIRouter, HTTPException
from datetime import datetime
from app.database import supabase, admin_supabase
from pydantic import BaseModel
from uuid import UUID, uuid4