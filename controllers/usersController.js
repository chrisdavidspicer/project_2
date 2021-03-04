const router = require('express').Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const AES = require('crypto-js/aes')

// Show users landing (index) page
router.get('/', (req, res) => {
  res.render('users/index')
})

// Show new user creation page
router.get('/new', (req, res) => {
  res.render('users/new')
})

// Show user login page
router.get('/login', (req, res) => {
  res.render('users/login')
})

// Show users cabinet page
router.get('/cabinet', (req, res) => {
  res.render('users/cabinet')
})

// Show users favorite recipes page
router.get('/favorites', (req, res) => {
  res.render('users/favorites')
})

// Show users possible recipes page
router.get('/recipes', (req, res) => {
  res.render('users/recipes')
})

// Show users profile page
router.get('/profile', (req, res) => {
  res.render('users/profile')
})

// Logout user, erase cookies
router.get('/logout', (req, res) => {
  res.clearCookie('userId')
  res.redirect('/')
})

// Show info for specific user
router.get('/:id', async (req, res) => {
  try {
    const user = await db.user.findByPk(req.params.id)
    res.render('users/profile', { user })
  } catch (error) {
    console.log(error);
  }
})

// Create new User
router.post('/', async (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 12)
  try {
    if(!req.body.email || !req.body.password) {
      res.render('users/new', { errors: 'Invalid username/password'})
      return;
    }
    const user = await db.user.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashedPassword,
      profile_img: req.body.profile_img
    })
    const encryptedId = AES.encrypt(user.id.toString(), process.env.COOKIE_SECRET).toString()
    res.cookie('userId', encryptedId)
    res.redirect('/users/index')
  } catch (error) {
    console.log(error);
    res.render('users/new', { errors: 'Error creating user; try again with new info?'})
  }
})

// Login user
router.post('/login', async (req, res) => {
  try {
    const user = await db.user.findOne({
      where: { email: req.body.email}
    })
    if(user && bcrypt.compareSync(req.body.password, user.password)) {
      const encryptedId = AES.encrypt(user.id.toString(), process.env.COOKIE_SECRET).toString()
      res.cookie('userId', encryptedId)
      res.redirect('bottles/index')
    } else {
      res.render('users/login', { errors: 'Invalid username/password'})
    }
  } catch (error) {
    console.log(error);
    res.render('users/login', { errors: 'Invalid username/password'})
  }
})

// Update existing user
router.put('/:id', async (req, res) => {
  try {
      await db.user.update({
      where: {
        id: req.params.id
      }
    })
    const user = db.user.findByPk(req.params.id)
    res.redirect('/users/profile', { user })
  } catch (error) {
    console.log(error);
  }
  
})

// Delete existing user
router.delete('/:id', async (req, res) => {
  try {
    await db.user.destroy({
      where: { id: req.params.id }
    })
    res.redirect('/users/index')
  } catch (error) {
    console.log(error);
  }
})

// Show all bottles that user saved - for cabinet
router.get('/:id/bottles', async (req, res) => {
  try {
    const user = await db.user.findOne({
      where: {
      id: req.params.id
      },
      include: [db.bottle]
    })
    res.render('users/cabinet', { user: user })
  } catch (error) {
    console.log(error);
  }
})

// Show all bottles that user saved - for recipes
router.get('/:id/bottles', async (req, res) => {
  try {
    const user = await db.user.findOne({
      where: {
      id: req.params.id
      },
      include: [db.bottle]
    })
    res.render('users/recipes', { user: user })
  } catch (error) {
    console.log(error);
  }
})

// Show all cocktails that user saved
router.get('/:id/cocktails', async (req, res) => {
  try {
    const user = await db.user.findOne({
      where: {
      id: req.params.id
      },
      include: [db.cocktail]
    })
    res.render('users/favorites', { user: user })
  } catch (error) {
    console.log(error);
  }
})

// Add a new cocktail to the database - favorites
router.post('/:id/cocktails', async (req, res) => {
  try {
    const [newCocktail, created] = await db.cocktail.findOrCreate({
      where: { name: req.body.name}
    })
    const user = await db.user.findOne({
      where: { id: req.params.id }
    })
    user.addCocktail(newCocktail)
    res.redirect('/users/favorites')
  } catch (error) {
    console.log(error);
  }
})

// Add a new bottle to the cabinet
router.post('/:id/bottles', async (req, res) => {
  try {
    const [newBottle, created] = await db.bottle.create({
      type: req.body.type,
      img_url: req.body.img_url
    })
    const user = await db.user.findOne({
      where: { id: req.params.id }
    })
    user.addBottle(newBottle)
    res.redirect('/bottles/index')
  } catch (error) {
    console.log(error);
  }
})

// Delete cocktail from the database - user's favorites
router.delete('/:userId/cocktails/:cocktailId', async (req, res) => {
  try {
    const deletedCocktail = await db.cocktail.destroy({
      where: { id: req.body.id }
    })
    const user = await db.user.findOne({
      where: { id: req.params.id}
    })
    user.removeCocktail(deletedCocktail)
    res.redirect('/users/favorites')
  } catch (error) {
    console.log();
  }
})

// Delete bottle from users cabinet
router.delete('/:userId/bottles/:bottleId', async (req, res) => {
  try {
    const deletedBottle = await db.bottle.destroy({
      where: { id: req.body.id }
    })
    const user = await db.user.findOne({
      where: { id: req.params.id}
    })
    user.removeBottle(deletedBottle)
    res.redirect('/users/cabinet')
  } catch (error) {
    console.log();
  }
})

module.exports = router