// scripting.js

let startTime, updatedTime, difference, tInterval;
let running = false;
let paused = false;
let savedTime = 0;
let laps = [];

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const display = document.getElementById('display');
const lapsList = document.getElementById('lapsList');

function start() {
    if (!running) {
        if (paused) {
            startTime = new Date().getTime() - savedTime;
        } else {
            startTime = new Date().getTime();
        }
        tInterval = setInterval(updateTime, 1);
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        resetBtn.disabled = false;
        lapBtn.disabled = false;
        running = true;
        paused = false;
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        savedTime = difference;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        running = false;
        paused = true;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    paused = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    display.innerHTML = '00:00:00.000';
    laps = [];
    savedTime = 0;
    renderLaps();
}

function lap() {
    if (running || paused) {
        laps.push(display.innerHTML);
        renderLaps();
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000));
    
    display.innerHTML = 
        (hours < 10 ? '0' : '') + hours + ':' +
        (minutes < 10 ? '0' : '') + minutes + ':' +
        (seconds < 10 ? '0' : '') + seconds + '.' +
        (milliseconds < 100 ? '0' : '') + (milliseconds < 10 ? '0' : '') + milliseconds;
}

function renderLaps() {
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        const li = document.createElement('li');
        li.innerText = `Lap ${index + 1}: ${lap}`;
        lapsList.appendChild(li);
    });
}

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
