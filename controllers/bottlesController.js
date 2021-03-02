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

// Add new bottle to collection
router.post('/', async (req, res) => {
  try {
    const newBottle = await db.bottle.create({
      type: req.body.type,
      img_url: req.body.img_url,
    })
    res.redirect('/bottles/index', { user: newBottle })
  } catch (error) {
    console.log(error);
  }
})

// Delete bottle from collection
router.delete('/:id', async (req, res) => {
  try {
    const deletedBottle = await db.bottle.destroy({
      where: { id: req.params.id }
    })
    res.redirect('/bottles/index')
  } catch (error) {
    console.log(error);
  }
})

module.exports = router