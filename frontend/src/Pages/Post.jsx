import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import CreateComment from '../components/Forum/CreateComment';

function Post({}) {

    const {post_id} = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {

        const fetchCurrentUser = async () => {
            const token = sessionStorage.getItem('access_token');
            if (!token) throw new Error("User not authenticated. Log in");

            const userInfoResponse = await fetch('https://sensachef-backend.onrender.com/protected', {
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
            setCurrentUser(userInfo);
        };
        fetchCurrentUser();
    }, []);


    useEffect( () => {

        const fetchPostAndComments = async () => {

            try{
                // Fetch post data
                
                // for dev
                // const postResponse = await fetch(`http://localhost:8000/posts/${post_id}`);

                // for prod
                const postResponse = await fetch(`https://sensachef-backend.onrender.com/posts/${[post_id]}`);

                
                if (!postResponse.ok){
                    throw new Error('Post not found');
                }
                const postData = await postResponse.json();
                setPost(postData);

                // Fetch comments of this post

                // for dev
                // const commentsResponse = await fetch(`http://localhost:8000/${[post_id]}/comments`);

                // for prod
                const commentsResponse = await fetch(`https://sensachef-backend.onrender.com/${[post_id]}/comments`);

                if(!commentsResponse.ok){
                    throw new Error('Failed to fetch comments');
                }
                const commentsData = await commentsResponse.json();
                setComments(commentsData);
            } catch (err) {
                console.log("Fetch failed: ", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        } ;
        fetchPostAndComments();
    }, [post_id]);

    useEffect(() => {
        if (post && comments.length > 0 && !post.is_solved) {
        
            // for prod
            fetch(`https://sensachef-backend.onrender.com/update_post/${post_id}`, {

            // for dev
            // fetch(`http://localhost:8000/update_post/${post_id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    is_solved: true
                })
            })
            .then(res => res.json())
            .then(updatedPost => {
                
                setPost(prev => ({ ...prev, ...updatedPost }));
            })
            .catch(err => console.error("Error marking post as solved:", err));
        }
    }, [comments.length, post]);

    const handleMarkHelpful = async (commentId, currentStatus) => {
        try {
            const token = sessionStorage.getItem('access_token');

            // for prod
            fetch(`https://sensachef-backend.onrender.com/${commentId}`, {

            // for dev
            // fetch(`http://localhost:8000/update_comment/${commentId}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    is_helpful: !currentStatus
                })
            })
            .then(res => res.json())
            .then(setComments(prev => prev.map(comment => comment.id === commentId ? {...comment, is_helpful: !currentStatus} : comment)));
            
        } catch (err) {
            console.error("Error updating comment: ", err);
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!post) return <div>Post not found</div>;

    return (
        <>
            <div className="post">
                <div className="post-detail">
                    <span style={{
                                color: post.is_solved ? "green" : "red",
                            }}>{post.is_solved ? 'Solved' : 'Unsolved'}
                    </span>
                    <h1>{post.post_title}</h1>
                    <p>{post.post_text}</p>
                    <p>Posted by: {post.users?.username || 'Unkown user'}</p>

                    {post.post_image && (
                        <img src={post.post_image} alt={post.post_title} />
                    )}
                    {post.post_tags?.length > 0 && (
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '10px' }}>
                                    {post.post_tags.map((tag, index) => (
                                    <span 
                                        key={index}
                                        style={{
                                        backgroundColor: '#e0e0e0',
                                        color: '#333',
                                        padding: '3px 8px',
                                        borderRadius: '12px',
                                        fontSize: '0.8em'
                                        }}
                                    >
                                        {tag}
                                    </span>
                                    ))}
                                </div>
                    )}
                </div>

                <div className="comments">
                    <CreateComment onCommentAdded={() => {
                        // for prod
                        fetch(`https://sensachef-backend.onrender.com/${post_id}/comments`)
                        // for dev
                        // fetch(`http://localhost:8000/${post_id}/comments`)
                            .then(res => res.json())
                            .then(data => setComments(data))
                            .catch(err => console.error(err));
                    }}
                    />
                    <h2>Comments: {comments.length}</h2>

                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <div className="comment" key={comment.id}>
                                <div className="comment-info">
                                    <strong>By {comment.users?.username}</strong>
                                    <span>{new Date(comment.created_at).toLocaleString()}</span>
                                </div>
                                <p>{comment.comment}</p>
                                <div className="comment-foot">
                                    <span>Rating: {comment.rating}/5</span>

                                    {currentUser && post && currentUser.payload.sub === post.user_id && (
                                        <div className="helpful-toggle">
                                            <label>
                                                <input 
                                                    type="checkbox"
                                                    checked={comment.is_helpful || false}
                                                    onChange={() => handleMarkHelpful(comment.id, comment.is_helpful)}
                                                />
                                                Helpful?
                                            </label>
                                        </div>
                                    )}

                                    {comment.is_helpful && (
                                        <span className="helpful-badge">✅ Author Marked This As Helpful</span>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No comments yet...</p>
                    )}
                </div>
            </div>
        </>
    )
}
export default Post;
