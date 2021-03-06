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
router.get('/list', async (req, res) => {
  try {
    const category = req.query.category
    const cocktailURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
    const response = await axios.get(cocktailURL)
    const cocktails = response.data.drinks
    res.render('cocktails/list', { cocktails: cocktails, category })
  } catch (error) {
    console.log(error);
  }
})

// Show info for one specific cocktail
router.get('/:id', async (req, res) => {
  try {
    const cocktail = await db.cocktail.findByPk(req.params.id)
    const cocktailURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail.name}`
    const response = await axios.get(cocktailURL)
    const cocktails = response.data.drinks[0]
    res.render('cocktails/show', { cocktail: cocktails })
  } catch (error) {
    console.log(error);
  }
})

// Search cocktail by name
router.get(':id/search', async (req, res) => {
  console.log(req.query);
  try {
    const cocktail = req.query.cocktail
    console.log(cocktail);
    // const cocktailURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`
    // const response = await axios.get(cocktailURL)
    // const cocktails = response.data.drinks
    // res.render('cocktails/search', {cocktails, cocktail})
  } catch (error) {
    console.log(error);
  }
})

module.exports = router