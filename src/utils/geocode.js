const request = require("request")

const geocode = (address, callback) => {
    const url = 'https://api.opencagedata.com/geocode/v1/json?q='+ encodeURIComponent(address) +'&key=3f6a195f54e747ed8a3bf09fc2226844&limit=1'

    request({url , json:true}, (error,{ body })=> {
        if(error){
            callback('Unable to connect to location services!', undefined)
        }else if(body.results.length === 0){
            callback('Unable to find location. Try another search.',undefined)
        }else{
            callback(undefined, {
                latitude : body.results[0].geometry.lat,
                longitude : body.results[0].geometry.lng,
                place : body.results[0].components.city,
                
            })
        }
    })
}

module.exports = geocode