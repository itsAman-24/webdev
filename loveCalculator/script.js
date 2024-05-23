const btn = document.querySelector(".calculate");
const your_name = document.querySelector(".yourName");
const crush_name = document.querySelector(".crushName");
const show_msg = document.querySelector(".show-msg");
const show_percent = document.querySelector(".percent");
const card = document.querySelector(".love-card");
const percent_section = document.querySelector(".percent_section");

btn.addEventListener("click" , () => {
    checkRelation();
})

function  checkRelation() {
    if(your_name.value && crush_name.value) {
    let percent = Math.floor(Math.random() * 101);
    show_msg.innerHTML = your_name.value + " and " + crush_name.value + "'s chance of love: ";
    show_percent.innerHTML = percent.toString() + "%" ;
    btn.classList.add("remove");
    let resetBtn = document.createElement('button');
    resetBtn.classList.add("resetBtn");
    resetBtn.innerText = "Reset";
    percent_section.appendChild(resetBtn);
    
    resetBtn.addEventListener("click" , () => {
        resetFunction();
    })
    

    } else {
        show_msg.innerHTML = "Insert both the names first";
    }
    
}


function resetFunction() {
    card.innerHTML = `
        <h1 class="heading">Love Calculator</h1>
        <p>Enter your name and your crush's name to see the chances that this relationship will work out:</p>
        <input class="yourName" type="text" placeholder="Enter your name here"> <br>
        <input class="crushName" type="text" placeholder="Enter crush's name "> <br>
        <button class="calculate">Calculate</button>
        <h2 class="show-msg"></h2>
        <div class="percent_section">
            <span class="percent"></span>
        </div>
    `;
}

