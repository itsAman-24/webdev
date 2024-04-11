let secInterval = 0;
let interval = null;

const timer = document.querySelector("#timer");
let startBtn = document.querySelector("#startBtn");

function updateTimer() {
    timer.innerHTML = secInterval;
}

function timer() {
    secInterval++;
    updateTimer();
}

startBtn.addEventListener("click" , startClock());

function startClock() {
    timer.setInterval(timer, 1000);
}

function stopClock() {

}

function resetClock() {

}
