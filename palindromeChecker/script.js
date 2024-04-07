let inputString = document.querySelector("#text");

let submitBtn = document.querySelector("#submit");

function reverseString(str) {
    return str.split('').reverse().join('');
}

submitBtn.addEventListener("click" , () => {
    const inputedText = inputString.value;
    const reversedText = reverseString(inputedText);

    if(inputedText === reversedText) {
        // document.body.innerHTML = "<h1> It is a palindrome </h1> "
        alert("It is a Palindrome");

    }

    else {
        // document.body.innerHTML = "<h1> It is not a palindrome </h1> "
        alert("It is not a Palindrome");
    }
})