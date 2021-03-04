/* Required Models and Variables */
require('dotenv').config()
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const rowdy = require('rowdy-logger')
const axios = require('axios')
const morgan = require('morgan')
const methodOverride = require('method-override')
const db = require('./models')
const cryptoJS = require('crypto-js')


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
app.use(require('cookie-parser')())

/* Add user to res.locals */
app.use(async (req, res, next) => {
  if(req.cookies.userId) {
    const decryptedId = cryptoJS.AES.decrypt(req.cookies.userId, process.env.COOKIE_SECRET).toString(cryptoJS.enc.Utf8)
    const user = await db.user.findOne({
      where: { id: decryptedId }
    })
    res.locals.user = user
  } else {
    res.locals.user = null
  }
  next()
})

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