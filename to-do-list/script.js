const item = document.querySelector("#item");
const toDoBox = document.querySelector("#to-do-box");

item.addEventListener(
    "keyup",                      //keyup event will track the keyboard presses that we made on the keyboard
    function(event) {
        if(event.key == "Enter") {
            addToList(this.value);
            this.value = "";
        }
    }
) 

const addToList = (value) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
    ${value} 
    <i class="fas fa-times"></i>
    `;

    
    listItem.addEventListener(
        "click",
        function() {
            this.classList.toggle("done")   //toggle is used to append the extra mentioned class (done) in the list for listItem
        }
    )

    listItem.querySelector("i").addEventListener(
        "click",
        function() {
           listItem.remove();
        }
        
    )

    toDoBox.appendChild(listItem);

}

