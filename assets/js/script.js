let today = moment().format("M/D/YYYY");
const APIKey = "cf0e69cbcb190a2cd7bb4cb1feb02364";
let cityInput = $("#city-input");
const searchButton = $("#searchBtn");
const currentWeatherEl = $("#current-weather");
const currentHeadlineEl = $("#display-headline");
const currentTempEl = $("#current-temp");
const currentHumidityEl = $("#current-humidity");
const currentWindspeedEl = $("#current-windspeed");
const currentUviEl = $("#current-uvi");
const weatherForecastEl = $("#forecast");

function citySearch(event) {

    event.preventDefault();

    // gets the value of cityInput
    let city = cityInput.val().toLowerCase();

    // calls getWeather function & passes city variable into it
    getWeather(city);

}

// calls citySearch function when searchButton is clicked
searchButton.on("click", citySearch);

// gets current weather info via openweathermap API
function getWeather(city) {

    let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        let cityName = response.name;
        let weatherIcon = response.weather[0].icon; // returns weather icon code
        let wiconURL = `http://openweathermap.org/img/w/${weatherIcon}.png`
        let kTemp = response.main.temp; // returns current temp in Kelvin
        let currentTemp = ((kTemp - 273.15) * 9 / 5 + 32).toFixed(1); // converts Kelvin to Fahrenheit
        let currentHumidity = response.main.humidity;
        let windSpeed = response.wind.speed;
        let latitude = response.coord.lat;
        let longitude = response.coord.lon;

        // WHEN I view current weather conditions for that city

        // THEN I am presented with city name, date, weather icon, temperature, humidity, wind speed, and UV index
        currentHeadlineEl.html(`${cityName} (${today})` + " <img id='wicon' src='" + wiconURL + "'>");
        currentTempEl.html(`Temperature: ${currentTemp} °F`);
        currentHumidityEl.html(`Humidity: ${currentHumidity}%`);
        currentWindspeedEl.html(`Wind Speed: ${windSpeed} MPH`);

        fiveDays(latitude, longitude);
    });
}

function fiveDays(latitude, longitude) {

    let queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&exclude=hourly&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        let uvi = response.current.uvi;
        console.log(uvi);;

        currentUviEl.html(`UV Index: ${uvi}`);
    })

}