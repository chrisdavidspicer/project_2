const router = require('express').Router()
const db = require('../models')
const axios = require('axios')

// Show bottles index page
router.get('/', async (req, res) => {
  try {
    // const bottle = await db.bottle.findAll()
    // console.log(bottle);
    const bottle = [
      { type: 'Whiskey' },
      { type: 'Brandy' },
      { type: 'Rum' },
      { type: 'Vodka' },
      { type: 'Tequila' },
      { type: 'Gin' }
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
    // console.log(response.data);
    const cocktails = response.data.drinks
    res.render('bottles/show', { cocktails, bottle })
  } catch (error) {
    console.log(error);
  }
})


// Show all cocktail recipes that use bottles that user saved
// router.get('/:id/cocktails', async (req, res) => {
//   try {
//     const user = await db.user.findOne({
//       where: {
//       id: req.params.id
//       },
//       include: [db.bottle]
//     })
//     res.render('users/recipes', { user: user })
//   } catch (error) {
//     console.log(error);
//   }
// })

module.exports = router