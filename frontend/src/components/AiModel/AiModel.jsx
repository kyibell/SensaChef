import './AiModel.css';
import { useEffect, useState } from "react";

function AiModel() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // Speak the geenrated response
  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const voices = window.speechSynthesis.getVoices();
      const enUSVoice = voices.find(voice => voice.lang === 'en-US');

      if (enUSVoice) {
        window.speechSynthesis.cancel(); // if any prior speech detected, cancel it
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = enUSVoice;
        window.speechSynthesis.speak(utterance);
      }
      else {
        console.warn('Voice is not available');
      }
    }
    else {
      console.warn('tts error');
    }
  };

  useEffect(() => {
    if ('speechSynthesis' in window){
      // force the browser to load the voices when a component mounts
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {};
      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      }
    }
  }, []);

  const AiModel = async () => {
    setLoading(true);
    setResponse("");

    try {
      // for development
      // const res = await fetch("http://localhost:8000/api/ask", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ prompt: question }),
      // });
      // https://sensachef-backend.onrender.com/
      // for production
      const res = await fetch("https://sensachef-backend.onrender.com/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: question }),
      });
      const data = await res.json();
      const AIResponse = data.response || data.error || "No response received."
      setResponse(AIResponse);
      speak(AIResponse);
    } catch (error) {
      const errorResponse = "Error: " + error.message;
      setResponse(errorResponse);
      speak(errorResponse);
    }

    setLoading(false);
  };

  return (
    <div className="Ai-container">
      <h1>Ask AI</h1>
      <hr />
      <div className='ai-input-button'>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a cooking question..."
        className="Ai-input"
      />
      <button className='Ai-ask-button' onClick={AiModel}>Ask</button>
      </div>

      {loading && <p>Loading...</p>}
      {response && (
        <div className="Ai-response">
          <strong>Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default AiModel;
