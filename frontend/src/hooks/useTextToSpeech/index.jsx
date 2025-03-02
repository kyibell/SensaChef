import React, { useState, useEffect } from 'react'

const textToSpeech = () => {
    const [text, setText] = useState('')
    const [voice, setVoice] = useState(null)

    useEffect(() => {

        const loadVoice = () => {
            const enUSVoice = window.speechSynthesis.getVoices().find(voice => voice.lang === 'en-US')
            setVoice(enUSVoice)
        };
        
    })
}