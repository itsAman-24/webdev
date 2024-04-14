let secInterval = 0;
let interval = null;

let timer = document.querySelector("#timer");
let startBtn = document.querySelector("#startBtn");
const stopBtn = document.querySelector("#stopBtn");
const resetBtn = document.querySelector("#resetBtn");


//This func is created to check if the minute and seconc is not of 2 numbers then it will add "0" infront of minute as well as second 
function padStart(value) {
    return String(value).padStart(2,"0");
}

function updateTimer() {
    const minute = Math.floor(secInterval / 60);  //calculates the minutes
    const second = secInterval % 60; // calculates the second
    timer.innerHTML = `${padStart(minute)} : ${padStart(second)}`;
}

//this function will increase the seconds count
function timerfunc() {
    secInterval++;
    updateTimer();
}


//function for starting the clock
const startClock = () => {
    if(interval) resetClock();

    interval = setInterval(timerfunc, 1000);
}

startBtn.addEventListener("click" , startClock);


//function for stopping the clock
const stopClock = () => {
    clearInterval(interval);
}

stopBtn.addEventListener("click" , stopClock);



//function fot reseting the clock
const resetClock = () => {
    stopClock();
    secInterval = 0;
    updateTimer();
}

resetBtn.addEventListener("click" , resetClock);
