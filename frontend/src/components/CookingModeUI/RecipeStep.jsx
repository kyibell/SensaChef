import { steps } from 'framer-motion';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function RecipeStep({ recipeId }) {
    console.log("RECIPE ID IN RECIPESTEP: ", recipeId);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [recipeName, setRecipeName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [steps, setSteps] = useState([]);
    const [showCompletion, setShowCompletion] = useState(false);
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
                const stepsResponse = await fetch(`http://localhost:8000/recipes/${recipeId}/steps`);
                console.log("STEPS RESPONSE: ", stepsResponse.status);
                
                if (!stepsResponse.ok){
                    throw new Error(`Failed to fetch steps: ${stepsResponse.status}`);
                }
                
                const stepsData = await stepsResponse.json();
                console.log("Steps data:", stepsData);


                if (stepsData && stepsData.length > 0){
                    setSteps(stepsData.sort((a, b) => a.step_number - b.step_number));
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

    const handleNext = () => {
        if(currentStepIndex< steps.length - 1){
            setCurrentStepIndex(currentStepIndex + 1);
        }
        else {
            setShowCompletion(true);
        }
    };

    if(loading) return <div> Loading cooking mode... </div>
    if(error) return <div> Error: {error} </div>

    const currentStep = steps[currentStepIndex];
    const isFirstStep = currentStepIndex === 0;
    const isLastStep = currentStepIndex === steps.length - 1;

    return (
        <div>
            <h1>Cooking: {recipeName}</h1>
            
            {!showCompletion ? (
                <>
                    <h2>Step {currentStep.step_number}</h2>
                    <p>{currentStep.instruction}</p>
                    <button onClick={handleNext}>{isLastStep ? 'Finish' : 'Next'}</button>
                </>
                
            ) : (
                <div>
                    <h3>Congratulations🎉</h3>
                    <p>You have completed all steps</p>
                    <button onClick={() => {
                        setShowCompletion(false);
                        setCurrentStepIndex(0);
                    }}>Start Over</button>
                </div>
            )}
        </div>
    )
}

export default RecipeStep