const startBtn = document.querySelector("#srt");
const stopBtn = document.querySelector("#stop");
let interData;

function ListenerControl() {
    startBtn.addEventListener("click" , () => {
        intervalData = setInterval(() => {
            console.log("Hi it's" , Date.now());
        },1000);
    })
    
    stopBtn.addEventListener("click" , () => {
        clearInterval(intervalData);
        console.log("Closing the interval");
    })
}

ListenerControl();
