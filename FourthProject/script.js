let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const guestScore = document.querySelector("#guestScore");
const machineScore = document.querySelector("#machineScore");

const genComChoice = () => {
    let options = ["rock" , "paper" , "scissor"];
    let randomIdx = Math.floor(Math.random() * 3);
    return options[randomIdx];

}

const drawGame = () => {
    console.log("Game was draw");
    msg.innerText = "Game was draw..Play again..";
}

const showWinner = (userWin) => {
    if(userWin) {
        console.log("You win!");
        msg.innerText = "You win!";
        userScore++;
        guestScore.innerText = userScore;
        if(userScore === 10) {
            msg.innerText = "Game over.. Congratulations You Won ..Refresh the page";

        }
    }

    else {
        console.log("You lose!");
        msg.innerText = "You lose!";
        compScore++;
        machineScore.innerText = compScore;
        if(compScore === 10) {
            msg.innerText = "Game over.. Ohhhh! Computer Won..Refresh the page";

        }
    }


}

const playGame = (userChoice) => {
    console.log("user choice is = " , userChoice);

    //generating computer choice 
    let compChoice = genComChoice();

    console.log("comp choice is = " , compChoice);

    if(userChoice === compChoice) {
        //game draw
        drawGame();
    }
    else {
        
        let userWin = true;

        if(userChoice === "rock") {

            //computer would have choosen either "paper" OR "scissor" , we are not considering "rock" as this case would have handled by drawGame function

            if(compChoice === "paper") {
                userWin = false;
            }
            else {
                userWin = true;
            }
        }

        else if (userChoice === "paper") {

            //computer would have choosen either "rock" OR "scissor" , we are not considering "paper" as this case would have handled by drawGame function

            userWin = compChoice === "rock" ? true : false; //tertiary way to write the if else condition
        }

        else if(userChoice === "scissor") {

            //computer would have choosen either "rock" OR "paper" , we are not considering "scissor" as this case would have handled by drawGame function

            userWin = compChoice === "rock" ? false : true;
        }

        showWinner(userWin);
    }


}

choices.forEach((choice) => {
    console.log(choice);
    choice.addEventListener("click" , () => {
        let userChoice = choice.getAttribute("id");
        // console.log("choice was clicked" , userChoice);
        playGame(userChoice);
    })
})

