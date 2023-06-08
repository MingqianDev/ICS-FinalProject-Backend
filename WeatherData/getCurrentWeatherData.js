const { getGlobal } = require("../globals.js");

async function getWeatherData() {
    const latitude = getGlobal('latitude'),
        longitude = getGlobal('longitude'),
        apiKey = getGlobal('apiKey');
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&xclude=daily,minutely,hourly`;

    try {
        const response = await fetch(url)
        const data = await response.json();
        const weather = data.current.weather[0].main;
        const temperature = data.current.temp.toFixed(1);
        const icon = data.current.weather[0].icon;
        return { weather, temperature, icon };
    } catch (error) {
        console.log('Error fetching weather data:', error);
    }
}
module.exports = getWeatherData;