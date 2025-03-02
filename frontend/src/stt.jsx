import React, { useState } from 'react'
import useSpeechToText from './hooks/useSpeechToText';

const VoiceInput = () => {
    const [textInput, setTextInput] = useState('');

    const {isListening, transcript, startListening, stopListening} = useSpeechToText({continuous:true})

    const startStopListening = () => {
        isListening ? stopVoiceInput() : startListening()
    }

    const stopVoiceInput = () => {
        setTextInput(prevVal => prevVal + (transcript.length ? (prevVal.length ? ' ': '') + transcript : ''))
        stopListening()
    }

    return (
        <div style={{display:'block', margin: '0 auto', width:'400px', textAlign:'center', marginTop:'200px'}}>
            <h1>Speech to Text</h1>
            <button onClick={()=>{startStopListening()}} style={{backgroundColor: "brown", color: "white", padding: "10px 20px"}}>
                {isListening ? 'Stop Listening' : 'Speak'}
            </button>
            <textarea rows="4" cols="50" disabled={isListening} value={isListening ? textInput + (transcript.length ? (textInput.length ? ' ' : '') + transcript : '') : textInput} onChange={(e)=>{setTextInput(e.target.value)}}> 
            </textarea>
        </div>
    );
}
export default VoiceInput