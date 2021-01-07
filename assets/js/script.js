// global variables
let today = moment().format("M/D/YYYY");
const APIKey = "cf0e69cbcb190a2cd7bb4cb1feb02364";
let cityInput = $("#city-input");
const searchButton = $("#searchBtn");
const currentUviEl = $("#current-uvi");

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

        // gets all the info needed from response & stores in variables
        let cityName = response.name;
        let weatherIcon = response.weather[0].icon; // returns weather icon code
        let wiconURL = `http://openweathermap.org/img/w/${weatherIcon}.png`
        let kTemp = response.main.temp; // returns current temp in Kelvin
        let currentTemp = ((kTemp - 273.15) * 9 / 5 + 32).toFixed(1); // converts Kelvin to Fahrenheit
        let currentHumidity = response.main.humidity;
        let windSpeed = response.wind.speed;
        let latitude = response.coord.lat;
        let longitude = response.coord.lon;

        const currentHeadlineEl = $("#display-headline");
        const currentTempEl = $("#current-temp");
        const currentHumidityEl = $("#current-humidity");
        const currentWindspeedEl = $("#current-windspeed");

        // WHEN I view current weather conditions for that city

        // THEN I am presented with city name, date, weather icon, temperature, humidity, wind speed, and UV index
        currentHeadlineEl.html(`${cityName} (${today})` + " <img id='wicon' src='" + wiconURL + "'>");
        currentTempEl.html(`Temperature: ${currentTemp} °F`);
        currentHumidityEl.html(`Humidity: ${currentHumidity}%`);
        currentWindspeedEl.html(`Wind Speed: ${windSpeed} MPH`);

        // calls fiveDays function and passes lat & long results from this function 
        fiveDays(latitude, longitude);
    });
}

function fiveDays(latitude, longitude) {

    // takes lat & long results from getWeather function & inserts it into onecall queryURL 
    let queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&exclude=hourly&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        // gets the current uv index
        let uvi = response.current.uvi;

        // appends to current-uvi element under 'current-weather' in html
        currentUviEl.html(`UV Index: ${uvi}`);

        if (uvi < 3) {
            currentUviEl.addClass("favorable")
        } else if (uvi < 7) {
            currentUviEl.addClass("moderate")
        } else {
            currentUviEl.addClass("severe")
        }

        // for loop for 5-day weather info
        for (let i = 1; i < 6; i++) {

            // variables for each weather-forecast card
            let fiveDayIcons = response.daily[i].weather[0].icon;
            let fiveDayTemps = response.daily[i].temp.day;
            let fiveDayHumidity = response.daily[i].humidity;

            // creates the main html layout of each five-day forecast card
            const weatherForecastEl = $("<div id='weather-forecast' class='card p-2 bg-primary text-light col-sm row m-1'>");
            const forecastDateEl = $("<p id='forecast-date'>");
            const forecastIconEl = $("<img id='forecast-icon' src='' class='col-9' style='width:70px;'></img>");
            const forecastTempEl = $("<p id='forecast-temp'>");
            const forecastHumidityEl = $("<p id='forecast-humidity'>");
            const forecastContainerEl = $("#forecast-container");


            // appends 5-day elements to html
            forecastContainerEl.append(weatherForecastEl);
            weatherForecastEl.append(forecastDateEl, forecastIconEl, forecastTempEl, forecastHumidityEl);

            // adds time to current moment
            let numDays = moment().add(i, 'd');
            let fiveDates = numDays.format("M/D/YYYY");

            forecastDateEl.html(`${fiveDates}`);
            forecastTempEl.html(`Temp: ${fiveDayTemps}°F`);
            forecastHumidityEl.html(`Humidity: ${fiveDayHumidity}%`);
            forecastIconEl.attr('src', `http://openweathermap.org/img/w/${fiveDayIcons}.png`);
        }
    });
}