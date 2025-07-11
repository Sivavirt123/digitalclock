let stopwatchInterval;
let timerInterval;
let stopwatchTime = 0;
let timerTime = 0;
let isStopwatchRunning = false;
let isTimerRunning = false;

// Clock functionality
function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour12: false });
  const date = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  document.getElementById("clockDisplay").textContent = time;
  document.getElementById("dateDisplay").textContent = date;
}

// Tab switching
function switchTab(tabName) {
  const tabs = document.querySelectorAll(".tab-content");
  const buttons = document.querySelectorAll(".tab-btn");

  tabs.forEach((tab) => tab.classList.remove("active"));
  buttons.forEach((btn) => btn.classList.remove("active"));

  document.getElementById(tabName).classList.add("active");
  event.target.classList.add("active");
}

// Stopwatch functionality
function startStopwatch() {
  if (!isStopwatchRunning) {
    isStopwatchRunning = true;
    stopwatchInterval = setInterval(() => {
      stopwatchTime++;
      updateStopwatchDisplay();
    }, 10);

    document.getElementById("stopwatchDisplay").classList.add("pulse");
  }
}

function stopStopwatch() {
  if (isStopwatchRunning) {
    isStopwatchRunning = false;
    clearInterval(stopwatchInterval);
    document.getElementById("stopwatchDisplay").classList.remove("pulse");
  }
}

function resetStopwatch() {
  isStopwatchRunning = false;
  clearInterval(stopwatchInterval);
  stopwatchTime = 0;
  updateStopwatchDisplay();
  document.getElementById("stopwatchDisplay").classList.remove("pulse");
}

function updateStopwatchDisplay() {
  const minutes = Math.floor(stopwatchTime / 6000);
  const seconds = Math.floor((stopwatchTime % 6000) / 100);
  const centiseconds = stopwatchTime % 100;

  const display = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}:${centiseconds.toString().padStart(2, "0")}`;
  document.getElementById("stopwatchDisplay").textContent = display;
}

// Timer functionality
function startTimer() {
  if (!isTimerRunning) {
    const minutes = parseInt(document.getElementById("minutes").value) || 0;
    const seconds = parseInt(document.getElementById("seconds").value) || 0;

    if (timerTime === 0) {
      timerTime = (minutes * 60 + seconds) * 100;
    }

    if (timerTime > 0) {
      isTimerRunning = true;
      timerInterval = setInterval(() => {
        timerTime--;
        updateTimerDisplay();

        if (timerTime <= 0) {
          stopTimer();
          document.getElementById("timerDisplay").classList.add("finished");
          setTimeout(() => {
            document
              .getElementById("timerDisplay")
              .classList.remove("finished");
          }, 5000);
        }
      }, 10);

      document.getElementById("timerDisplay").classList.add("pulse");
    }
  }
}

function stopTimer() {
  if (isTimerRunning) {
    isTimerRunning = false;
    clearInterval(timerInterval);
    document.getElementById("timerDisplay").classList.remove("pulse");
  }
}

function resetTimer() {
  isTimerRunning = false;
  clearInterval(timerInterval);
  timerTime = 0;
  updateTimerDisplay();
  document.getElementById("timerDisplay").classList.remove("pulse", "finished");
  document.getElementById("minutes").value = "";
  document.getElementById("seconds").value = "";
}

function updateTimerDisplay() {
  const minutes = Math.floor(timerTime / 6000);
  const seconds = Math.floor((timerTime % 6000) / 100);

  const display = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
  document.getElementById("timerDisplay").textContent = display;
}

// Initialize
updateClock();
setInterval(updateClock, 1000);
updateStopwatchDisplay();
updateTimerDisplay();
