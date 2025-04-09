import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:8000/posts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setPosts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.log("Fetch error details: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
        <h1>Posts</h1>
        <ul>
            {posts.map((post) => (
                <li key={post.id}>
                    <h2 style={{cursor: 'pointer'}}>
                        <Link
                            to={`/posts/${post.id}`}
                        >
                        {post['post_text']}
                        </Link></h2>
                    <p>{post.user_id}</p>
                </li>
            ))}
        </ul>
    </div>
  );
}

export default PostList;
