// scripting.js
let timer;
let seconds = 0;
let minutes = 0;
let hours = 0;
const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');
startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
function start() {
    clearInterval(timer);
    timer = setInterval(updateTime, 1000);
}
function pause() {
    clearInterval(timer);
}
function reset() {
    clearInterval(timer);
    seconds = 0;
    minutes = 0;
    hours = 0;
    displayTime();
    laps.innerHTML = '';
}
function lap() {
    const lapTime = document.createElement('li');
    lapTime.textContent = formatTime(hours, minutes, seconds);
    laps.appendChild(lapTime);
}
function updateTime() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
    }
    displayTime();
}
function displayTime() {
    display.textContent = formatTime(hours, minutes, seconds);
}
function formatTime(hours, minutes, seconds) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(unit) {
    return unit < 10 ? '0' + unit : unit;
}
