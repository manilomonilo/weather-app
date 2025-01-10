const apiKey = "7060d5407170da465b020de8776e074b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const locationInput = document.querySelector(".input-field");
const searchButton = document.querySelector(".search-button");
const cityName = document.querySelector(".city-name");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");

fetchWeather("london");

// a variable conatain what's in the text input right there
locationInput.addEventListener('keydown', (event) => {
    const location = locationInput.value;
    if (document.activeElement === locationInput && event.key === 'Enter' && location) {
        fetchWeather(location);
    }
});

// listen to the button
searchButton.addEventListener("click", () => {
    const location = locationInput.value;
    // check if the location input is not empty and call fetchWeather method to fetch the weather for the current location
    if (location) {
        fetchWeather(location);
    }
});

// a function to get the geographical coordinates for the input city
async function getGC(location) {
    const getGC = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${apiKey}`;

    const response = await fetch(getGC);
    const data = await response.json();
    const latLon = {
        lat: data[0].lat,
        lon: data[0].lon
    };

    return latLon

}


async function fetchWeather(location) {
    let latLon = await getGC(location);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latLon.lat}&lon=${latLon.lon}&appid=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    
    cityName.textContent = location.toUpperCase();
    weatherIcon.src = `assets/${data.weather[0].icon.slice(0, -1)}.png`;
    description.textContent = data.weather[0].description.toUpperCase();
    let temp = Math.round(Number(data.main.temp) - 273.15);
    temperature.textContent = `${temp}°C`;

}


