import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../RecipePageUI/RecipePageUI.css";
import "./RecipeDetail.css";

const RecipeDetail = () => {
	const { recipeName } = useParams();
	const [recipe, setRecipe] = useState(null);
	const [steps, setSteps] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchRecipeData = async () => {
			try {
				const recipeRes = await fetch(
					`http://localhost:8000/recipes/name/${recipeName}`
				);
				const recipeData = await recipeRes.json();

				const stepsRes = await fetch(
					`http://localhost:8000/recipes/${recipeData.id}/steps`
				);
				const stepsData = await stepsRes.json();

				setRecipe(recipeData);
				setSteps(stepsData);
				setLoading(false);
			} catch (err) {
				setError("Failed to load recipe details.");
				setLoading(false);
			}
		};

		fetchRecipeData();
	}, [recipeName]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;
	if (!recipe) return <p>Recipe not found.</p>;

	return (
		<div className="recipe-container-detail">
			<h1>{recipe["recipe-name"]}</h1>
			<hr />
			{recipe.image_url && (
				<img
					src={
						recipe.image_url ||
						"https://via.placeholder.com/800x400?text=No+Image"
					}
					alt={recipe["recipe-name"]}
				/>
			)}
			<p className="food-description">{recipe.description || "No description provided."}</p>

			<h3>Steps</h3>
			<ol>
				{steps.map((step, index) =>
					step.instruction ? <li key={index}>{step.instruction}</li> : null
				)}
			</ol>

			{/* Cooking Start button */}
			<div className="cooking-div">
				<Link to={`/cookingmode/${recipe.id}`}>
					<button className="cooking-button-mode">Start Cooking</button>
				</Link>
			</div>
		</div>
	);
};

export default RecipeDetail;
