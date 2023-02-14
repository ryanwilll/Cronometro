const hoursEl = document.querySelector("#hours");
const minutesEl = document.querySelector("#minutes");
const secondsEl = document.querySelector("#seconds");
const milisecondsEl = document.querySelector("#miliseconds");

const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resumeBtn = document.querySelector("#resumeBtn");
const restartBtn = document.querySelector("#restartBtn");

let isPaused = false;
let miliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;

startBtn.addEventListener("click", startCounter);
pauseBtn.addEventListener("click", pauseCounter);
resumeBtn.addEventListener("click", resumeCounter);
restartBtn.addEventListener("click", restartCounter);

function startCounter() {
  startBtn.style.display = "none";
  pauseBtn.style.display = "inline-block";
  restartBtn.style.display = "inline-block";

  interval = setInterval(() => {
    if (!isPaused) {
      miliseconds += 10;

      if (miliseconds === 1000) {
        seconds++;
        miliseconds = 0;
      }

      if (seconds === 60) {
        minutes++;
        seconds = 0;
      }

      if (minutes === 60) {
        hours++;
        minutes = 0;
      }

      hoursEl.textContent = formatTime(hours);
      minutesEl.textContent = formatTime(minutes);
      secondsEl.textContent = formatTime(seconds);
      milisecondsEl.textContent = formatMiliseconds(miliseconds);
    }
  }, 10);
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

function formatMiliseconds(time) {
  return time < 100 ? `${time}`.padStart(3, "0") : time;
}

function pauseCounter() {
  isPaused = true;
  resumeBtn.style.display = "inline-block";
  pauseBtn.style.display = "none";
}

function resumeCounter() {
  isPaused = false;
  resumeBtn.style.display = "none";
  pauseBtn.style.display = "inline-block";
}

function restartCounter() {
  pauseBtn.style.display = "none";
  resumeBtn.style.display = "none";
  restartBtn.style.display = "none";
  startBtn.style.display = "inline-block";

  isPaused = false;
  clearInterval(interval);
  hours = 0;
  minutes = 0;
  seconds = 0;
  miliseconds = 0;

  hoursEl.textContent = `00`;
  minutesEl.textContent = `00`;
  secondsEl.textContent = `00`;
  milisecondsEl.textContent = `000`;
}
