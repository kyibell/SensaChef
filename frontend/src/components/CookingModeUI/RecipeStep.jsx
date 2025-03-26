import { steps } from 'framer-motion';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function RecipeStep({ recipeId }) {
    console.log("RECIPE ID IN RECIPESTEP: ", recipeId);
    const [currentStep, setCurrentStep] = useState(null);
    const [recipeName, setRecipeName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect( () => {
        console.log("RecipeStep WITH ID ", recipeId);
        const fetchRecipeData = async () => {

            try{
                // fetch recipe's name
                const recipeResponse = await fetch(`http://localhost:8000/recipes/${recipeId}`);
                console.log("RECIPE RESPONSE: ", recipeResponse);
                if (!recipeResponse.ok){
                    throw new Error('Recipe not found');
                }
                const recipeData = await recipeResponse.json();
                setRecipeName(recipeData['recipe-name']);

                // fetch step one
                const stepsResponse = await fetch(`http://localhost:8000/recipes/${recipeId}/steps?step_number=1`);
                console.log("STEPS RESPONSE: ", stepsResponse.status);
                
                if (!stepsResponse.ok){
                    throw new Error(`Failed to fetch steps: ${stepsResponse.status}`);
                }
                
                const stepsData = await stepsResponse.json();
                console.log("Steps data:", stepsData);


                if (stepsData && stepsData.length > 0){
                    setCurrentStep(stepsData[0]);
                }
                else{
                    setError('No steps found');
                }
            } catch (err) {
                console.log("Fettch failed: ", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        } ;
        fetchRecipeData();
    }, [recipeId]);

    if(loading) return <div> Loading cooking mode... </div>
    if(error) return <div> Error: {error} </div>

    return (
        <div>
            <h1>Cooking: {recipeName}</h1>
            <h2>Step {currentStep.step_number}</h2>
            <p>{currentStep.instruction}</p>
        </div>
    )
}

export default RecipeStep