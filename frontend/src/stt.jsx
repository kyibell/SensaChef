import React, {useState} from 'react'

const VoiceInput = () => {
    const [textInput, setTextInput] = useState('');

    return (
        <div style={{display:'block', margin: '0 auto', width:'400px', textAlign:'center', marginTop:'200px'}}>
            <button style={{backgroundColor: "brown", color: "white", padding: "10px 20px"}}>Speak</button>
            <textarea value={textInput} onChange={(e)=>{setTextInput(e.target.value)}}> 
            </textarea>
        </div>
    );
}
export default VoiceInput