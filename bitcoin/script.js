const container = document.querySelector(".container");
const body = document.querySelector("body");
const srtBtn = document.querySelector("#srtBtn");

const promise1_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h";
const promise2_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=gecko_desc&per_page=10&page=2&sparkline=false&price_change_percentage=24h";
const promise3_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=gecko_desc&per_page=10&page=3&sparkline=false&price_change_percentage=24h";

let combinedArray;

async function promise() {
    try {
        const values = await Promise.all([
            fetch(promise1_URL),
            fetch(promise2_URL),
            fetch(promise3_URL)
        ]);

        const data1 = await values[0].json();
        const data2 = await values[1].json();
        const data3 = await values[2].json();

        console.log("array1 is", data1);
        console.log("array2 is", data2);
        console.log("array3 is", data3);

        // Using spread operator to combine arrays
        combinedArray = [...data1, ...data2, ...data3];
        console.log("combinedArr is", combinedArray);
    } catch (err) {
        body.innerText = "404...   Found an error";
        body.classList.add("errorHandlingClass");
        body.style.color = "white";
    }
}

promise();

srtBtn.addEventListener("click", () => {
    srtBtn.classList.add('srtBtn');
    container.innerHTML = ''; // Clear existing content

    combinedArray.forEach((value) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('jsStyle');
        newDiv.innerHTML = `
            <div class="bitcoinItem">
                <p>more</p>
                <i id="icon" class="icon fa-solid fa-circle-info" data-coin='${JSON.stringify(value)}'></i>
                <img src="${value.image}" alt="${value.name}">
                <div class="info">
                    <span>Name: ${value.name}</span>
                    <span>Current Price: ${value.current_price}</span>
                </div>
                <div class="buyNow">
                    <button class="buynow">Buy now</button>
                </div>
                <div class="detail_Container"></div> 
            </div>
        `;
        container.appendChild(newDiv);
    });

    // Attach event listeners to all info icons
    document.querySelectorAll('.fa-circle-info').forEach((icon) => {
        icon.addEventListener('click', (event) => {
            const coinData = JSON.parse(event.target.getAttribute('data-coin'));
            const cardElement = event.target.closest('.bitcoinItem'); // Find the closest item (card) element
            showDetails(coinData, cardElement);
        });
    });
});

// Creating an empty div to show the details of a particular bitcoin
let details = document.createElement('div');
details.classList.add('details_Style');

async function showDetails(value, cardElement) {
    // Check if the card element and details container exist
    if (!cardElement) {
        console.error("Card element not found");
        return;
    }
    
    const detailsContainer = cardElement.querySelector('.detail_Container');
    if (!detailsContainer) {
        console.error("Details container not found in card element");
        return;
    }
    
    cardElement.classList.add('detail_Design');

    // Create the details div
    details.innerHTML = `
        <p id="moreDetail">More Details:-</p>
        <p>Name: ${value.name}</p><br>
        <p>Current Price: ${value.current_price}</p><br>
        <p>ath: ${value.ath}</p><br>
        <p>ath_change_percentage: ${value.ath_change_percentage}</p><br>
        <p>ath_date: ${value.ath_date}</p><br>
        
        <button class="closeDetails">Close</button>
    `;

    // Clear previous details if any
    detailsContainer.innerHTML = '';
    detailsContainer.appendChild(details);

    const button = details.querySelector(".closeDetails");

    button.addEventListener("click", () => {
        detailsContainer.removeChild(details);
        cardElement.classList.remove('detail_Design');
        // Optionally, use:
        // details.classList.add('display_None');
    });
}
