/* Required Models and Variables */
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const rowdy = require('rowdy-logger')
const axios = require('axios')
const morgan = require('morgan')
const methodOverride = require('method-override')
const db = require('./models')

const app = express()
const rowdyRes = rowdy.begin(app)
const PORT = process.env.PORT || 3000

/* Middleware and Config */
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(morgan('tiny'))
app.use(ejsLayouts)
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }))

/* Controllers */
app.use('/users', require('./controllers/usersController.js'))
app.use('/bottles', require('./controllers/bottlesController.js'))
app.use('/cocktails', require('./controllers/cocktailsController.js'))
app.use('/ratings', require('./controllers/ratingsController.js'))
app.use('/comments', require('./controllers/commentsController.js'))

/* Routes */
app.get('/', (req, res) => {
  res.render('index')
})

app.listen(PORT, () => {
  rowdyRes.print()
})