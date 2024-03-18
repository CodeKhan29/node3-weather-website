const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon='+ lon +'&appid=36996380926aacebe15231acab2e3c6a&units=metric'
    request({url, json:true}, (error, {body})=>{
        if(error)
        {
            callback('Unable to connect to weather services', undefined)
        }
        else if(body.message)
        {
            callback('Unable to find forecast for the given location. Try again', undefined)
        } else {
            callback(undefined, body.weather[0].main+". The temperature is "+body.main.temp+" degree celcius.")
        }
    })
}

module.exports = forecast