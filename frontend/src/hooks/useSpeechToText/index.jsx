import React, { useEffect, useRef, useState } from 'react'

const useSpeechToText = (options) => {
    const [isListening, setIsListening] = useState(false)
    const [transcript, setTranscript] = useState("")
    const recognitionRef = useRef(null) 

}

export default useSpeechToText  