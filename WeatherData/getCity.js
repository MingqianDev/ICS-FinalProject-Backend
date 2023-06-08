const { getGlobal } = require("../globals.js");

async function getCity(latitude, longitude) {
    const apiKey = getGlobal('apiKey');
    const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const city = data[0].name;
        console.log(city);
        return city;
    } catch (error) {
        console.log('Error fetching city data:', error);
    }
}

module.exports = getCity;