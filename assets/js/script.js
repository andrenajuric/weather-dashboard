const APIKey = "cf0e69cbcb190a2cd7bb4cb1feb02364";
var cityInput = document.querySelector("#city-input");
var searchButton = document.querySelector("#searchBtn");

function citySearch(event) {
    event.preventDefault();

    var city = cityInput.val().toLowerCast();
}

function getWeather(city) {

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + api;


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
    });

}