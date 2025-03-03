import React, { useEffect, useState, useRef } from 'react'
import useSpeechToText from '../../hooks/useSpeechToText';
import useTextToSpeech from '../../hooks/useTextToSpeech';

function VoiceInput({ onRepeat, repeatText }) {
    const [textInput, setTextInput] = useState('');
    const enUSVoice = useTextToSpeech()

    const repeatTextRef = useRef(repeatText);
    //HERE TEXT IS UNDEFINED

    useEffect(() => {
        repeatTextRef.current = repeatText;
    }, [repeatText])

    const handleCommand = (transcript) => {

        // Check if the transcript contains the command "next step"
        if (transcript.toLowerCase() === "next step") {
            alert("Moving to the next step!"); // Replace this with logic  
        }
        else if (transcript.toLowerCase() === "previous step") {
            alert("Moving to the next step!"); // Replace this with logic

        }

        else if (transcript.toLowerCase() === "repeat") {
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