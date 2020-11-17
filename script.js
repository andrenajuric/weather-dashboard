var api = "cf0e69cbcb190a2cd7bb4cb1feb02364";
var cityInput = document.querySelector("#city-input");
var searchButton = document.querySelector("#searchBtn");
var city = cityInput.value;
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + api;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response)
});

searchButton.addEventListener("click", function (event) {
    event.preventDefault();

    console.log(city);
})