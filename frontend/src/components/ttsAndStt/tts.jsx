import React, { useState } from "react";

const TextToSpeech = ({ text, setText, speak, onUpdate }) => {

    const handleChange = (event) => {
        const newValue = event.target.value;
        onUpdate(newValue);
    }
    
    return (
        <div className="speech-section">
            <h1>Text to Speech</h1>
            <textarea value={text} onChange={handleChange} />
            <button onClick={speak}>Speak</button>
        </div>
    );
    
}

export default TextToSpeech