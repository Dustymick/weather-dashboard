var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city-name");
var cityNameEl = document.querySelector("#city");
var cityTempertureEl = document.querySelector("#temperature");
var cityHumidityEl = document.querySelector("#humidity");
var cityWindSpeedEl = document.querySelector("#wind-speed");
var cityTimeEl = document.querySelector("#time");
var fiveDayWeatherEl = document.querySelector("#five-day-weather");


var formSubmitHandler = function(event) {
    event.preventDefault();
    var cityname = cityInputEl.value.trim();
     if (cityname) {
         getCityWeather(cityname);
         saveCities(cityname);
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
        displayFiveDay(data)
        // console.log(data)
    });
};

var saveCities = function(newcity) {
    var cityArray = JSON.parse(localStorage.getItem("city-array")) || []
    cityArray.push(newcity)
    localStorage.setItem("city-array",JSON.stringify(cityArray))
}

var displayCityButtons = function() {
    var cityArray = JSON.parse(localStorage.getItem("city-array")) || []
    var searchHistory = document.getElementById("history")
    cityArray.forEach(element => {
    var button = document.createElement("button")
    button.classList.add("history-button")
    var li = document.createElement("li")
    button.textContent = element
    li.appendChild(button)
    searchHistory.appendChild(li)
    });
}

displayCityButtons();

var convertKelvin = function(kelvin) {
    return parseInt((kelvin - 273.15) * 1.8 + 32);
  };

var historyButton = document.querySelectorAll (".history-button")
    historyButton.forEach(button => {
        button.addEventListener("click", function() {
            var CityName = this.textContent
            getCityWeather(CityName)
        })
    })

var displayCityName = function(data) {
    var city = data.city.name
    var temperature = data.list[0].main.temp
    var humidity = data.list[0].main.humidity
    var windSpeed = data.list[0].wind.speed
    var time = moment().format('MMMM Do YYYY, h:mm:ss a');
    document.querySelector(".icon").innerHTML = "<img src='http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png' alt='Icon depicting current weather.'></img>"
    console.log(temperature)
    cityNameEl.textContent = "City: " + city
    cityTempertureEl.textContent = "Temperature: " + convertKelvin(temperature) + " F"
    cityHumidityEl.textContent = "Humidity: " + humidity + "%"
    cityWindSpeedEl.textContent = "Wind Speed: " + windSpeed + " MPH"
    cityTimeEl.textContent = "Time: " + time

}

var displayFiveDay = function(data) {
    console.log(data)
    fiveDayWeatherEl.innerHTML = ""
    for(var i = 0; i < data.list.length; i++) {
        if(data.list[i].dt_txt.endsWith("12:00:00")) {
            
            var temperature = data.list[i].main.temp
            var humidity = data.list[i].main.humidity
            var windSpeed = data.list[i].wind.speed
            console.log(temperature)
            console.log(humidity)
            console.log(windSpeed)
            
            var col = document.createElement("div")
            col.classList.add("col-md-2")
            col.classList.add("five-day-card")
            col.innerHTML = "Temperature: " + convertKelvin(temperature) + "<br>" + "Humidity: " + humidity + "%" + "<br>" + "Wind Speed: " + windSpeed 
            fiveDayWeatherEl.appendChild(col)
        }
        
    }
}

userFormEl.addEventListener("submit", formSubmitHandler);