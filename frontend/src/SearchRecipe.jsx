import React, { useState } from "react";
import "./SearchRecipe.css"; // Keep existing styles

function SearchRecipe() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isVisible, setIsVisible] = useState(false); // Controls input visibility

  const handleSearch = () => {
    const dummyRecipes = [
      { id: 1, name: "Pasta" },
      { id: 2, name: "Vegetable Soup" },
      { id: 3, name: "Paneer Tikka" },
    ];
    const filtered = dummyRecipes.filter(recipe =>
      recipe.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div className="search-recipe-container">
      {/* This is the existing "Search Recipes" button on the right */}
      <button className="search-button" onClick={() => setIsVisible(!isVisible)}>
        🔍 Search Recipes
      </button>

      {/* Show input box below the button when clicked */}
      {isVisible && (
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter recipe name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      )}

      {/* Display results below the input */}
      {isVisible && (
        <div className="results">
          {results.length > 0 ? (
            results.map(recipe => (
              <div key={recipe.id} className="recipe-item">
                {recipe.name}
              </div>
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchRecipe;
