import React, { useEffect, useState, useRef } from 'react'
import useSpeechToText from '../../hooks/SpeechHooks/useSpeechToText';
import useTextToSpeech from '../../hooks/SpeechHooks/useTextToSpeech';

function VoiceInput({ onRepeat, repeatText, onNextStep, onPreviousStep }) {
    const [textInput, setTextInput] = useState('');
    const enUSVoice = useTextToSpeech()

    const repeatTextRef = useRef(repeatText);

    useEffect(() => {
        repeatTextRef.current = repeatText;
    }, [repeatText])

    const handleCommand = (transcript) => {
        const lowerTranscript = transcript.toLowerCase();
        // Check if the transcript contains the command "next step"
        if (lowerTranscript.includes("next step")) {
            onNextStep && onNextStep();
        }
        else if (lowerTranscript.includes("previous step")) {
            onPreviousStep && onPreviousStep();

        }

        else if (lowerTranscript.includes("repeat")) {
            onRepeat(repeatTextRef.current)

        }
    };

    const { isListening, transcript, startListening, stopListening } = useSpeechToText({
        continuous: true,
        commandHandler: handleCommand,
    })

    const startStopListening = () => {
        isListening ? stopVoiceInput() : startListening()
    }

    const stopVoiceInput = () => {
        setTextInput(prevVal => prevVal + (transcript.length ? (prevVal.length ? ' ' : '') + transcript : ''))
        stopListening()
    }

    return (
        <div className="speech-section">
            <h1>Speech to Text</h1>
            <textarea
                disabled={isListening}
                value={isListening ? textInput + (transcript ? (textInput ? ' ' : '') + transcript : '') : textInput}
                onChange={(e) => setTextInput(e.target.value)}
            />
            <button onClick={startStopListening}>
                {isListening ? 'Stop Listening' : 'Speak'}
            </button>
        </div>
    );
    
}
export default VoiceInput