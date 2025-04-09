import './AiModel.css';
import { useState } from "react";

function AiModel() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

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
      setResponse(data.response || data.error || "No response received.");
    } catch (error) {
      setResponse("Error: " + error.message);
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
