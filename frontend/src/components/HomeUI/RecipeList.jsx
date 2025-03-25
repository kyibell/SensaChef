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


}
export default RecipeList