from fastapi import APIRouter, HTTPException
from datetime import datetime
from app.database import supabase, admin_supabase
from pydantic import BaseModel
from uuid import UUID

class Comment(BaseModel): # Model for Comments for Validation
    created_at: datetime
    comment: str
    post_id: int
    user_id: UUID
    rating: float
    is_helpful: bool

router = APIRouter()


# Get All Comments
@router.get("/comments", tags=["comments"])
async def get_all_comments():
    pass
# Get a specific Comment
@router.get("/comment/{comment_id}", tags=["comments"])
async def get_comment():
    pass

# Get a Specific User's Comment(s)
@router.get("{user_id}/comment", tags=["comments"])
async def get_user_comment():
    pass

# Create A Comment
@router.post('/{post_id}/create_comment',tags=["comments"])
async def create_comment():
    pass

# Update A Comment
@router.put('update_comment/{comment_id}', tags=["comments"])
async def update_comment():
    pass
# Delete A Comment
@router.delete('/delete_comment/{comment_id}', tags=["comments"])
async def delete_comment():
    pass