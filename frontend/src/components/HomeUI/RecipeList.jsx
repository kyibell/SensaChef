import React, { useState, useEffect } from 'react';

function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('http://localhost:8000/recipes');
                if(!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log("API Response: ", data);
                setRecipes(data);
                setError(null);
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
    if(error) return <div>Errror: {error}</div>;

    return (
        <div>
            <h1>Recipes</h1>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                        <h2
                            style={{cursor: 'pointer'}}
                            onclick={() => navigate(`/cooking-mode/${recipe.id}`)}
                            >{recipe['recipe-name']}</h2>
                        <p>{recipe.user_id}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default RecipeList