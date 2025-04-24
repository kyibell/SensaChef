import React, { useState, useEffect } from 'react';
import PostCard from './PostCard';

function PostList({ filter = "All", selectedTag = null }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper to shorten long text
  const shortenText = (text, maxLength = 100) => {
    if (!text) return '';
    return text.length <= maxLength ? text : `${text.substring(0, maxLength)}...`;
  };

  // Fetch posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://sensachef-backend.onrender.com/posts');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setPosts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Fetch error details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Apply tag and status filters
  const filteredPosts = posts.filter((post) => {
    const tagMatch =
      !selectedTag ||
      (post.post_tags &&
       post.post_tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase()));

    const statusMatch =
      filter === "All" ||
      (filter === "Open" && !post.is_solved) ||
      (filter === "Solved" && post.is_solved);

    return tagMatch && statusMatch;
  });

  return (
    <div>
      {filteredPosts.length === 0 ? (
        <p>No posts found for this tag and filter.</p>
      ) : (
        filteredPosts.map((post) => (
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
        ))
      )}
    </div>
  );
}

export default PostList;
