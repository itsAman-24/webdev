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

//function for starting the clock
function startClock() {
    timer.setInterval(timer, 1000);
}

//function for stopping the clock
function stopClock() {

}

//function fot reseting the clock
function resetClock() {

}
