let time = 0;
let isRunning = false;
let mode = "stopwatch";
let interval;
const countdownDuration = 60 * 1000;

const app = document.getElementById("app");
const timerDisplay = document.getElementById("timerDisplay");
const quoteEl = document.getElementById("quote");
const progressBar = document.getElementById("progressBar");

const stopwatchBtn = document.getElementById("stopwatchBtn");
const countdownBtn = document.getElementById("countdownBtn");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  const milliseconds = String(ms % 1000).padStart(3, "0").substring(0, 2);
  return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay() {
  timerDisplay.textContent = formatTime(time);
  updateProgressBar();
}

function updateProgressBar() {
  if (mode === "countdown") {
    const percent = ((countdownDuration - time) / countdownDuration) * 100;
    progressBar.style.width = `${percent}%`;
  } else {
    progressBar.style.width = `100%`;
  }
}

function startTimer() {
  interval = setInterval(() => {
    time = mode === "countdown" ? Math.max(time - 10, 0) : time + 10;
    updateDisplay();

    if (mode === "countdown" && time <= 0) {
      pauseTimer();
    }
  }, 10);
}

function pauseTimer() {
  clearInterval(interval);
  isRunning = false;
  startPauseBtn.textContent = "Start";
}

function handleStartPause() {
  if (isRunning) {
    pauseTimer();
  } else {
    startTimer();
    isRunning = true;
    startPauseBtn.textContent = "Pause";
  }
}

function handleReset() {
  pauseTimer();
  time = mode === "countdown" ? countdownDuration : 0;
  updateDisplay();
}

function switchMode(newMode) {
  pauseTimer();
  mode = newMode;

  stopwatchBtn.classList.toggle("active", mode === "stopwatch");
  countdownBtn.classList.toggle("active", mode === "countdown");

  time = mode === "countdown" ? countdownDuration : 0;
  quoteEl.innerHTML = mode === "countdown"
    ? "💬 <em>Countdown mode. Make every second count.</em>"
    : "💬 <em>Stay focused. Stay determined.</em>";

  app.className = `app ${mode}`;
  updateDisplay();
}

stopwatchBtn.addEventListener("click", () => switchMode("stopwatch"));
countdownBtn.addEventListener("click", () => switchMode("countdown"));
startPauseBtn.addEventListener("click", handleStartPause);
resetBtn.addEventListener("click", handleReset);

// Initialize
updateDisplay();
