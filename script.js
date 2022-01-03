const API_KEY = `YOUR_API_KEY`;

//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
//http://openweathermap.org/img/wn/10d@2x.png
//C to F (0°C × 9/5) + 32
//K to C (0°C × 273.15) 
//K to F (0K − 273.15) × 9/5 + 32  

const timezoneName = document.querySelector(".time-zone h1");
const zoneTemp = document.querySelector(".temp");
const zoneDescription = document.querySelector(".description");
let tempImg = document.getElementById("icon");
const tempSection = document.querySelector(".temp-section");
const tempDegree = document.querySelector(".temp-section span");
const cityInput = document.querySelector(".city-input");
const submitButton = document.querySelector(".myButton");

let isCelsius = true;

window.addEventListener('load', () => {
    console.log("location");
    navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        console.log(lat + " " + long);

        const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`;

        fetch(weatherAPI).then(
            response => response.json()
        ).then(
            data => getWeatherData(data)
        ).catch(error => alert(`${error}`))
    })


})

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    const input = cityInput.value;
    console.log(input);
    const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${API_KEY}`
    fetch(weatherAPI).then(response => response.json()).then(data => {
        if (data.cod === "404") alert("Please type a valid city name 😤");
        console.log(data);
        getWeatherData(data);
    }).catch(error => console.log(`${error}`));
    cityInput.value = "";
})

function getWeatherData(data) {
    const { name, main, weather } = data;
    timezoneName.textContent = name;
    const temp = main.temp;
    const inCelsius = Math.floor(temp - 273.15);
    const inFahrenheit = Math.floor((temp - 273.15) * 9 / 5 + 32);
    zoneTemp.textContent = inCelsius;
    zoneDescription.textContent = weather[0].description;
    const icon = weather[0].icon;
    getIcon(icon);

    tempSection.addEventListener('click', () => {
        isCelsius = !isCelsius;
        tempDegree.textContent = isCelsius ? "°C" : "°F";
        zoneTemp.textContent = isCelsius ? inCelsius : inFahrenheit;

    })
}

function getIcon(icon) {
    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    tempImg.src = iconUrl;
}


