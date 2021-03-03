const router = require('express').Router()
const db = require('../models')

// Show bottles index page
router.get('/', (req, res) => {
  res.render('bottles/index')
})

// Show info on individual bottle
router.get('/:id', async (req, res) => {
  try {
    const bottle = await db.bottle.findByPk(req.params.type)
    const bottleURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${bottle}`
    const response = await axios.get(bottleURL)
    const bottles = response.drinks
    res.render('bottles/show', { bottles })
  } catch (error) {
    console.log(error);
  }
})

module.exports = router