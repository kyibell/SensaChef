import { steps } from 'framer-motion';
import React, { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SpeechController from '../Speech/speechController';
import VoiceInput from '../Speech/stt';
function RecipeStep({ recipeId }) {

    const [currentStepIndex, setCurrentStepIndex] = useState(-1);
    const [recipeName, setRecipeName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [steps, setSteps] = useState([]);
    const [showCompletion, setShowCompletion] = useState(false);
    const voicesLoaded = useRef(false);

    useEffect(() => {
        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            if (voices.length > 0) {
                voicesLoaded.current = true;
                window.speechSynthesis.onvoiceschanged = null; // Remove listener once voices are loaded
            }
        };

        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();

        return () => {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, []);

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

                    const checkVoices = () => {
                        if (voicesLoaded.current) {
                            speakMessage(`Welcome to cooking ${recipeData['recipe-name']}. Say next step or click next to begin.`);
                        } else {
                            setTimeout(checkVoices, 100);
                        }
                    };
                    checkVoices();
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
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(`Step ${step.step_number}, ${step.instruction}`);
            utterance.voice = spokenVoice;
            window.speechSynthesis.speak(utterance);
        }
    };
    const speakMessage = (message) => {
        if ('speechSynthesis' in window && message) {
            const spokenVoice = window.speechSynthesis.getVoices().find(voice => voice.lang === 'en-US');
            if (spokenVoice) {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(message);
                utterance.voice = spokenVoice;
                window.speechSynthesis.speak(utterance);
            }
        }
    };
    const handleNext = () => {
        if (currentStepIndex === -1) {
            // Move from start message to first step
            setCurrentStepIndex(0);
            if (steps.length > 0) {
                speakStep(steps[0]);
            }
        } 
        else if(currentStepIndex < steps.length - 1){
            const nextStepIndex = currentStepIndex + 1;
            setCurrentStepIndex(nextStepIndex);
            speakStep(steps[nextStepIndex])
        }
        else {
            setShowCompletion(true);
            speakMessage("Congratulations! You have completed all steps");
        }
    };

    const handleStartOver = () => {
        setShowCompletion(false);
        setCurrentStepIndex(-1);
        speakMessage(`Welcome to cooking ${recipeName}. Say next step or click next to begin.`);
    };

    if(loading) return <div> Loading cooking mode... </div>
    if(error) return <div> Error: {error} </div>

    const currentStep = steps[currentStepIndex];
    const isFirstStep = currentStepIndex === 0;
    const isLastStep = currentStepIndex === steps.length - 1;

    return (
        <div>
            <h1>Cooking: {recipeName}</h1>
            <SpeechController 
                stepText={
                    currentStepIndex === -1 ? 
                        `Welcome to cooking ${recipeName}` : 
                        showCompletion ? 
                            "Congratulations! You have completed all steps" : 
                            steps[currentStepIndex]?.instruction || ""
                }
            />
            {showCompletion ? (
                <div>
                    <h3>Congratulations🎉</h3>
                    <p>You have completed all steps</p>
                    <button onClick={handleStartOver}>Start Over</button>
                </div>
                
            ) : currentStepIndex === -1 ? (
                <div>
                    <h3>Welcome!</h3>
                    <p>Click next or say "next step" to begin cooking.</p>
                    <button onClick={handleNext}>Start Cooking</button>
                </div>
            ) : (
                <>
                    <h2>Step {currentStep.step_number}</h2>
                    <p>{currentStep.instruction}</p>

                    <button onClick={handleNext}>{isLastStep ? 'Finish' : 'Next'}</button>
                    {/* <SpeechController stepText={currentStep.instruction} /> */}
                </>
            )}
        </div>
    )
}

export default RecipeStep