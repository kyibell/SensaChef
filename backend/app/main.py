from fastapi import FastAPI
from app.database import supabase
from .routers import users # object_detection, camera
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(users.router)
# app.include_router(object_detection.router)
# app.include_router(camera.router)

origins = [
    "http://localhost:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Test route
@app.get("/")
def read_root():
    return {"message": "Hello, world!"}
