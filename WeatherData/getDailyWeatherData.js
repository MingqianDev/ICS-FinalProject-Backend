const { getGlobal } = require("../globals.js");

async function getDailyWeather() {
    const latitude = getGlobal("latitude");
    const longitude = getGlobal("longitude");
    const apiKey = getGlobal("apiKey");
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&exclude=current,minutely,hourly`;

    try {
        const response = await fetch(url);
        const data = await response.json();
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
        
        return forecastData;

    } catch (error) {
        console.log("Error fetching weather forecast data:", error);
    };
    /*fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const dailyForecast = data.daily.slice(0, 7); // Get the forecast for the next 7 days

            const forecastData = dailyForecast.map((day) => {
                return {
                    date: new Date(day.dt * 1000).getDay(), // Convert Unix timestamp to Date object
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
        })
        .catch((error) => {
            console.log("Error fetching weather forecast data:", error);
        });*/
}

module.exports = getDailyWeather;
