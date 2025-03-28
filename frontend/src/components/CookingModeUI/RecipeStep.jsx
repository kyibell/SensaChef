import { steps } from 'framer-motion';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SpeechController from '../Speech/speechController';
import VoiceInput from '../Speech/stt';
function RecipeStep({ recipeId }) {

    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [recipeName, setRecipeName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [steps, setSteps] = useState([]);
    const [showCompletion, setShowCompletion] = useState(false);

    useEffect( () => {

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
                    const sortedSteps = stepsData.sort((a, b) => a.step_number - b.step_number);
                    setSteps(sortedSteps);

                    speakStep(sortedSteps[0]);
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

    const speakStep = (step) => {
        if ('speechSynthesis' in window && step){
            const spokenVoice = window.speechSynthesis.getVoices().find(voice => voice.lang === 'en-US');

            if(!spokenVoice){
                alert('No en-US voice available');
                return;
            }
            const utterance = new SpeechSynthesisUtterance(`Step ${step.step_number}, ${step.instruction}`);
            utterance.voice = spokenVoice;
            window.speechSynthesis.speak(utterance);
        }
    }
    const handleNext = () => {
        if(currentStepIndex< steps.length - 1){
            const nextStepIndex = currentStepIndex + 1;
            setCurrentStepIndex(nextStepIndex);
            speakStep(steps[nextStepIndex])
        }
        else {
            setShowCompletion(true);
            if ('speechSynthesis' in window) {
                const spokenVoice = window.speechSynthesis.getVoices().find(voice => voice.lang === 'en-US');
                if (spokenVoice) {
                    const utterance = new SpeechSynthesisUtterance("Congratulations! You have completed all steps");
                    utterance.voice = spokenVoice;
                    window.speechSynthesis.speak(utterance);
                }
            }
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

                    <SpeechController stepText={currentStep.instruction} />
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