import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import './CreateRecipe.css';

function CreateRecipe() {
    const [recipeName, setRecipeName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [steps, setSteps] = useState(['']);
    const [recipeTags, setRecipeTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleImage = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files?.[0] || null);
        }
    }

    const handleStepChange = (index, value) => {
        const newSteps = [...steps];
        newSteps[index] = value;
        setSteps(newSteps);
    };

    const addStep = () => {
        setSteps([...steps, '']);
    };

    const addTags = (tag) => {
        if (!recipeTags.includes(tag)) {
            setRecipeTags((prevTags) => [...prevTags, tag]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const token = sessionStorage.getItem('access_token');
            if (!token) throw new Error("User not authenticated. Log in");

            const userInfoResponse = await fetch('https://sensachef-backend.onrender.com/protected', {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (!userInfoResponse.ok) {
                throw new Error("Failed to get user info");
            }

            const userInfo = await userInfoResponse.json();
            const userId = userInfo.payload.sub;

            const formData = new FormData();
            formData.append('title', recipeName);
            formData.append('description', description);
            formData.append('image', image);
            formData.append('user_id', userId);

            recipeTags.forEach(tag => {
                formData.append('recipe_tags', tag);
            });

            const stepString = steps.map(step => step.trim()).filter(step => step).join('|');
            if (!stepString) throw new Error('At least one step is required');
            formData.append('steps', stepString);

            const response = await fetch(`https://sensachef-backend.onrender.com/${userId}/create_recipe`, {
                method: 'POST',
                body: formData,
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Failed to create recipe");
            }

            const data = await response.json();
            console.log("Recipe created: ", data);
            navigate('/home');

        } catch (err) {
            console.log("Error creating recipe: ", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="create-recipe-wrapper"> {/* <-- Non-breaking wrapper */}
            <div className="create-recipe-container">
                <h2>Create new recipe</h2>
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Recipe Name</label>
                        <input
                            type="text"
                            value={recipeName}
                            onChange={(e) => setRecipeName(e.target.value)}
                            required
                            placeholder="Enter recipe name..."
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            placeholder="Describe your recipe..."
                            rows={4}
                        />
                    </div>

                    <div className="form-group">
                       
                        <div className="tags-preview">
                            <label htmlFor="tags">Tags</label>
                            <input
                                value={recipeTags}
                                onChange={(e) => setRecipeTags(e.target.value)}
                                id="tags"
                                type="text"
                                placeholder="e.g. Tips, Cooking, Help"
                            />
                        </div>

                        <div className="tag-options">
                            {["Vegetarian", "Quick", "Sweet", "High Protein"].map((tag, index) => (
                                <span
                                    key={index}
                                    className="tag-bubble"
                                    onClick={() => addTags(tag)}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Recipe Image*</label>
                        <input
                            type="file"
                            onChange={handleImage}
                            accept="image/*"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Steps</label>
                        {steps.map((step, index) => (
                            <div key={index} className="step">
                                <label>Step {index + 1}</label>
                                <textarea
                                    value={step}
                                    onChange={(e) => handleStepChange(index, e.target.value)}
                                    placeholder={`Describe step ${index + 1}`}
                                    required
                                    rows="3"
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            className="add-step"
                            onClick={addStep}
                        >
                            + Add Another Step
                        </button>
                    </div>

                    <button type="submit" disabled={loading} className="submit-btn">
                        {loading ? 'Creating Recipe...' : 'Create Recipe'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateRecipe;
