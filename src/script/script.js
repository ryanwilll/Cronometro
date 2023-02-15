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
let interval;
let startTime;

startBtn.addEventListener("click", startCounter);
pauseBtn.addEventListener("click", pauseCounter);
resumeBtn.addEventListener("click", resumeCounter);
restartBtn.addEventListener("click", restartCounter);

// Recupera valores do cronômetro do sessionStorage quando a página é carregada
if (sessionStorage.getItem("startTime")) {
  startTime = new Date(sessionStorage.getItem("startTime"));
  miliseconds = Number(sessionStorage.getItem("miliseconds"));
  seconds = Number(sessionStorage.getItem("seconds"));
  minutes = Number(sessionStorage.getItem("minutes"));
  hours = Number(sessionStorage.getItem("hours"));
  updateClock();
}

function startCounter() {
  startBtn.style.display = "none";
  pauseBtn.style.display = "inline-block";
  restartBtn.style.display = "inline-block";

  startTime = new Date();

  interval = setInterval(() => {
    if (!isPaused) {
      const now = new Date();
      const elapsedTime = now.getTime() - startTime.getTime();
      miliseconds = Math.floor((elapsedTime % 1000) / 10);
      seconds = Math.floor((elapsedTime / 1000) % 60);
      minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
      hours = Math.floor(elapsedTime / (1000 * 60 * 60));

      updateClock();

      // Armazena valores do cronômetro no sessionStorage
      sessionStorage.setItem("startTime", startTime);
      sessionStorage.setItem("miliseconds", miliseconds);
      sessionStorage.setItem("seconds", seconds);
      sessionStorage.setItem("minutes", minutes);
      sessionStorage.setItem("hours", hours);
    }
  }, 10);
}

function updateClock() {
  hoursEl.textContent = formatTime(hours);
  minutesEl.textContent = formatTime(minutes);
  secondsEl.textContent = formatTime(seconds);
  milisecondsEl.textContent = formatMiliseconds(miliseconds);
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

  // remove os dados armazenados no sessionStorage
  sessionStorage.removeItem("startTime");
  sessionStorage.removeItem("miliseconds");
  sessionStorage.removeItem("seconds");
  sessionStorage.removeItem("minutes");
  sessionStorage.removeItem("hours");
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
