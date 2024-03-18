const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const cors = require('cors')




console.log(__dirname)
console.log(path.join(__dirname, '../public'))


const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath=path.join(__dirname, '../templates/partials')

//set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Muhammad Affan Khan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Muhammad Affan Khan'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name:'Muhammad Affan Khan',
        message: 'You may use our chatbot or email us directly to get your doubts resolved.'
    })
})
app.get('/weather', (req,res) => {
   const {address}=req.query
    if(!req.query.address)
    {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(address, (error, {latitude, longitude, location}={})=>
    {
        if(error)
        {
            return res.send({ error })
        }
        forecast(latitude,longitude,(error,forecastData) => {
            if(error){
                return res.send({ error })
            }
            return res.send({
                latitude,
                longitude,
                location,
                forecast: forecastData
            })
        })
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search) {
       return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products : []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        message: "Help article not found.",
        name: "Muhammad Affan Khan",
        title: "404"
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        message: 'Page not found.',
        name: "Muhammad Affan Khan",
        title: "404"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})


