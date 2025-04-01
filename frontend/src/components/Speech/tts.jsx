import React, { useState } from "react";

const TextToSpeech = ({ text, speak }) => {

    // const handleChange = (event) => {
    //     const newValue = event.target.value;
    //     onUpdate(newValue);
    // }
    
    return (
        <div className="speech-section">
            <h1>Text to Speech</h1>
            {/* <textarea value={text} readOnly /> */}
            <button onClick={speak}>Speak</button>
        </div>
    );
    
}

export default TextToSpeech