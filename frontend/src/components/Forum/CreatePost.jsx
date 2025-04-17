import './Forum.css';

export default function CreatePost() {
  return (
    <div className="create-post-container">
      <h2>Create a New Post</h2>
      <form>
        <div className="form-row">
          <label htmlFor="title">Title:</label>
          <input id="title" type="text" placeholder="Enter Post Title" />
        </div>

        <div className="form-row">
          <label htmlFor="content">Content:</label>
          <textarea id="content" placeholder="Post content..." />
        </div>

        <div className="form-row">
          <label htmlFor="tags">Tags:</label>
          <input id="tags" type="text" placeholder="e.g. Tips, Cooking, Help" />
        </div>

        <div className="tag-options">
          {["Tips", "Object Detection", "Ingredient Identification"].map((tag, index) => (
            <span
                key={index}
                className="tag-bubble"
                onClick={() => {
                    const input = document.getElementById("tags");
                    input.value = input.value ? input.value + ", " + tag : tag;
          }}
        >
              {tag}
           </span>
         ))}
        </div>
            

        <div className="form-row">
            <label htmlFor="image"> Image:</label>
            <input id="image" type="file" accept="image/*" />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

