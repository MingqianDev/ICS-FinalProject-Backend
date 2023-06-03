const { getGlobal } = require("../globals.js");

function getCity(socket) {
    const latitude = getGlobal('latitude'),
        longitude = getGlobal('longitude'),
        apiKey = getGlobal('apiKey');
    const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const city = data[0].name;
            socket.emit('cityData', city);
            // document.querySelector('#location').textContent = city;
        })
        .catch(error => {
            console.log('Error fetching city data:', error);
        });
}
module.exports = getCity;