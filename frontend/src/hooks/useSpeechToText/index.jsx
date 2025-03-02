import React, { useEffect, useRef, useState } from 'react'

const useSpeechToText = (options) => {
    const [isListening, setIsListening] = useState(false)
    const [transcript, setTranscript] = useState("")
    const recognitionRef = useRef(null) 

    useEffect(()=>{
        // Check if web speech api is supported
        if(!('webkitSpeechRecognition' in window)){
            console.error("Web speech api is not supported.")
            return;
        }
        recognitionRef.current = new window.webkitSpeechRecognition()
        const recognition = recognitionRef.current
        recognition.interimResults = options.interimResults || true
        recognition.lang = options.lang || "en-US"
        recognition.continuous = options.continuous || false

        if("webkitSpeechGrammarList" in window){
            const grammar = "#JSGF V1.0; grammar punctuation; public <punc> = . | , | ? | ! | ; | : ;"
            const speechRecognitionList = new window.webkitSpeechGrammarList()
            speechRecognitionList.addFromString(grammar, 1)
            recognition.grammars = speechRecognitionList
        }

        recognition.onresult = (event) => {
            let text = ""
            for(let i = 0; i < event.results.length; i++){
                text += event.results[i][0].transcript
            }
            setTranscript(text)
        }

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error)
        }

        recognition.onend = () => {
            setIsListening(false)
            setTranscript("")
        }

        return () => {
            recognition.stop()
        }
    }, [])

}

export default useSpeechToText  