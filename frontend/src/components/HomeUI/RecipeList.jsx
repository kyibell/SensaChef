import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
       // const response = await fetch('http://localhost:8000/recipes'); dev
          const response = await fetch('https://sensachef-backend.onrender.com/recipes'); // deployment
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
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
    <div style={{ padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', color:'white' }}>Recipes</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
      }}>
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            style={{
              border: '1px solid #eee',
              borderRadius: '16px',
              overflow: 'hidden',
              background: '#fff',
              boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
              transition: 'transform 0.2s ease-in-out',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Link
              to={`/recipes/${recipe['recipe-name']}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              {recipe.image_url ? (
                <img
                  src={recipe.image_url}
                  alt={recipe['recipe-name']}
                  style={{
                    width: '100%',
                    height: '180px',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <div style={{
                  width: '100%',
                  height: '180px',
                  backgroundColor: '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#aaa',
                  fontSize: '0.9rem'
                }}>
                  No Image Available
                </div>
              )}
            </Link>
            <div style={{ padding: '1rem' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{recipe['recipe-name']}</h2>
              <p style={{ fontSize: '0.9rem', color: '#777' }}>
                {recipe.description || "No description found."}
              </p>
              <Link to={`/recipes/${recipe['recipe-name']}`}>
                <button style={{
                  marginTop: '1rem',
                  backgroundColor: '#ff6b6b',
                  color: '#fff',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s ease'
                }}
                  onMouseEnter={e => e.target.style.backgroundColor = '#ff4d4d'}
                  onMouseLeave={e => e.target.style.backgroundColor = '#ff6b6b'}
                >
                  Cook Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;
