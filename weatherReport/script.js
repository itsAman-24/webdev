const api_Key = "0a3b94c29b6fc84cb7e08ebec3eafa67";
const api_Url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchInput = document.querySelector(".search input");

const searchIcon = document.querySelector(".search i");

async function weather(city) {
    try{
    const response = await fetch(api_Url + city + `&appid=${api_Key}`);
    var data = await response.json();
    } catch(err) {
        document.querySelector("body").innerHTML = "404... Error";
    }

    console.log(data);

    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";

    document.querySelector(".city").innerHTML = data.name;

    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";

    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    const weatherIMG = document.querySelector(".weatherIcon");

    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    switch(data.weather[0].main) {
        case "Clouds" :
            weatherIMG.setAttribute("src","images/clouds.png")
            break;
        case "Haze" :
            weatherIMG.setAttribute("src","images/wind.png")
            break;
        case "Rain" :
            weatherIMG.setAttribute("src","images/rain.png")
            break;
        case "Snow" :
            weatherIMG.setAttribute("src","images/snow.png")
            break;
        case "Clear" :
            weatherIMG.setAttribute("src","images/clear.png")
            break;
        case "Mist" :
            weatherIMG.setAttribute("src","images/mist.png")
            break;
        case "Drizzle" :
            weatherIMG.setAttribute("src","images/drizzle.png")
            break;
        default :
            weatherIMG.setAttribute("src","images/clear.png")

    }
}



searchIcon.addEventListener("click" , () => {
    weather(searchInput.value);
})
