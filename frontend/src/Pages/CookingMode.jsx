{/*import Nav from "../components/Navigation/Navbar";
import Timer from "../components/Timer/Timer";
import RecipeStep from "../components/CookingModeUI/RecipeStep";
import Camera from "../components/Webcam/Camera";
import { useParams } from "react-router-dom";

function CookingMode() {
	const { recipeId } = useParams();

	console.log("Cookingmode.jsx rendered with recipeId: ", recipeId);
	return (
		<div style={{ padding: "20px", display: "flex", flecDirection: "column", gap: "20px"}}>
			{recipeId ? (
				<>
					<RecipeStep recipeId={recipeId} />
					<Camera/>
				</>
			) : (
				<p>No recipeId provided</p>
			)}
		</div>
	);
}

export default CookingMode;
*/}
import Nav from "../components/Navigation/Navbar";
import Timer from "../components/Timer/Timer";
import RecipeStep from "../components/CookingModeUI/RecipeStep";
import Camera from "../components/Webcam/Camera";
import { useParams } from "react-router-dom";


function CookingMode() {
    const { recipeId } = useParams();


    return (
        <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
            <Nav />
            {recipeId ? (
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                    alignItems: "start",
                }}>
                    {/* Left Section: Recipe Steps */}
                    <div style={{
                        padding: "20px",
                        background: "#fff",
                        borderRadius: "12px",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    }}>
                        <h2 style={{ marginBottom: "15px", color: "#ff6b6b" }}>Cooking Instructions</h2>
                        <RecipeStep recipeId={recipeId} />
                    </div>


                    {/* Right Section: Camera */}
                    <div style={{
                        padding: "20px",
                        background: "#fff",
                        borderRadius: "12px",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    }}>
                        <h2 style={{ marginBottom: "15px", color: "#ff6b6b" }}>Camera</h2>
                        <Camera />
                    </div>
                </div>
            ) : (
                <p>No recipeId provided</p>
            )}
        </div>
    );
}


export default CookingMode;