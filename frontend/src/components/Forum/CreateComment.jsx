import { useScroll } from "framer-motion";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

function CreateComment() {
    const { post_id } = useParams();
    const [commentText, setCommentText] = useState('');
    const [rating, setRating] = useState(0);
    const [isHelpful, setIsHelpful] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // const userId = localStorage.getItem("userId");
            const userId = '9ea35ad8-c183-4755-9594-4f7bf5d72819'; // temporary hardcoded userId
            if (!userId) throw new Error("User not authenticated. Please log in");

            const response = await fetch(`http://localhost:8000/${post_id}/create_comment`, {
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

        } catch (err) {
            console.log("Error creating comment: ", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
}