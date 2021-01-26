var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city-name");
var cityTempertureEl = document.querySelector("#temperature");
var cityHumidtyEl = document.querySelector("#humidity");
var cityWindSpeedEl = document.querySelector("#wind-speed");


var formSubmitHandler = function(event) {
    event.preventDefault();
    var cityname = cityInputEl.value.trim();
     if (cityname) {
         getCityWeather(cityname);
         
     } else {
         alert("Please enter a city name");
     }
};

var getCityWeather = function(cityname) {
    //format the api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&appid=32e4833dee72fbee848a843f91373083";
    
    //make a request to the url
    fetch(apiUrl).then(function(response) {
        return response.json()
    }).then(function(data) {  
        displayCityName(data);  
        console.log(data);    
    });
};

var displayCityName = function(data) {

}

userFormEl.addEventListener("submit", formSubmitHandler);