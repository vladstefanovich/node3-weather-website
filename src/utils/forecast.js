const request = require('postman-request')

const forecast = (lattitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6986cbe5ae7809e56f76395981922a81&query='+lattitude+','+longitude+'&units=m'

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to forecast services')
        } else if (body.error) {
            callback('Unable to retrieve forecast, try another search')
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature  + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast