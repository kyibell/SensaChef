import React, { useEffect, useState, useRef } from 'react'
import useSpeechToText from '../../hooks/SpeechHooks/useSpeechToText';
import useTextToSpeech from '../../hooks/SpeechHooks/useTextToSpeech';

function VoiceInput({ onRepeat, repeatText, onNextStep, onPreviousStep }) {
    const [textInput, setTextInput] = useState('');
    const enUSVoice = useTextToSpeech();
    const commandExecutedRef = useRef(false);
    const repeatTextRef = useRef(repeatText);
    const [forceStop, setForceStop] = useState(false);

    useEffect(() => {
        repeatTextRef.current = repeatText;
    }, [repeatText])


    const handleCommand = (transcript) => {
        const lowerTranscript = transcript.toLowerCase();
        let isCommand = false;

        if (!lowerTranscript.includes("next step") && !lowerTranscript.includes("previous step") && !lowerTranscript.includes("repeat")) {
            return false;
        }

        if (!commandExecutedRef.current) {
            commandExecutedRef.current = true;

            if (lowerTranscript.includes("next step")) {
                onNextStep?.();
                isCommand = true;
            }
            else if (lowerTranscript.includes("previous step")) {
                onPreviousStep?.();
                isCommand = true;
            }

            else if (lowerTranscript.includes("repeat")) {
                onRepeat(repeatTextRef.current)
                isCommand = true;
            }
            
            // Stop listening when a command is detected
            if (isCommand) {
                console.log("in stop listening if statement")
                abortListening();
                setForceStop(true);
                console.log(isListening);
                setTextInput(''); // Clear the transcript
            }

            setTimeout(() => {
                commandExecutedRef.current = false;
                // console.log("in set timeout")
                // setForceStop(false);
            }, 1000);

        }
        return isCommand;
    };

    const { isListening, transcript, startListening, stopListening, abortListening } = useSpeechToText({
        continuous: true,
        commandHandler: handleCommand,
    });
    const startStopListening = () => {
        if (isListening){
            stopVoiceInput();
        }
        else {
            setTextInput('');
            setForceStop(false);
            startListening();
        }
    }

    const stopVoiceInput = () => {
        abortListening();
        setForceStop(true);
        setTextInput('');
    }

    const showListening = isListening && !forceStop;
    return (
        <div className="speech-section">
            <h1>Speech to Text</h1>
            <textarea
                disabled={isListening}
                value={isListening ? textInput + (transcript ? (textInput ? ' ' : '') + transcript : '') : textInput}
                onChange={(e) => setTextInput(e.target.value)}
            />
            <button onClick={startStopListening}>
                {showListening ? 'Stop Listening' : 'Speak'}
            </button>
            {forceStop && (
                <div>
                    Command processed - mic off
                </div>
            )}
        </div>
    );
    
}
export default VoiceInput