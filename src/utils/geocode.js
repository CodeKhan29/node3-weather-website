const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.openweathermap.org/geo/1.0/direct?q=' +encodeURIComponent(address)+'&limit=1&appid=58710fefb01821b569bb398265ac2a71'

    request({ url, json: true}, (error, {body}) => {
        if (error)
        {
            callback('Unable to connect to location services!', undefined)
        }
        else if (!body[0]) {
            callback('Unable to find location. Try another search', undefined)
        }
        else {
            callback(undefined, {
                latitude: body[0].lat,
                longitude: body[0].lon,
                location: body[0].name+", "+body[0].state+", "+body[0].country
            })
        }
    })
}



module.exports = geocode