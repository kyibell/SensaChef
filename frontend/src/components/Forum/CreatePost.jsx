export default function CreatePost() {
    return (
        <div style={{ padding: "2rem" }}>
            <h2>Create a New Post</h2>
            <form>
                <input type="text" placeholder="Title" style={{ display: 'block', marginBottom: '1rem', width: '100%' }} />
                <textarea placeholder="Post content..." style={{ display: 'block', width: '100%', height: '150px', marginBottom: '1rem' }} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
