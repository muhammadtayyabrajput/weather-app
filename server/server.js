const express = require('express')
const axios = require('axios')
const https = require('https')
const app = express();

const apiKey = '870da44ca8ac887ceefdb690763910e5'


app.get('/api', async (req, res) => {
    const city = req.query.city;
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await axios.get(url);
        const weatherData = response.data;
        const weatherInfo = {
            temperature: weatherData.main.temp,
            minTemperature: weatherData.main.temp_min,
            maxTemperature: weatherData.main.temp_max,
            windSpeed: weatherData.wind.speed,
            weatherDescription: weatherData.weather[0].description,
            humidity: weatherData.main.humidity,
            pressure: weatherData.main.pressure,
            cityName: weatherData.name,
        };
        res.send(weatherInfo);
    } catch (error) {
        console.log("Error during fetching data ", error.message)
        res.status(500).send({ error: 'Error fetching weather data' })
    }
})

app.listen(5000, () => console.log("this is server"))