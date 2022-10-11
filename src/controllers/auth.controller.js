const asyncHandler = require('express-async-handler')
const passport = require('passport')
const { registerUser } = require('../services/user.services')

const loginController = passport.authenticate('local', {
  successRedirect: '/api/auth/',
  failureRedirect: '/api/auth/signin',
})

const logoutController = asyncHandler(async (req, res) => {
  await req.logout(err => {
    if (err) throw err

    res.json({ msg: 'Logged out' })
  })
})

const signUpController = asyncHandler(async (req, res) => {
  const { full_name, email, password } = req.body

  if (!full_name || !email || !password) {
    res.status(400)

    throw new Error('All fields are required')
  }

  const user = { full_name, email, password }

  const newUser = await registerUser(user)

  res.status(201).json({ user: newUser })
})

module.exports = { loginController, signUpController, logoutController }
