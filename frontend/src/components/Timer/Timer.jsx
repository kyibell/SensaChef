import React, { useState, useEffect, useRef } from 'react';
import './Timer.css';

function Timer() {
    const [timeLeft, setTimeLeft] = useState(0);
    const [running, setRunning] = useState(false);
    const [statusText, setStatusText] = useState("Enter time manually or use voice commands.");

    const timerRef = useRef(null);
    const timeLeftRef = useRef(timeLeft); // <-- NEW
    const alarmRef = useRef(null);
    const recognitionRef = useRef(null);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const startTimer = () => {
        if (!running) {
            if (timeLeftRef.current <= 0) {
                setStatusText("Please set a time before starting.");
                speak("Please set a time before starting the timer.");
                return;
            }

            setRunning(true);
            setStatusText("Timer started.");
            speak("Timer started.");

            timerRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    const newTime = prev - 1;
                    timeLeftRef.current = newTime; // <-- keep ref updated
                    if (newTime <= 0) {
                        clearInterval(timerRef.current);
                        setRunning(false);
                        setStatusText("Time's up!");
                        speak("Time's up!");
                        alarmRef.current?.play();
                        return 0;
                    }
                    return newTime;
                });
            }, 1000);
        }
    };

    const pauseTimer = () => {
        clearInterval(timerRef.current);
        setRunning(false);
        setStatusText("Timer paused.");
        speak("Timer paused.");
    };

    const resumeTimer = () => {
        if (!running && timeLeftRef.current > 0) {
            startTimer();
        }
    };

    const stopTimer = () => {
        clearInterval(timerRef.current);
        setTimeLeft(0);
        timeLeftRef.current = 0;
        setRunning(false);
        setStatusText("Timer stopped.");
        speak("Timer stopped.");
    };

    const resetTimer = () => {
        clearInterval(timerRef.current);
        setTimeLeft(0);
        timeLeftRef.current = 0;
        setRunning(false);
        setStatusText("Timer reset.");
        speak("Timer reset.");
    };

    const parseTime = (input) => {
        const regex = /(\d+)\s?(seconds?|minutes?|hours?)/gi;
        let match;
        let totalSeconds = 0;

        while ((match = regex.exec(input)) !== null) {
            const value = parseInt(match[1]);
            if (/hour/i.test(match[2])) totalSeconds += value * 3600;
            else if (/minute/i.test(match[2])) totalSeconds += value * 60;
            else if (/second/i.test(match[2])) totalSeconds += value;
        }
        return totalSeconds;
    };

    const handleSetTime = () => {
        const input = document.getElementById("manualInput").value.toLowerCase();
        const seconds = parseTime(input);
        if (seconds > 0) {
            setTimeLeft(seconds);
            timeLeftRef.current = seconds; // <-- sync ref
            setStatusText(`Timer set for ${input}`);
            speak(`Timer set for ${input}`);
            setTimeout(() => startTimer(), 100); // delay to ensure sync
        } else {
            setStatusText("Invalid input. Use format like '2 minutes 30 seconds'.");
            speak("Invalid input. Please use a valid time format. For example, '2 minutes 30 seconds'.");
        }
    };

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setStatusText("Your browser does not support voice recognition.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
            console.log("Voice recognition started.");
        };

        recognition.onend = () => {
            console.log("Voice recognition ended.");
        };

        recognition.onerror = (event) => {
            console.error("Speech Recognition Error:", event.error);
            setStatusText("Voice recognition error. Try again.");
        };

        recognition.onresult = (event) => {
            const command = event.results[0][0].transcript.trim().toLowerCase();
            console.log("Heard command:", command);
            setStatusText(`Heard: "${command}"`);

            if (
                command.includes("set timer for") ||
                command.includes("set a timer for") ||
                command.includes("set the timer for")
            ) {
                const cleanedCommand = command
                    .replace("set timer for", "")
                    .replace("set a timer for", "")
                    .replace("set the timer for", "")
                    .trim();

                const timeInSeconds = parseTime(cleanedCommand);
                if (timeInSeconds > 0) {
                    setTimeLeft(timeInSeconds);
                    timeLeftRef.current = timeInSeconds; // <-- sync ref
                    setStatusText(`Timer set for ${cleanedCommand}`);
                    speak(`Timer set for ${cleanedCommand}`);
                    setTimeout(() => startTimer(), 100);
                    return;
                }
            }

            if (command.includes("start") || command.includes("begin") || command.includes("go")) {
                startTimer();
            } else if (command.includes("pause")) {
                pauseTimer();
            } else if (command.includes("resume") || command.includes("continue")) {
                resumeTimer();
            } else if (command.includes("stop")) {
                stopTimer();
            } else if (command.includes("reset")) {
                resetTimer();
            } else {
                speak("Command not recognized.");
                setStatusText("Sorry, I didn't understand the command.");
            }
        };

        recognitionRef.current = recognition;
    }, []);

    const startVoiceRecognition = () => {
        try {
            recognitionRef.current?.start();
        } catch (err) {
            console.error("Error starting voice recognition:", err.message);
        }
    };

    const stopAlarmSound = () => {
        alarmRef.current.pause();
        alarmRef.current.currentTime = 0;
    };

    const speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
    };

    return (
        <div className="timer-wrapper">
            <h1 className="timer-title">Accessible Voice Timer</h1>
            <p className="timer-status">{statusText}</p>

            <div className="timer-input-block">
                <input className="timer-input" type="text" id="manualInput" placeholder="Enter Time (e.g. 2 minutes)" />
                <button className="timer-set-button" onClick={handleSetTime}>Set Time</button>
            </div>

            <div className="time-display">{formatTime(timeLeft)}</div>

            <div className="timer-buttons">
                <button onClick={startTimer}>Start</button>
                <button onClick={pauseTimer}>Pause</button>
                <button onClick={resumeTimer}>Resume</button>
                <button onClick={stopTimer}>Stop</button>
                <button onClick={resetTimer}>Reset</button>
                <button onClick={startVoiceRecognition}>Voice Control</button>
                <button onClick={stopAlarmSound}>Stop Sound</button>
            </div>

            <audio ref={alarmRef} src="timer.mp3"></audio>
        </div>
    );
}

export default Timer;
