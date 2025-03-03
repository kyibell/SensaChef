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
        <div style={{ display: 'block', margin: '0 auto', width: '400px', textAlign: 'center', marginTop: '200px' }}>
            <h1>Speech to Text</h1>
            <button onClick={() => { startStopListening() }} style={{ backgroundColor: "brown", color: "white", padding: "10px 20px" }}>
                {isListening ? 'Stop Listening' : 'Speak'}
            </button>
            <textarea rows="4" cols="50" disabled={isListening} value={isListening ? textInput + (transcript.length ? (textInput.length ? ' ' : '') + transcript : '') : textInput} onChange={(e) => { setTextInput(e.target.value) }}>
            </textarea>
        </div>
    );
}
export default VoiceInput