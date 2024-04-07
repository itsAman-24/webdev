document.querySelector("#green").addEventListener("click", () => {
  document.body.style.backgroundColor = "green";
});

document.querySelector("#red").addEventListener("click", () => {
  document.body.style.backgroundColor = "red";
});

document.querySelector("#blue").addEventListener("click", () => {
  document.body.style.backgroundColor = "blue";
});

//creating an array of numbers and alphabets to generate the haxadecimal values for different colors

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


document.querySelector("#random").addEventListener("click", () => {
    
    let hexColorCode = "#";
    for (var i = 0; i < 6; i++) {
        let randomIndex = Math.floor(Math.random() * hexNumbers.length);
        hexColorCode += hexNumbers[randomIndex];
    }
    document.body.style.backgroundColor = hexColorCode;
    
});
