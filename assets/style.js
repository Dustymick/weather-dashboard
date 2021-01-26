var getCityWeather = function() {
    //format the api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=32e4833dee72fbee848a843f91373083";
    
    //make a request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
        console.log(data)    
    });
  });
};

getCityWeather();