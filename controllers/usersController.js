const router = require('express').Router()
const db = require('../models')

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
  try {
    const newUser = await db.user.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      profile_img: req.body.profile_img
    })
    res.redirect('/bottles/index', { user: newUser})
  } catch (error) {
    console.log(error);
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
    const deletedUser = await db.user.destroy({
      where: { id: req.params.id }
    })
    res.redirect('/users/index')
  } catch (error) {
    console.log(error);
  }
})

// Show all bottles that user saved

// Show all cocktails that user saved



module.exports = router