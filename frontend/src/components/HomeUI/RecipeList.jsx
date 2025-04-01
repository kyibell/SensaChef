import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
//import { useNavigate } from 'react-router-dom';
import './RecipeList.css';

function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
//    const navigate = useNavigate();
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                //const response = await fetch('http://localhost:8000/recipes');
                const response = await  fetch('http://localhost:8000/recipes', { mode: 'cors' });
                if(!response.ok) {
                    //throw new Error('Network response was not ok');
                    throw new Error(`Server error: ${response.status}`);
                }
                const data = await response.json();
                console.log("API Response (Check image_url):", data);
                setRecipes(data);
//                setError(null);
            } catch (err) {
                setError(err.message);
                console.log("Fetch error details: ", err)
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    if(loading) return <div>Loading...</div>;
//    if(error) return <div>Errror: {error}</div>;
    if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

    return (
/*        <div>
            <h1>Recipes</h1>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                        <h2
                            style={{cursor: 'pointer'}}
                            onClick={() => navigate(`/cookingmode/${recipe.id}`)}
                            >{recipe['recipe-name']}</h2>
                        <p>{recipe.user_id}</p>
                    </li>
                ))}
            </ul>
        </div>*/
        <div className="recipe-list">
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe}/>
            ))}
        </div>
    );
}
export default RecipeList;