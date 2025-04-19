import { useNavigate } from "react-router-dom";

function RecipeCard({ recipe }) {
    const navigate = useNavigate();

    return (
        <div style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "15px",
            margin: "10px",
            width: "300px",
            textAlign: "center",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff"
        }}>
            <img 
                //src={recipe.image || "https://via.placeholder.com/300"} 
                src={recipe.image_url ? recipe.image_url : "https://via.placeholder.com/300"} 
                alt={recipe["recipe-name"]} 
                style={{ width: "100%", height: "180px", borderRadius: "10px", objectFit: "cover"}} 
            />
{/*
            <h3>{recipe["recipe-name"]}</h3>
            <p><strong>By:</strong> {recipe.user_id}</p>
*/}
            <h3 style={{ marginTop: "10px", fontSize: "18px", color: "#333"}}>{recipe["recipe-name"]}</h3>
            <p style={{ fontSize: "14px", color: "#666"}}><strong>By:</strong>{recipe.user_id}</p>
            <button 
                style={{
                    padding: "10px  15px",
                    background: "#ff6347",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginTop: "10px",
                    fontSize: "14px"
                }}
                onClick={() => navigate(`/cookingmode/${recipe.id}`)}
            >
                Start Cooking
            </button>
        </div>
    );
}

export default RecipeCard;
