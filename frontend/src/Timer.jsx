import React, { useState, useEffect, useRef } from 'react';
import './Timer.css';

function Timer() {
    const [timeLeft, setTimeLeft] = useState(0);
    const [running, setRunning] = useState(false);
    const [statusText, setStatusText] = useState("Enter time manually or use voice commands.");

    const timerRef = useRef(null);
    const alarmRef = useRef(null);
    const recognitionRef = useRef(null);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const startTimer = () => {
        if (timeLeft > 0 && !running) {
            setRunning(true);
            setStatusText("Timer started.");
            speak("Timer started.");

            timerRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current);
                        setRunning(false);
                        setStatusText("Time's up!");
                        speak("Time's up!");
                        alarmRef.current?.play();
                        return 0;
                    }
                    return prev - 1;
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
        if (!running && timeLeft > 0) {
            startTimer();
        }
    };

    const stopTimer = () => {
        clearInterval(timerRef.current);
        setTimeLeft(0);
        setRunning(false);
        setStatusText("Timer stopped.");
        speak("Timer stopped.");
    };

    const resetTimer = () => {
        clearInterval(timerRef.current);
        setTimeLeft(0);
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
            setStatusText(`Timer set for ${input}`);
            speak(`Timer set for ${input}`);
        } else {
            setStatusText("Invalid input. Use format like '2 minutes 30 seconds'.");
            speak("Invalid input. Please use a valid time format. For example, '2 minutes 30 seconds'.");
        }
    };

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognitionRef.current = recognition;

        recognition.onresult = (event) => {
            const command = event.results[0][0].transcript.trim().toLowerCase();
            if (command.includes("set timer for")) {
                const timeInSeconds = parseTime(command);
                if (timeInSeconds > 0) {
                    setTimeLeft(timeInSeconds);
                    setStatusText(`Timer set for ${command.replace("set timer for", "").trim()}`);
                    speak(`Timer set for ${command.replace("set timer for", "").trim()}`);
                    startTimer();
                }
            } else if (command.includes("start timer")) startTimer();
            else if (command.includes("pause timer")) pauseTimer();
            else if (command.includes("resume timer")) resumeTimer();
            else if (command.includes("stop timer")) stopTimer();
            else if (command.includes("reset timer")) resetTimer();
        };
    }, []);

    const startVoiceRecognition = () => recognitionRef.current?.start();

    const stopAlarmSound = () => {
        alarmRef.current.pause();
        alarmRef.current.currentTime = 0;
    };

    const speak = (text) => speechSynthesis.speak(new SpeechSynthesisUtterance(text));

    return (
        <div className="timer-wrapper">
            <h1 className="timer-title">Accessible Voice Timer</h1>
            <p className="timer-status">{statusText}</p>

            <div className="timer-input-block">
                <input className="timer-input" type="text" id="manualInput" placeholder="Enter Time" />
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
