const { getGlobal } = require("../globals.js");

async function getWeatherData() {
    const latitude = getGlobal('latitude'),
        longitude = getGlobal('longitude'),
        apiKey = getGlobal('apiKey');
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url)
        const data = await response.json();
        const weather = data.current.weather[0].main;
        const temperature = data.current.temp.toFixed(1);
        const icon = data.current.weather[0].icon;
        const dailyForecast = data.daily.slice(0, 7); // Get the forecast for the next 7 days
        const forecastData = dailyForecast.map((day) => {
            return {
                date: new Date(day.dt * 1000).getDay(), // Convert Unix timestamp to weekdays
                tempMorn: day.temp.morn,
                tempDay: day.temp.day,
                tempEve: day.temp.eve,
                tempNight: day.temp.night,
                tempMax: day.temp.max.toFixed(0),
                tempMin: day.temp.min.toFixed(0),
                weather: day.weather[0].main,
                icon: day.weather[0].icon,
            };
        });
        return { weather, temperature, icon, forecastData};
    } catch (error) {
        console.log('Error fetching weather data:', error);
    }
}
module.exports = getWeatherData;