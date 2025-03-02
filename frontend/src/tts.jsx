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
        <div style={{display:'block', margin: '0 auto', width:'400px', textAlign:'center', marginTop:'200px'}}>
            <h1>Text to Speech</h1>
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text to speak..." rows="4" cols="50"/>
            <br />
            <button onClick={speak} style={{backgroundColor: "brown", color: "white", padding: "10px 20px"}}>Speak</button>
        </div>
    );
}

export default TextToSpeech