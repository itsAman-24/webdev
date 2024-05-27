const body = document.querySelector("body");
const srtBtn = document.querySelector("#srtBtn");
let cartContainer = document.querySelector(".cartContainer");

window.addEventListener("load", async () => {

    const promise1_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h";
    const promise2_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=gecko_desc&per_page=10&page=2&sparkline=false&price_change_percentage=24h";
    const promise3_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=gecko_desc&per_page=10&page=3&sparkline=false&price_change_percentage=24h";

    const container = document.querySelector(".container");
    
    let combinedArray = [];

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
    
            combinedArray = [...data1, ...data2, ...data3];
        } catch (err) {
            body.innerText = "404...   Found an error";
            body.classList.add("errorHandlingClass");
            body.style.color = "white";
        }
    }

    
    await promise(); // Ensure the data is fetched before proceeding
    
    if (!combinedArray.length) {
        console.error("No data in combinedArray"); // Checks if combined array is empty
        return;
    }

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
            <div class="cartbtn">
                <button class="cart" cart-data='${JSON.stringify(value)}'>Add to Cart</button>
            </div>
            <div class="detail_Container"></div> 
        </div>
        `;
        container.appendChild(newDiv);
        
        // Adding event listener on the DETAILS icon 
        const icon = newDiv.querySelector(".fa-circle-info");

        icon.addEventListener("click", (event) => {
            const coinData = JSON.parse(event.target.getAttribute('data-coin'));
            const cardElement = event.target.closest('.bitcoinItem'); // Find the closest item (card) element
            showDetails(coinData, cardElement); 
        });
         
        // Adding event listener on the ADD TO CART button
        const cart = newDiv.querySelector(".cart");

        cart.addEventListener("click", (event) => {
            const cart_data = JSON.parse(event.target.getAttribute('cart-data'));   
            addToCart(cart_data);     // Function calling for adding item inside the cart
        });
    });
});

//function for showing the details for the item
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

    let details = document.createElement('div');
    details.classList.add('details_Style');

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
    details.style.maxHeight = '30rem';
    detailsContainer.appendChild(details);

    const closeDetailsButton = details.querySelector(".closeDetails");

    closeDetailsButton.addEventListener("click", () => {
        details.remove();
        cardElement.classList.remove('detail_Design');
        
    });
}


 //It will keep the track of number of carts inside the cartContainer
 let cartItems = 0;
 let a = 0;
 let orderTotal = 0;
//  let cartItemArray = []; // array to store the each cartItems inside it 

//function for adding items inside the card
async function addToCart(value) {

    cartItems++;
    let cartDiv = document.createElement('div');
    cartDiv.classList.add('cartStyle');
    cartDiv.innerHTML = `
        <div class="cartItem">
        <img src="${value.image}" alt="${value.name}">
        <div class="name">Name: ${value.name} </div>
        <div class="price">Price: ${value.current_price} </div>
        <button class="deleteCartItemBtn"> Remove </button>
        
        </div>
        `;
    
    cartContainer.appendChild(cartDiv);


    if(a === 0) {
    cartContainer.classList.add("displayNone");   //Displaying only when the cart icon is being clicked
    }

    const deleteBtn = cartDiv.querySelector(".deleteCartItemBtn");

    deleteBtn.addEventListener("click" , () => {
    cartDiv.remove();
    cartItems--;

    //If there is no cart inside cartContainer then disable the cartContainer itself
    // if(cartItems == 0) {
    //     cartContainer.classList.remove('cartContainerDesign');
    // }

});

    
    //adding the cartItem inside cartItemArray
    // cartItemArray.push(cartDiv);
}

// Event Listner on the cartIcon 

const cartBtn = document.querySelector(".fa-cart-shopping");
// const cartTotal = document.querySelector(".orderTotal");
// cartTotal.classList.add("displayNone");

cartBtn.addEventListener("click" , () => {
    a++;
    // if(cartItems === 0) {
    //     cartContainer.classList.add("displayNone"); 
    // }

    // else {
    // cartContainer.appendChild(cartItemArray);

    cartContainer.classList.remove("displayNone");
    cartContainer.classList.add('cartContainerDesign');

    // Clear previous buttons if any to avoid overloading of closeButton
    const existingCloseButton = cartContainer.querySelector(".closeCart");
    const existingOrderTotalButton = cartContainer.querySelector(".orderTotal");

    //if button doesn't exist then only create the new buttons
     if (!existingCloseButton || !existingOrderTotalButton) {
        const closeCartButton = document.createElement("div");
        closeCartButton.innerHTML = `
            <button class="closeCart">Close</button>
            <button class="orderTotal">Total</button>
        `;
        
        cartContainer.appendChild(closeCartButton);

    }
    

        document.querySelector(".closeCart").addEventListener("click" , () => {
            cartContainer.classList.add("displayNone");
        });
    
    
    
})

//Updating order total balance inside the cart

// cartTotal.innerHTML = `
// <div> Total: ${orderTotal} </div>
// `
