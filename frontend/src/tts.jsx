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

}

export default TextToSpeech