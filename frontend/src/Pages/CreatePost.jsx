import React, { useState } from 'react';
import CreatePostForm from '../components/CreateFormPost/CreatePostForm';
import PostCard from '../components/PostCard';
import './CreatePost.css';

const dummyPosts = [
  {
    id: 1,
    question: 'Tips for chopping vegetables?',
    tag: 'Tips',
    liked: false,
    likes: 15
  },
  {
    id: 2,
    question: 'Is this apple fresh?',
    tag: 'Object detection',
    liked: true,
    likes: 57
  },
  {
    id: 3,
    question: 'How can I turn on the stove?',
    tag: 'Steps help',
    liked: false,
    likes: 9
  }
];

export default function CreatePost() {
  const [posts, setPosts] = useState(dummyPosts);

  return (
    <div className="ask-page">
      <header className="ask-header">
        <h1>Assistance Forums</h1>
        <div className="ask-search">
          <input type="text" placeholder="What do you need help with?" />
          <button className="ask-ai">Ask AI</button>
        </div>
      </header>

      <div className="ask-body">
        <div className="post-feed">
          <CreatePostForm />
          <div className="filter-buttons">
            <button className="active">All</button>
            <button>Open</button>
            <button>Solved</button>
          </div>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        <div className="tag-sidebar">
          <h3>Tags</h3>
          <div className="tag tips">Tips</div>
          <div className="tag steps-help">Steps help</div>
          <div className="tag object-detection">Object detection</div>
        </div>
      </div>
    </div>
  );
}
