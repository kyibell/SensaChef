let timer;
let timeLeft = 0;
let running = false;
const timeDisplay = document.getElementById("time-display");
const statusText = document.getElementById("status");
const alarmSound = document.getElementById("alarmSound");

function updateDisplay() {
    let hours = Math.floor(timeLeft / 3600);
    let minutes = Math.floor((timeLeft % 3600) / 60);
    let seconds = timeLeft % 60;
    timeDisplay.innerText = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    if (timeLeft > 0 && !running) {
        running = true;
        statusText.innerText = "Timer started.";
        speak("Timer started.");
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timer);
                running = false;
                statusText.innerText = "Time's up!";
                speak("Time's up!");
                alarmSound.play();
            }
        }, 1000);
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(timer);
        running = false;
        statusText.innerText = "Timer paused.";
        speak("Timer paused.");
    }
}

function resumeTimer() {
    if (!running && timeLeft > 0) {
        startTimer();
    }
}

function stopTimer() {
    clearInterval(timer);
    timeLeft = 0;
    running = false;
    updateDisplay();
    statusText.innerText = "Timer stopped.";
    speak("Timer stopped.");
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 0;
    running = false;
    updateDisplay();
    statusText.innerText = "Timer reset.";
    speak("Timer reset.");
}

function stopAlarmSound() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
}

// Convert spoken/manual input time to seconds
function parseTime(input) {
    let regex = /(\d+)\s?(seconds?|minutes?|hours?)/gi;
    let match;
    let totalSeconds = 0;

    while ((match = regex.exec(input)) !== null) {
        let value = parseInt(match[1]);
        if (/hour/i.test(match[2])) {
            totalSeconds += value * 3600;
        } else if (/minute/i.test(match[2])) {
            totalSeconds += value * 60;
        } else if (/second/i.test(match[2])) {
            totalSeconds += value;
        }
    }
    return totalSeconds;
}

// Manual input for setting time
document.getElementById("setTimeBtn").addEventListener("click", function() {
    let input = document.getElementById("manualInput").value.toLowerCase();
    let timeInSeconds = parseTime(input);

    if (timeInSeconds > 0) {
        timeLeft = timeInSeconds;
        updateDisplay();
        statusText.innerText = `Timer set for ${input}`;
        speak(`Timer set for ${input}`);
    } else {
        statusText.innerText = "Invalid input. Please use a valid time format (e.g. 2 minutes 30 seconds or 1 hour).";
        speak("Invalid input. Please use a valid time format.");
    }
});

// Speech recognition setup
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = false;
recognition.lang = "en-US";

recognition.onresult = function (event) {
    let command = event.results[0][0].transcript.trim().toLowerCase();
    console.log("Heard:", command);

    if (command.includes("set timer for")) {
        let timeInSeconds = parseTime(command);
        if (timeInSeconds > 0) {
            timeLeft = timeInSeconds;
            updateDisplay();
            statusText.innerText = `Timer set for ${command.replace("set timer for", "").trim()}`;
            speak(`Timer set for ${command.replace("set timer for", "").trim()}`);
            startTimer(); // Start the timer automatically after voice input
        }
    } else if (command.includes("start timer")) {
        startTimer();
    } else if (command.includes("pause timer")) {
        pauseTimer();
    } else if (command.includes("resume timer")) {
        resumeTimer();
    } else if (command.includes("stop timer")) {
        stopTimer();
    } else if (command.includes("reset timer")) {
        resetTimer();
    }
};

// Speak text
function speak(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
}

// Attach button events
document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("pauseBtn").addEventListener("click", pauseTimer);
document.getElementById("resumeBtn").addEventListener("click", resumeTimer);
document.getElementById("stopBtn").addEventListener("click", stopTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);
document.getElementById("voiceBtn").addEventListener("click", () => recognition.start());
document.getElementById("stopSoundBtn").addEventListener("click", stopAlarmSound);
