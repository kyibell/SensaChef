from fastapi import FastAPI
from app.database import supabase
from .routers import users, camera, recipes, ask, posts
from fastapi.middleware.cors import CORSMiddleware
import os
import uvicorn

app = FastAPI()
app.include_router(users.router)
app.include_router(camera.router)
app.include_router(recipes.router)
app.include_router(ask.router)
app.include_router(posts.router)

origins = [
    "http://localhost:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Test route
@app.get("/")
def read_root():
    return {"message": "Hello, world!"}



if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))  # Default to 8000 if not set
    uvicorn.run(app, host="0.0.0.0", port=port)