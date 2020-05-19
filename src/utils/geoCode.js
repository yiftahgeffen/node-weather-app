const request  = require ('request')

const geocode = (address, callback) => {
  const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoieWlmdGFoZ2VmZmVuIiwiYSI6ImNrOXpzcTQ0MjB5ZXQzZmxpeTEwODU1d3gifQ.ZrmoQa9zoM4X1hyRfc3CXQ&limit=1'

  request({url, json: true }, (error,{body} = {}) => {
    if (error) {
      callback('unable to connect to weather forcast')
    }
    else {
      if (body.features.length===0) {
        callback('unable to find location')
      }
      else {
        const data = {
          location : body.features[0].place_name,
          longitude : body.features[0].center[0],
          latitude : body.features[0].center[1]
        }
        callback (error, data)
      }
    }
  })

}

module.exports = geocode