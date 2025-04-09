from fastapi import APIRouter, HTTPException
from datetime import datetime
from app.database import supabase, admin_supabase
from pydantic import BaseModel
from uuid import UUID

class Comment(BaseModel): # Model for Comments for Validation
    created_at: datetime
    comment: str
    user_id: UUID
    rating: float
    is_helpful: bool

router = APIRouter()


# Get All Comments
@router.get("/{post_id}/comments", tags=["comments"],status_code=200)
async def get_all_comments(post_id: int):
    try:
        response = (
            supabase.table("comments").select("*, users(username)").eq("post_id", post_id).execute()
        )

        if not response.data:
            raise HTTPException(status_code=404, detail="No comments found for this post.")
        return response.data
    except Exception as error:
        raise HTTPException(status_code=500, detail=error)
    
# Get a specific Comment
@router.get("/comment/{comment_id}", tags=["comments"],status_code=200)
async def get_comment(comment_id: int):
    try:
        if comment_id:
            response = (
                supabase.table("comments")
                .select("*, users(username)")
                .eq("id", comment_id)
                .execute()
            )
        if not response:
            raise HTTPException(status_code=404, detail="Comment Not Found.")
        return response.data[0]
    except Exception as error:
        raise HTTPException(status_code=500, detail="Internal Server Error")

# Get a Specific User's Comment(s)
@router.get("/{user_id}/comment", tags=["comments"])
async def get_user_comment(user_id: UUID):
    try:
        response = (
            supabase.table("comments")
            .select("*, users(username)")
            .eq("user_id", user_id)
            .execute()
        )
        if not response:
            raise HTTPException(status_code=404, detail="User has no comments.")
        return response.data
    except Exception as error:
        raise HTTPException(status_code=500, detail="Internal Server Error")
    

# Create A Comment
@router.post('/{post_id}/create_comment',tags=["comments"])
async def create_comment(comment: Comment, user_id: UUID, post_id: int):
    try:
        creation_date = datetime.now().isoformat() + "Z"
      #  db_user = supabase.table("users").select("*").eq("id", user_id).execute()
       # if not db_user:
       #     raise HTTPException(status_code=404, detail="User Not Found")
        
        comment_data = {
            "created_at": creation_date,
            "comment": comment.comment,
            "user_id": str(user_id),
            "post_id": post_id,
            "rating": comment.rating,
            "is_helpful": False,
        }
        response = supabase.table("comments").insert(comment_data).execute()
        if response:
            return response
        else: 
            raise HTTPException(status_code=400, detail="Error creating comment.")
    except Exception as error:
        raise HTTPException(status_code=500, detail=error)

# Update A Comment
@router.put('/update_comment/{comment_id}', tags=["comments"])
async def update_comment(comment_id: int, comment: Comment):
    try:
        comment_data = {
            "comment": comment.comment,
            "rating": comment.rating,
            "is_helpful": comment.is_helpful
        }

        response = supabase.table("comments").update(comment_data).eq("id", comment_id).execute()
        return response.data
    except Exception as error:
        raise HTTPException(status_code=500, detail="Internal Server Error")

# Delete A Comment
@router.delete('/delete_comment/{comment_id}', tags=["comments"])
async def delete_comment(comment_id: int):
    try:
        comment = supabase.table("comments").delete().eq("id", comment_id).execute()
        return {"message": "Comment Deleted Successfully."}
    except Exception as error:
        raise HTTPException(status_code=500, detail="Internal Server Error")