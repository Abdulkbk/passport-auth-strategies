const express = require('express')
const router = express.Router()

const {
  loginController,
  signUpController,
  logoutController,
} = require('../controllers/auth.controller')
const {
  isAuthenticated,
  isNotAuthenticated,
} = require('../middlewares/auth.middleware')

router.post('/', isAuthenticated, (req, res) => res.json({ msg: 'welcome' }))

router.post('/signin', isNotAuthenticated, loginController)

router.post('/signup', isNotAuthenticated, signUpController)

router.delete('/signout', isAuthenticated, logoutController)

module.exports = router
