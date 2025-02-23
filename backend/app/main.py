from fastapi import FastAPI, Depends
from pydantic import BaseModel
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import Session

from backend.app.database import Base, engine, SessionLocal

# Define our model
class UserModel(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    age = Column(Integer, nullable=False)

# Create all tables (if they don't exist)
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Pydantic model for request validation
class User(BaseModel):
    name: str
    age: int

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Test route
@app.get("/")
def read_root():
    return {"message": "Hello, world!"}

# Create user route
@app.post("/users/")
def create_user(user: User, db: Session = Depends(get_db)):
    db_user = UserModel(name=user.name, age=user.age)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {
        "message": f"User {db_user.name} (age {db_user.age}) was created!",
        "id": db_user.id
    }