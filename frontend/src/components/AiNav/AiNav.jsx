import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import SpeechRecognition from 'react-speech-recognition';
import './AiNav.css'
import Microphone from '../../assets/Microphone.svg';


const AiNav = ({ transcript, listening, startListening, resetTranscript, speak }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const lastHandledTranscript = useRef("");
  const handled = useRef(false);
  const delay = 1500; // 1.5 seconds after last update before triggering

  const speakThenNavigate = (text, path) => {
    return new Promise((resolve) => {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => resolve();
      synth.speak(utterance);
    }).then(() => {
      navigate(path);
    });
  };

  useEffect(() => {
    if (!transcript || transcript === lastHandledTranscript.current) return;

    let timeout = setTimeout(() => {
      lastHandledTranscript.current = transcript;
      handled.current = false;

      SpeechRecognition.stopListening();
      resetTranscript();

      const parseIntent = async () => {
        try {
          // for development
          // const res = await axios.post("http://localhost:8000/api/AiNav/", {
          //   text: transcript,
          // });
          // https://sensachef-backend.onrender.com/
          // for production
          const res = await axios.post("https://sensachef-backend.onrender.com/api/AiNav/", {
            text: transcript,
          });
          let intent, target;
          try {
            const parsed = typeof res.data === "string" ? JSON.parse(res.data) : res.data;
            intent = parsed.intent;
            target = parsed.target;
          } catch (err) {
            speak("Sorry, I couldn't understand that.");
            return;
          }

          console.log("Parsed Intent:", intent);
          console.log("Parsed Target:", target);

          // Navigate
          if (intent?.toLowerCase() === "navigate" && typeof target === "string") {
            const cleaned = target.toLowerCase().trim();
            if (!cleaned || cleaned === "unknown") {
              speak("Sorry, I didn't catch where you want to go.");
              return;
            }

            const path = `/${cleaned}`;
            if (location.pathname === path) {
              return;
            }

            await speakThenNavigate(`Navigating to ${cleaned}`, path);
            handled.current = true;
          }

          // Click element by ID
          else if (intent?.toLowerCase() === "click") {
            const element = document.getElementById(target);
            if (element) {
              speak(`Clicking ${target.replace(/-/g, " ")}`);
              element.click();
              handled.current = true;
            } else {
              speak("Sorry, I couldn't find that button.");
            }
          }

          // Scroll
          else if (intent?.toLowerCase() === "scroll") {
            if (target === "down") {
              window.scrollBy({ top: 500, behavior: "smooth" });
              speak("Scrolling down");
              handled.current = true;
            } else if (target === "up") {
              window.scrollBy({ top: -500, behavior: "smooth" });
              speak("Scrolling up");
              handled.current = true;
            } else {
              speak("Scroll where?");
            }
          }

          // Go back
          else if (intent?.toLowerCase() === "go_back") {
            speak("Going back");
            navigate(-1);
            handled.current = true;
          }

          // Logout
          else if (intent?.toLowerCase() === "logout") {
            speak("Logging you out");
            handled.current = true;
          }

          else {
            console.log("unknown intent or target"); // Debugging
          }

        } catch (err) {
          speak("Something went wrong while processing.");
        } finally {
          if (!handled.current) {
            speak("Sorry, I didn’t understand that.");
          }
          handled.current = false;
          SpeechRecognition.stopListening();
          resetTranscript();
        }
      };

      parseIntent();
    }, delay);

    return () => clearTimeout(timeout); // Reset delay if transcript changes again quickly
  }, [transcript]);

  return (
    <div className="Ai-div" >
      <button
      className="AiStart"
        onClick={() => {
          lastHandledTranscript.current = "";
          handled.current = false;
          startListening();
        }}
      >
        <img src={Microphone}/>
      </button>
      <p>{listening ? "Listening..." : "Click to Start"}</p>
    </div>
  );
};

export default AiNav;
