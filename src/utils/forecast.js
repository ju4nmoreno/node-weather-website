const request = require('request')

const token = '56ffad8667e101cf40de6d191b7aa2ae'

const forecast = (latitude, longitude, callback) => {
    const url =
        'http://api.weatherstack.com/current?access_key=' +
        token +
        '&query=' +
        latitude +
        ',' +
        longitude

    request({ url, json: true }, (error, { body }) => {
        const {
            current: { feelslike, temperature, weather_descriptions },
        } = body
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(
                undefined,
                weather_descriptions +
                    ' It is currently ' +
                    temperature +
                    ' degress out. There is a ' +
                    feelslike +
                    '% chance of rain.'
            )
        }
    })
}

module.exports = forecast

