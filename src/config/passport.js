const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user.model')

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = await User.findOne({ email })

    console.log(user)
    console.log(password)

    if (!user) {
      return done(null, false, { message: 'No user with that email' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    // const isMatch = await user.matchPassword(password)

    if (!isMatch) {
      return done(null, false, { message: 'Incorrect Password' })
    }

    return done(null, user)
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => done(null, getUserById(id)))
}

module.exports = initialize
