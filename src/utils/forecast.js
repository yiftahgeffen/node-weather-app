const request  = require ('request')

const forecast = (longitude, latitude, callback) => {

  const url = 'http://api.weatherstack.com/current?access_key=580f3280fad14f5bdeafec195164c124&query='+latitude+','+longitude+'&units=f'

  request({url, json: true }, (error,{body}) => {
    if (error) {
      callback ('unable to connect to weatherstack')
    }
    else {
      if (!body.current) {
        callback ('unable to connect to find location')
      }
      else {
        callback (undefined,body.current.weather_descriptions[0] + ' it is currently ' + body.current.temperature + ' it feel like ' + body.current.feelslike)
      }
    }
  })
}

module.exports = forecast