const router = require('express').Router()
const db = require('../models')
const axios = require('axios')

// Show all cocktail categories
router.get('/', async (req, res) => {
  try {
    const cocktailURL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    const response = await axios.get(cocktailURL)
    const cocktails = response.data.drinks
    console.log(cocktails[0])
    res.render('cocktails/index', { cocktails: cocktails })
  } catch (error) {
    console.log(error);
  }
})

// Show list of cocktails sorted by category
router.get('/list', async (req, res) => {
  try {
    const category = req.query.category
    // console.log(category);
    const cocktailURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
    const response = await axios.get(cocktailURL)
    const cocktails = response.data.drinks
    console.log(cocktails[0])
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

// Find all bottles in cocktail
router.get('/:id/bottles', async (req, res) => {
  try {
    const cocktail = await db.cocktail.findOne({
      where: {id: req.params.id},
      include: [db.bottle]
    })
    const cocktailURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail.name}`
    const response = await axios.get(cocktailURL)
    const cocktails = response.data.drinks
    console.log(cocktails);
    // res.render('users/recipes', { cocktail, cocktails })
  } catch (error) {
    console.log(error);
  }
})

module.exports = router