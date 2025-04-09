from fastapi import APIRouter, HTTPException
from app.database import supabase

router = APIRouter() 

# COMMENTS ROUTES

# Get a specific post's comments
@router.get("/posts/{post_id}/comments", tags=["posts"])
async def get_post_comments(post_id: int) :
    try:
        if post_id:
            response = (supabase.table("comments")
                        .select("*")
                        .eq("post_id", post_id)
                        .order("created_at", desc=True) # Newest comments first
                        .execute()
            )

            if not response.data:
                return [] # No comments
            
            return response.data
    except Exception as error:
        raise HTTPException(status_code=500, detail="Internal Server Error")