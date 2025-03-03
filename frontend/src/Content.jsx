import React, { useState } from "react";
import SearchIcon from './assets/Search.svg';
import ScanIcon from './assets/Scan.svg';

function Content() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = () => {
        setHasSearched(true); // Mark that a search happened

        const dummyIngredients = [
            { id: 1, name: "Tomato" },
            { id: 2, name: "Garlic" },
            { id: 3, name: "Paneer" },
        ];
        const filtered = dummyIngredients.filter((ingredient) =>
            ingredient.name.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
    };

    return (
        <div>
            {/* Buttons Section */}
            <div className="button-container">
                <button className="buttons">Order Ingredients</button>
                <button className="buttons">
                    <img className="scan-icon" src={ScanIcon} alt="Scan" />
                    Scan Ingredients
                </button>
                <button
                    className="buttons"
                    onClick={() => setIsVisible(!isVisible)}
                >
                    <img className="search-icon" src={SearchIcon} alt="Search" />
                    Search Ingredients
                </button>
            </div>

            {/* Search Box Section */}
            {isVisible && (
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Enter ingredient name..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button className="Search-button" onClick={handleSearch}>
                        Search
                    </button>

                    {/* Results Section - Only shows after search happens */}
                    {hasSearched && (
                        <>
                            {results.length > 0 ? (
                                <div className="results">
                                    {results.map((ingredient) => (
                                        <div key={ingredient.id} className="recipe-item">
                                            {ingredient.name}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No results found.</p>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default Content;
