//function for creating multiple bubbles using for loop
let makeBubble = () => {
    let cluster = `<div class="bubble">${Math.floor(Math.random() * 10)}</div>`;

for(let i = 1; i <= 101; i++) {
    let rdm = Math.floor(Math.random() * 10);
    cluster += `<div class="bubble">${rdm}</div>`;
}

document.querySelector("#pbtm").innerHTML = cluster;
}

makeBubble();

//creating arrow function for dynamic behaviour of timer
let time = 60;

const  setTimer = () => {
    const timeInterval = setInterval(function () {
        if(time > 0) {
            time--;
            document.querySelector("#timerVal").textContent = time;
        }

        else {
            clearInterval(timeInterval);   // using this to stop the setInterval's execution when time reaches to 0
            document.querySelector("#pbtm").innerHTML = `<h1>GAME OVER</h1>`;
        }
    
    } , 1000);
}

setTimer();

//creating a function for generating random Hit numbers
let hitNum = Math.floor(Math.random() * 10);

let rdmHit = () => {
 hitNum = Math.floor(Math.random() * 10);
    document.querySelector("#hit").textContent = hitNum;
}

rdmHit();

let score = 0;
let setScore = () => {
    score += 10;
    document.querySelector("#score").textContent = score;
}

//adding eventListner on the bubble that we clicked inside pbtm class

document.querySelector("#pbtm").addEventListener("click" , (clickDetail) => {
    const clickedNum = Number(clickDetail.target.textContent);
    if(clickedNum === hitNum) {
        setScore();
        makeBubble();
        rdmHit();
    }   

    else {
        navigator.vibrate([1000,500,2000]);
    }
});
