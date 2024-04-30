//Accessing the elements from the html
const item = document.querySelector("#item");
const toDoBox = document.querySelector("#to-do-box");

const localStorageTodoItems = JSON.parse(localStorage.getItem("todoListArray"));
if (localStorageTodoItems?.length > 0) {
  localStorageTodoItems.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = item;
    toDoBox.appendChild(listItem);

    const target = listItem.querySelector("i")
    target.addEventListener("click", function(e) {
      const filterdArray = localStorageTodoItems.filter((item) => {
        const text = item.split(" ")[0]
        text !== listItem.innerText
      })
      localStorage.setItem("todoListArray", JSON.stringify(filterdArray));
      listItem.remove()
    });

    listItem.addEventListener("click", function () {
      this.classList.toggle("done");
    });
  });
}

item.addEventListener(
  "keyup", //keyup event will track the keyboard presses that we made on the keyboard
  function (event) {
    if (event.key == "Enter") {
      addToList(this.value);
      this.value = "";
    }
  }
);

const addToList = (value) => {
  const listItem = document.createElement("li");
  const newValue = `${value} <i class="fas fa-times"></i>`;

  const toDoItemsArray = [];

  const localStorageTodoItems = JSON.parse(
    localStorage.getItem("todoListArray")
  );

  // TODO :- add extra functionality that detects the same todo list if that item exits through an warning
  const checkWordExistence = localStorageTodoItems.findIndex( (item) => {
    return item.toLowerCase() === newValue.toLowerCase()
  })

  if(checkWordExistence != -1) {
    alert("You have entered same task to do");
    return;
  }
  
  toDoItemsArray.push(newValue);

  


  if (localStorageTodoItems && localStorageTodoItems.length > 0) {
    let upDatedItems = [];
    upDatedItems = [...localStorageTodoItems, newValue];
    localStorage.setItem("todoListArray", JSON.stringify(upDatedItems));
  } else {
    localStorage.setItem("todoListArray", JSON.stringify(toDoItemsArray));
  }

  listItem.innerHTML = newValue;

  listItem.querySelector("i")
  .addEventListener("click", function(e) {
    const filterdArray = toDoItemsArray.filter((item) => item !== newValue)
    localStorage.setItem("todoListArray", JSON.stringify(filterdArray));
    listItem.remove()
  });


  listItem.addEventListener("click", function () {
    this.classList.toggle("done"); //toggle is used to append the extra mentioned class (done) in the list for listItem
  });

  toDoBox.appendChild(listItem);
  
};
