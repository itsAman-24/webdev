const container = document.querySelector(".container");
const body = document.querySelector("body");
const srtBtn = document.querySelector("#srtBtn");

const promise1_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h";
const promise2_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=gecko_desc&per_page=10&page=2&sparkline=false&price_change_percentage=24h";
const promise3_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=gecko_desc&per_page=10&page=3&sparkline=false&price_change_percentage=24h";

let combinedArray = [];

async function fetchData() {
    try {
        const responses = await Promise.all([
            fetch(promise1_URL),
            fetch(promise2_URL),
            fetch(promise3_URL)
        ]);

        const data = await Promise.all(responses.map(response => response.json()));

        combinedArray = [...data[0], ...data[1], ...data[2]];
        console.log("combinedArray is", combinedArray);
    } catch (err) {
        body.innerText = "Error while fetching the API data";
        body.style.color = "white";
        console.error("Error:", err);
    }
}

fetchData();

srtBtn.addEventListener("click", () => {
    srtBtn.classList.add('srtBtn');
    body.style.backgroundImage = "url('https://wallpaperaccess.com/full/395434.jpg')";
    body.style.backgroundColor = "white";

    container.innerHTML = '';  // Clear existing content

    combinedArray.forEach(value => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('jsStyle');
        newDiv.innerHTML = `
        <div class="item">
            <i id="icon" class="fa-solid fa-circle-info" data-coin='${JSON.stringify(value)}'></i>
            <img src="${value.image}" alt="${value.name}">
            <div class="info">
                <span>Name: ${value.name}</span>
                <span>Current Price: ${value.current_price}</span>
            </div>
            <div class="buyNow">
                <button>Buy now</button>
            </div>
            
        </div>
        `;
        container.appendChild(newDiv);
    });

    document.querySelectorAll('.fa-circle-info').forEach((icon) => {
        icon.addEventListener('click', (event) => {
            
            const coinData = JSON.parse(event.target.getAttribute('data-coin'));
            showDetails(coinData);
        });
    });
});

function showDetails(value) {
    console.log(value);
}
