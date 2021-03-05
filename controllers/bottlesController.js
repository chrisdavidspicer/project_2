const router = require('express').Router()
const db = require('../models')
const axios = require('axios')

// Show bottles index page
router.get('/', async (req, res) => {
  try {
    const bottle = [
      { type: 'Absinthe' },
      { type: 'Bourbon' },
      { type: 'Brandy' },
      { type: 'Gin' },
      { type: 'Rum' },
      { type: 'Scotch' },
      { type: 'Tequila' },
      { type: 'Dry Vermouth' },
      { type: 'Vodka' },
    ]
    res.render('bottles/index', { bottle: bottle })
  } catch (error) {
    console.log(error);
  }
})

// Show info on individual bottle
router.get('/:id', async (req, res) => {
  try {
    const bottle = await db.bottle.findByPk(req.params.id)
    const bottleURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${bottle.type}`
    const response = await axios.get(bottleURL)
    const cocktails = response.data.drinks
    res.render('bottles/show', { cocktails, bottle })
  } catch (error) {
    console.log(error);
  }
})

module.exports = router