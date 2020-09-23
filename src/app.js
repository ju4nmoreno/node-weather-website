const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const PORT = process.env.PORT || 3000

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setp handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', ({ res }) => {
    res.render('index', {
        name: 'Juan Moreno',
        title: 'Weather',
    })
})

app.get('/about', ({ res }) => {
    res.render('about', {
        image: './assets/images/juan.jpg',
        name: 'Juan Moreno',
        title: 'About',
    })
})

app.get('/help', ({ res }) => {
    res.render('help', {
        name: 'Juan Moreno',
        title: 'help',
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address || null

    if (!address) {
        return res.send({
            error: 'well to be honest',
        })
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address,
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term',
        })
    }

    console.log(req.query)
    res.send({
        product: [],
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: "We can't found Articles",
        name: 'Juan Moreno',
        path: req.path,
        title: '404.',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: "We can't found this Page",
        name: 'Juan Moreno',
        path: req.path,
        title: '404.',
    })
})

app.listen(PORT, () => {
    console.log('goto localhost:' + PORT + ' ha!')
})
