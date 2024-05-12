const startBtn = document.querySelector("#srt");
const stopbtn= document.querySelector("#stop");

//This function will generate the random HEXADECIMAL color code 
const colorChangeFunction = () => {
    let hexNumbers = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
    ];

    let hexaCode = "#";
    for(let i = 0; i < 6; i++) {
        let randomIndex = Math.floor(Math.random() * hexNumbers.length);
        hexaCode += hexNumbers[randomIndex];
    }
    document.body.style.backgroundColor = hexaCode;
}


//ADDING EventHandler to both the buttons

let intervalId;
    startBtn.addEventListener("click" , () => {
        if(intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }

        //if intervlId is not or equals to null then only create a intevalId
        if(intervalId == null) {
            intervalId = setInterval(colorChangeFunction, 1000);
        }
    })
    
stopbtn.addEventListener("click" , () => {
    clearInterval(intervalId);
    intervalId = null;
})
