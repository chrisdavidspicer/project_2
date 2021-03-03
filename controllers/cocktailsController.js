const router = require('express').Router()
const db = require('../models')
const axios = require('axios')

// Show all cocktail categories
router.get('/', async (req, res) => {
  try {
    const cocktailURL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    const response = await axios.get(cocktailURL)
    const cocktails = response.data.drinks
    res.render('cocktails/index', { cocktails: cocktails })
  } catch (error) {
    console.log(error);
  }
})

// Show list of cocktails sorted by category
router.get('/', async (req, res) => {
  try {
    const category = req.body.category
    const cocktailURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
    const response = await axios.get(cocktailURL)
    const cocktails = response.data.drinks
    res.render('cocktails/index', { cocktails: cocktails })
  } catch (error) {
    console.log(error);
  }
})

// Show info for one specific cocktail

// Add a new cocktail to the database

// Delete a cocktail from the database

// Find all bottles in cocktail

// Find specific bottle in cocktail

module.exports = router