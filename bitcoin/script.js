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

    const data1 = await values[0].json();
    const data2 = await values[1].json();
    const data3 = await values[2].json();

    console.log("array1 is" , data1);
    console.log("array2 is" , data2);
    console.log("array3 is" , data3);

    //using spread operator to combine arrays
    combinedArray = [...data1, ...data2, ...data3];
    console.log("combinedArr is" , combinedArray);

    } catch(err) {
        body.innerText = "Error While fetching the API data";
        body.style.color = "white";
    }


}

promise();

srtBtn.addEventListener("click", () => {
    srtBtn.classList.add('srtBtn');
    // body.style.backgroundImage = "url('https://wallpaperaccess.com/full/395434.jpg')";
    // body.style.backgroundColor = "black";

    container.innerHTML = '';  // Clear existing content

    combinedArray.forEach((value) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('jsStyle');
        newDiv.innerHTML = `
        <div class="item">
            <p>more</p>
            <i id="icon" class="fa-solid fa-circle-info" data-coin='${JSON.stringify(value)}'></i>
            <img src="${value.image}" alt="${value.name}">
            <div class="info">
                <span>Name: ${value.name}</span>
                <span>Current Price: ${value.current_price}</span>
            </div>
            <div class="buyNow">
                <button id="buynow">Buy now</button>
            </div>
            <div class="detail_Container">
                
            </div>

            
        </div>
        `;
        container.appendChild(newDiv);
    });

    let cardElement = document.querySelector('.item');

    document.querySelectorAll('.fa-circle-info').forEach((icon) => {
        icon.addEventListener('click', (event) => {
            
            const coinData = JSON.parse(event.target.getAttribute('data-coin'));
            showDetails(coinData,cardElement);
        });
    });


});




//Creating an empty div to show the details of particular bitcoin in it
// esko bahar esliye create kiya gya hai so that icon k click pe ye baar baar na create ho and doesn't creste overloading
let details = document.createElement('div');

async function showDetails(value,cardElement) {
    // console.log(value);
    // console.log(value.ath);
    // console.log(value.ath_change_percentage);
    
    details.classList.add('details_Style');
    details.innerHTML = `
        <p id="moreDetail">More Details:-</p>
        <p>Name: ${value.name}</p><br>
        <p>Current Price: ${value.current_price}</p><br>
        <p>ath: ${value.ath}</p><br>
        <p>ath_change_percentage: ${value.ath_change_percentage}</p><br>
        <p>ath_date: ${value.ath_date}</p><br>
        <p>atl: ${value.atl}</p><br>
        <p>atl_change_percentage: ${value.atl_change_percentage}</p><br>
        <p>atl_date: ${value.atl_date}</p><br>
        <p>circulating_supply: ${value.circulating_supply}</p><br>
        <p>fully_diluted_valuation: ${value.fully_diluted_valuation}</p><br>
        <p>high_24h: ${value.high_24h}</p><br>
        <p>id: ${value.id}</p><br>
        <p>last_updated: ${value.last_updated}</p><br>
        <p>low_24h: ${value.low_24h}</p><br>
        <p>market_cap: ${value.market_cap}</p><br>
        <p>market_cap_change_24h: ${value.market_cap_change_24h}</p><br>
        <p>market_cap_change_percentage_24h: ${value.market_cap_change_percentage_24h}</p><br>
        <p>market_cap_rank: ${value.market_cap_rank}</p><br>
        <p>max_supply: ${value.max_supply}</p><br>
        <p>price_change_24h: ${value.price_change_24h}</p><br>
        <p>price_change_percentage_24h: ${value.price_change_percentage_24h}</p><br>
        <p>price_change_percentage_24h_in_currency: ${value.price_change_percentage_24h_in_currency}</p><br>
        <p>roi: ${value.roi}</p><br>
        <p>total_supply: ${value.total_supply}</p><br>
        <p>total_volume: ${value.total_volume}</p><br>
        <button id="close_DetailButton" class="closeDetails">Close</button>
    `;

    const detail_Div = cardElement.querySelector('.detail_Container');
    detail_Div.appendChild(details);

    const button = details.querySelector(".closeDetails");

    button.addEventListener("click" , () => {
        container.removeChild(details);
    })

}

// function proceedToPayment() {
//     container.innerHTML = "Processing for the Payment";
// }

