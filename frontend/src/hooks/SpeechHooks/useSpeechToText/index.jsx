import React, { useEffect, useRef, useState } from 'react'

const useSpeechToText = (options) => {
    const [isListening, setIsListening] = useState(false)
    const [transcript, setTranscript] = useState("")
    const recognitionRef = useRef(null) 

    const abortListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.abort();
            setIsListening(false);
            setTranscript("");
        }
    };

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

            if (options.commandHandler && options.commandHandler(text)) {
                abortListening();
                
            }
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

    const startListening = () => {
        if(recognitionRef.current && !isListening) {
            recognitionRef.current.start();
            setIsListening(true);
            setTranscript("");
        }
    }

    const stopListening = () => {
        if(recognitionRef.current && isListening) {
            recognitionRef.current.stop()
            setIsListening(false)
        }
    }

    return {
        isListening,
        transcript,
        startListening,
        stopListening,
        abortListening
    }
}

export default useSpeechToText  