const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geoCode.js')
const forecast = require('./utils/forecast.js')


const app = express()
const port = process.env.POR || 3000
// const path_1 = __dirname.substring(0,__dirname.lastIndexOf('/')) +'/public'


//define express path
const publicDirPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and view location
app.set('views', viewPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('/about', (req,res) => {
  res.render('about', {
    title:'about',
    creator: 'yiftah'
  })
})

app.get('/help', (req,res) => {
  res.render('help', {
    title:'help',
    helpText: 'this is some helpful text',
    creator: 'yiftah'
  })
})

app.get('', (req,res) => {
  res.render('index', {
    title: 'Weather',
    creator: 'yiftah'
  })
})

app.get ('/weather', (req,res) => {
  if (!req.query.address) {
    res.send ( {
      error: 'no address was provided'
    })
    return
  }
  geocode (req.query.address, (error,{location, latitude, longitude} = {}) =>{
    if (error) {
      res.send ( {
        error: error
      })
      return
    }
    forecast(longitude, latitude, (error, foreCast) => {
      if (error) {
        res.send ( {
          error: error
        })
        return
      }
      res.send ({
        foreCast: foreCast,
        location,
        address: req.query.address
      })
    })
  })

})
app.get('/notGonaRender.html', (req,res) => {
  res.send('<h1>Not gonna render</h1>')
})
app.get('/isGonaRender.html', (req,res) => {
  res.send('<h1>is gonna render</h1>')
})

app.get('/help/*', (req,res) => {
  res.render('404', {
    title: '404',
    message: 'help page not found',
    creator: 'yiftah'
  })
})

app.get('*', (req,res) => {
  res.render('404', {
    title: '404',
    message: 'Page not found',
    creator: 'yiftah'
  })
})

app.listen(port, () => {
  console.log('server started on port '+port)
})
