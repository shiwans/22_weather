const request = require('request')

const forecast = (latitude,longitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=7d049990705b2452a4495af0656a4a1e&query='+ latitude +' , '+longitude +'&units=m'

    request({url,json:true},(error,{body})=>{
        if (error) {
            callback('Unable to connect to weather service!',undefined)
        } else if (body.error) {
            callback('Unable to find location',undefined)
        }
        else {       
            callback(undefined,"It is currently " + body.current.temperature + " degress out. It feel like " + body.current.feelslike +" degrees out. In "+ body.location.name)
        }

    })
}

module.exports = forecast