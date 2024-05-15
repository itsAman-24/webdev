const container = document.querySelector(".container");
const body = document.querySelector("body");
const srtBtn = document.querySelector("#srtBtn");


const promise1_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h";

const promise2_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=gecko_desc&per_page=10&page=2&sparkline=false&price_change_percentage=24h";

const promise3_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=gecko_desc&per_page=10&page=3&sparkline=false&price_change_percentage=24h";

let combinedArray;

async function promise() {

    try{
    const values = await Promise.all([ await fetch (promise1_URL) , await fetch (promise2_URL) , await fetch (promise3_URL) ]);

    const json1_value = await values[0].json();
    const json2_value = await values[1].json();
    const json3_value = await values[2].json();

    console.log("array1 is" , json1_value);
    console.log("array2 is" , json2_value);
    console.log("array3 is" , json3_value);

    combinedArray = json1_value.concat(json2_value,json3_value);
    console.log("combinedArr is" , combinedArray);

    console.log("vev",combinedArray[0].name);
    } catch(err) {
        body.innerText = "Error While fetching the API data";
        body.style.color = "white";
    }


}

promise();


srtBtn.addEventListener("click" , () => {
    srtBtn.classList.add('srtBtn');
    body.style.backgroundImage = "url('https://wallpaperaccess.com/full/395434.jpg')";
    body.style.backgroundColor = "white";

    combinedArray.forEach( (value) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('jsStyle');
        newDiv.innerHTML = `
        <div class="item">
            <img src="${value.image}">
                <div class="info">
                    <span>"Name = ${value.name}"</span>
                    <span>"current_price = ${value.current_price}"</span>
                </div>
            
                <div class="buyNow">
                    <button>Buy now</button>
                </div>
            <i onclick="showDetails(${value})" id="icon" class="fa-solid fa-circle-info" script></i>

        </div>
        `;
        container.appendChild(newDiv);
        // console.log(value);
        // debugger
        document.querySelector("i");
        i.addEventListener("click",() => {
            console.log("hiiii brrrrr");
        })

    });
});

function showDetails(value) {
    debugger
    console.log(value);
    debugger
}

