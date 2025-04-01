import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:8000/recipes');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("API Response: ", data);
        setRecipes(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.log("Fetch error details: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id} style={{ marginBottom: '1.5rem' }}>
            <Link
              to={`/recipes/${recipe['recipe-name']}`}
              style={{ textDecoration: 'none', color: '#333' }}
            >
              <h2>{recipe['recipe-name']}</h2>
            </Link>
            <p style={{ fontSize: '0.9rem', color: '#777' }}>User: {recipe.user_id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeList;
