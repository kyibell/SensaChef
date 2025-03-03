import React, { useState } from "react";
import useTextToSpeech from "./hooks/useTextToSpeech";

const TextToSpeech = ({ text, setText, speak, onUpdate }) => {

    const handleChange = (event) => {
        const newValue = event.target.value;
        onUpdate(newValue);
    }
    
    return (
        <div style={{display:'block', margin: '0 auto', width:'400px', textAlign:'center', marginTop:'200px'}}>
            <h1>Text to Speech</h1>
            <textarea value={text} onChange={handleChange} placeholder="Enter text to speak..." rows="4" cols="50"/>
            <br />
            <button onClick={speak} style={{backgroundColor: "brown", color: "white", padding: "10px 20px"}}>Speak</button>
        </div>
    );
}

export default TextToSpeech