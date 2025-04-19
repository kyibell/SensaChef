function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [tags, setTags] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // const userId = localStorage.getItem("userId");
            const userId = '9ea35ad8-c183-4755-9594-4f7bf5d72819';
            if (!userId) throw new Error("User not authenticated");


            const response = await fetch(`http://localhost:8000/${userId}/create_post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    post_title: title,
                    post_text: content,
                    post_image: imageUrl,
                    post_tags: tags.split(',').map(tag => tag.trim())
                })
            });

            if(!response.ok) {
                throw new Error(await response.text());
            }

            const data = await response.json();
            console.log("post created: ", data);
            navigate('/posts');
        } catch (err) {
            console.log("Error creating post: ", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="create-post-container">
            <h2>Create a New Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <label htmlFor="title">Title:</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} required id="title" type="text" placeholder="Enter Post Title" />
                </div>

                <div className="form-row">
                    <label htmlFor="content">Content:</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} required id="content" placeholder="Post content..." />
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

export default CreatePost;