import React, { useState } from "react";
import useTextToSpeech from "./hooks/useTextToSpeech";

const TextToSpeech = () => {
    const [text, setText] = useState('')
    const enUSVoice = useTextToSpeech()

    
}

export default TextToSpeech