import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PostComment.css';

function CreateComment({ onCommentAdded }) {
    const { post_id } = useParams();
    const [commentText, setCommentText] = useState('');
    const [rating, setRating] = useState(0);
    const [isHelpful, setIsHelpful] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isCommenting, setIsCommenting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {

            const token = sessionStorage.getItem('access_token');
            if (!token) throw new Error("User not authenticated. Log in");

            // for prod
            const userInfoResponse = await fetch('https://sensachef-backend.onrender.com/protected', {
            // for dev
            // const userInfoResponse = await fetch('http://localhost:8000/protected', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!userInfoResponse.ok){
                throw new Error("Failed to get user info");
            }

            const userInfo = await userInfoResponse.json();
            const userId = userInfo.payload.sub;

            // const userId = localStorage.getItem("userId");
            // const userId = '9ea35ad8-c183-4755-9594-4f7bf5d72819'; // temporary hardcoded userId
            // if (!userId) throw new Error("User not authenticated. Please log in");

            // for prod
            const response = await fetch(`https://sensachef-backend.onrender.com/${post_id}/create_comment`, {

            //for dev
            // const response = await fetch(`http://localhost:8000/${post_id}/create_comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    comment: commentText,
                    user_id: userId,
                    rating: rating,
                    is_helpful: isHelpful
                }),
            });

            if(!response.ok) {
                const errorData = await response.json();
                console.log("Full error: ", errorData);
                throw new Error(errorData.detail || "Failed to create comment");
            }

            const data = await response.json();
            console.log("comment created: ", data);

            // reset
            setCommentText('');
            setRating(0);
            setIsHelpful(false);
            setIsCommenting(false);

            // refresh post component
            if (onCommentAdded){
                onCommentAdded();
            }

        } catch (err) {
            console.log("Error creating comment: ", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    if(!isCommenting){
        return(
            <button
                onClick={() => setIsCommenting(true)}
                className="comment-button"
            >
                Add Comment
            </button>
        );
    }
    return (
        <div className="create-comment-container">
            <form onSubmit={handleSubmit}>
                <textarea 
                    value={commentText} 
                    onChange={(e) => setCommentText(e.target.value)} 
                    placeholder="Write your comment..."
                    required
                    rows={4} 
                />
                <div className="comment-options">
                    <div className="rating">
                        <label>Rating:</label>
                        <div className="stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span 
                                    key={star} 
                                    className={`star ${star <= rating ? 'filled' : ''}`}
                                    onClick={() => setRating(star)}
                                    style={{ cursor: "pointer", fontSize: "2em" }}>
                                    ⭐
                                </span>
                                
                            ))}
                        </div>
                        <span>({rating}/5)</span>
                    </div>
                </div>

                <div className="comment-buttons">
                    <button
                        type="button"
                        onClick={() => {
                            setIsCommenting(false);
                            setError(null);
                        }}
                        disabled={loading}
                    >
                        Cancel      
                    </button>

                    <button
                        type="submit"
                        disabled={loading || !commentText.trim()}
                    >
                        {loading ? 'Posting...' : 'Post Comment'}
                    </button>
                </div>

                {error && <div className="error-message"> {error} </div>}
            </form>
        </div>
    )
}
export default CreateComment;