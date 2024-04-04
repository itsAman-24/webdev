//function for creating multiple bubbles using for loop
let makeBubble = () => {
    let cluster = '<div class="bubble">5</div>';

for(let i = 1; i <= 178; i++) {
    let rdm = Math.floor(Math.random() * 10);
    cluster += `<div class="bubble">${rdm}</div>`;
}

document.querySelector("#pbtm").innerHTML = cluster;
}

makeBubble();

//creating arrow function for dynamic behaviour of timer
let time = 5;

let setTimer = () => {
    let timeInterval = setInterval(function () {
        if(time > 0) {
            time--;
            document.querySelector("#timerVal").textContent = time;
        }

        else {
            clearInterval(timeInterval);   // using this to stop the setInterval's execution when time reaches to 0
        }
    
    } , 1000);
}

setTimer();