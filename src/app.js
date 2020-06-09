const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
 
const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views loc
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Vladimir Stefanovich'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Vladimir Stefanovich'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Vladimir Stefanvoich',
        message: 'To do this, please do that.'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    } 

    geocode(req.query.address, (error, {lattitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(lattitude, longitude, (error, fdata) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecast: fdata,
                address: req.query.address
            })  
        })
    }) 
})

// app.get('/products', (req,res) => {
//     if(!req.query.search) {
//         return res.send({
//             error: 'you must provide a search time'
//         })
//     }
//     req.query
//     res.send({
//         products: []
//     })
// })

app.get('/help/*', (req,res) => {
    res.render('error', {
        title: '404',
        name: 'Vladimir Stefanovich',
        message: 'Help article not found.'
    })
})

app.get('/*', (req,res) => {
    res.render('error', {
        title: '404',
        name: 'Vladimir Stefanovich',
        message: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})