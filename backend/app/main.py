from fastapi import FastAPI
from pydantic import BaseModel
from app.database import supabase
from .routers import object_detection
app = FastAPI()

app.include_router(object_detection.router)
# Pydantic model for request validation
class User(BaseModel):
    name: str
    age: int
    
# Test route
@app.get("/")
def read_root():
    return {"message": "Hello, world!"}

# Create user route
@app.post("/users/")
def create_user(user: User):
    # Insert user record using Supabase client
    response = supabase.table("Users").insert({"name": user.name, "age": user.age}).execute()
    # response.data will contain the inserted row(s) if successful
    return {
        "message": f"User {user.name} (age {user.age}) was created!",
        "data": response.data
    }