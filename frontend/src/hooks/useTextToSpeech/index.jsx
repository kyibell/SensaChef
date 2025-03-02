import React, { useState, useEffect } from 'react'

const useTextToSpeech = () => {

    const [enUSVoice, setVoice] = useState(null)

    useEffect(() => {

        const loadVoice = () => {
            const enUSVoice = window.speechSynthesis.getVoices().find(voice => voice.lang === 'en-US')
            setVoice(enUSVoice)
        };

        window.speechSynthesis.onvoiceschanged = loadVoice
        loadVoice()

        // cleanup
        return () => {
            window.speechSynthesis.onvoiceschanged = null
        }
    }, []);
    return enUSVoice;
    
}
export default useTextToSpeech