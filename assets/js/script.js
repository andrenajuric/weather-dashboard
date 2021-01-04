let today = moment().format("M/D/YYYY");
const APIKey = "cf0e69cbcb190a2cd7bb4cb1feb02364";
let cityInput = $("#city-input");
const searchButton = $("#searchBtn");

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
        let kTemp = response.main.temp; // returns current temp in Kelvin
        let currentTemp = ((kTemp - 273.15) * 9 / 5 + 32).toFixed(1); // converts Kelvin to Fahrenheit
        let currentHumidity = response.main.humidity;
        let windSpeed = response.wind.speed;
        let latitude = response.coord.lat;
        let longitude = response.coord.lon;

        // WHEN I view current weather conditions for that city
        const weatherForecast = $("#current-weather");
        // THEN I am presented with city name, date, weather icon, temperature, humidity, wind speed, and UV index
        weatherForecast.html(
            "<h2>" + cityName + " (" + today + ") <img id='wicon' src='http://openweathermap.org/img/w/" + weatherIcon +
            ".png'>" + "</h2>" +
            "<p> Temperature: " + currentTemp + " °F</p>" +
            "<p> Humidity: " + currentHumidity + "%</p>" +
            "<p> Wind Speed: " + windSpeed + " MPH</p>"
        );
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey,
            method: "GET"
        }).then(function (response) {
            let uvIndex = response.value;

            const uvDisplay = $("#uv-index");
            uvDisplay.append("UV Index: " + uvIndex);
        })
    });

}