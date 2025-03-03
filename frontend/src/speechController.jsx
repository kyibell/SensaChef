import React, { useState, useEffect } from "react";
import VoiceInput from "./stt";
import TextToSpeech from "./tts";

function SpeechController(){
    const [text, setText] = useState("")

    const handleUpdate = (newValue) => {
        setText(newValue);
    }

    const speak = () => {
        if ('speechSynthesis' in window) {
            let spokenVoice = window.speechSynthesis.getVoices().find(voice => voice.lang === 'en-US')
            if (!spokenVoice) {
                alert('No en-US voice available.');
                return;
            }
            const utterance = new SpeechSynthesisUtterance(text);
            console.log(utterance)
            utterance.voice = spokenVoice; // Set the voice to en-US
            window.speechSynthesis.speak(utterance);
        } else {
            alert('Sorry, your browser does not support text to speech!');
        }

    };

    const repeat = (textToRepeat) => {
        if ('speechSynthesis' in window) {
            let spokenVoice = window.speechSynthesis.getVoices().find(voice => voice.lang === 'en-US')
            if (!spokenVoice) {
                alert('No en-US voice available.');
                return;
            }
            const utterance = new SpeechSynthesisUtterance(textToRepeat);
            console.log(utterance)
            utterance.voice = spokenVoice; // Set the voice to en-US
            window.speechSynthesis.speak(utterance);
        } else {
            alert('Sorry, your browser does not support text to speech!');
        }
    }
    
    return (
        <>
            <VoiceInput repeatText={text} onRepeat={repeat}/>
            <TextToSpeech text={text} setText={setText} speak={speak} onUpdate={handleUpdate}/>
        </>
    )
}

export default SpeechController