const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*', // You can restrict this to specific domains if needed.
        methods: ['GET', 'POST']
    }
});
const PORT = process.env.PORT || 3000;

const globals = require('./globals.js');
const getWeatherData = require('./WeatherData/getWeatherData.js');
const getCity = require('./WeatherData/getCity.js');

io.on('connection', (socket) => {
    socket.on('locationData', (data)=>{
        globals.setGlobal('longitude', data.longitude);
        globals.setGlobal('latitude', data.latitude);
        console.log(data.longitude, data.latitude);
        getWeatherData(socket);
        getCity(socket);
    })
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});