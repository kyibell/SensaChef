// src/components/CreatePostForm/CreatePostForm.jsx
import React, { useState } from "react";
import "./CreatePostForm.css"; // Assuming you have some custom CSS for styling the form

const CreatePostForm = ({ onCreatePost }) => {
  const [content, setContent] = useState(""); // For post content (question)
  const [image, setImage] = useState(null); // For the image file itself
  const [preview, setPreview] = useState(null); // For the image preview (URL object)

  // Handle file selection and generate a preview of the image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file)); // Generate URL object for image preview
  };

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content.trim()) return; // Don't allow empty posts

    // Construct a new post object
    const newPost = {
      content,
      image: preview, // Use preview URL for image
      createdAt: new Date().toLocaleString(), // Store the current date and time
    };

    onCreatePost(newPost); // Send the new post to the parent component (ForumPage)

    // Reset form fields after submission
    setContent("");
    setImage(null);
    setPreview(null);
  };

  return (
    <form onSubmit={handleSubmit} className="create-post-form">
      <textarea
        className="post-input"
        placeholder="What do you need help with?"
        value={content}
        onChange={(e) => setContent(e.target.value)} // Update the content as the user types
      />

      {/* Image Upload Section */}
      <div className="file-upload">
        <label htmlFor="imageUpload">📷 Upload image:</label>
        <input
          type="file"
          accept="image/*" // Only allow image files
          onChange={handleImageChange} // Trigger the image selection handler
        />
      </div>

      {/* Image Preview Section */}
      {preview && (
        <div className="image-preview">
          <img src={preview} alt="Preview" />
        </div>
      )}

      {/* Submit Button */}
      <button type="submit" className="submit-button">
        Post
      </button>
    </form>
  );
};

export default CreatePostForm;
