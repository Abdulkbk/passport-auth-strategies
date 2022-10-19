const express = require('express')
const router = express.Router()

const {
  loginController,
  signUpController,
  logoutController,
  googleController,
  googleCallback,
} = require('../controllers/auth.controller')
const {
  isAuthenticated,
  isNotAuthenticated,
} = require('../middlewares/auth.middleware')

router.get('/', isAuthenticated, (req, res) =>
  res.json({ msg: 'welcome', success: true })
)

router.get('/failed', isAuthenticated, (req, res) =>
  res.json({ msg: 'Authentication failed', success: false })
)

router.post('/signin', isNotAuthenticated, loginController)

router.post('/signup', isNotAuthenticated, signUpController)

router.delete('/signout', isAuthenticated, logoutController)

// Google OAuth
router.get('/google', googleController)
router.get('/google/callback', googleCallback, (req, res) => {
  res.redirect('/')
})

module.exports = router
