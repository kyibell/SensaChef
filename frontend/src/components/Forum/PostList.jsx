import React, { useState, useEffect } from 'react';
import PostCard from './PostCard';

function PostList({ filter = "All" }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Truncate long text
  const shortenText = (text, maxLength = 100) => {
    if (!text) return '';
    return text.length <= maxLength ? text : `${text.substring(0, maxLength)}...`;
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // for dev
        const response = await fetch('http://localhost:8000/posts');

        // for prod
        // const response = await fetch(`https://sensachef-backend.onrender.com/posts`);
        
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        setPosts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Fetch error details: ", err);
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
      {posts
        .filter((post) => {
          if (filter === "All") return true;
          if (filter === "Open") return !post.is_solved;
          if (filter === "Solved") return post.is_solved;
          return true;
        })
        .map((post) => (
          <PostCard
            key={post.id}
            post={{
              id: post.id,
              title: post.post_title,
              description: shortenText(post.post_text),
              author: post.users?.username || "Unknown user",
              tags: post.post_tags || [],
              status: post.is_solved ? "Solved" : "Unsolved",
              likes: post.likes || 0,
            }}
          />
        ))}
    </div>
  );
}

export default PostList;
