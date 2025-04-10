{/*import AiModel from "../components/AiModel/AiModel";
import PostList from "../components/Forum/PostList";

export default function Help() {
    return(
        <>
            <AiModel />
            <PostList />
        </>
    );
}*/}

import { Link } from "react-router-dom";
import AiModel from "../components/AiModel/AiModel";
import PostList from "../components/Forum/PostList";

export default function Help() {
    return (
        <>
            <AiModel />
            <div style={{ display: "flex", justifyContent: "flex-end", margin: "1rem" }}>
                <Link to="/create-post">
                    <button style={{
                        padding: "10px 20px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}>
                        Create Post
                    </button>
                </Link>
            </div>
            <PostList />
        </>
    );
}
