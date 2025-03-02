import React, { useState } from "react";
import useTextToSpeech from "./hooks/useTextToSpeech";

const TextToSpeech = () => {
    const [text, setText] = useState('')
    const enUSVoice = useTextToSpeech()

    const speak = () => {
        if ('speechSynthesis' in window) {
            if (!enUSVoice) {
                alert('No en-US voice available.');
                return;
            }
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.voice = enUSVoice; // Set the voice to en-US
            window.speechSynthesis.speak(utterance);
        } else {
            alert('Sorry, your browser does not support text to speech!');
        }
    };

    return (
        <div>
            <h1>Text to Speech</h1>
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text to speak..." rows="4" cols="50"/>
            <br />
            <button onClick={speak}>Speak</button>
        </div>
    );
}

export default TextToSpeech