const asyncHandler = require('express-async-handler')
const passport = require('passport')
const { registerUser } = require('../services/user.services')

// Local Strategy Controller
const loginController = passport.authenticate('local', {
  successRedirect: '/api/auth/',
  failureRedirect: '/api/auth/signin',
})

// Google Strategy Controller
const googleController = passport.authenticate('google', {
  scope: ['profile', 'email', 'openid'],
})
const googleCallback = passport.authenticate('google', {
  failureRedirect: '/api/auth/fail',
})

const logoutController = asyncHandler(async (req, res) => {
  await req.logout(err => {
    if (err) throw err

    res.json({ msg: 'Logged out' })
  })
})

const signUpController = asyncHandler(async (req, res) => {
  const { displayName, emailId, password } = req.body

  if (!displayName || !emailId || !password) {
    res.status(400)

    throw new Error('All fields are required')
  }

  const user = { displayName, emailId, password }

  const newUser = await registerUser(user)

  res.status(201).json({ user: newUser })
})

module.exports = {
  loginController,
  signUpController,
  logoutController,
  googleController,
  googleCallback,
}
