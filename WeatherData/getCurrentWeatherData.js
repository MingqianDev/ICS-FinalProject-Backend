const { getGlobal } = require("../globals.js");

function getWeatherData(socket) {
    const latitude = getGlobal('latitude'),
          longitude = getGlobal('longitude'),
          apiKey = getGlobal('apiKey');
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&xclude=daily,minutely,hourly`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weather = data.current.weather[0].main;
            const temperature = data.current.temp.toFixed(1); 
            const icon = data.current.weather[0].icon;
            socket.emit('currentWeatherData', {weather, temperature, icon});
            // document.querySelector('#description').textContent = description;
            // document.querySelector('#temperature').textContent = temperature + '°C';
        })
        .catch(error => {
            console.log('Error fetching weather data:', error);
        });
}
module.exports = getWeatherData;