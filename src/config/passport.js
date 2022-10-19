const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
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

  // Local Strategy Implementation
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))

  // Google Strategy Implementation
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CLIENT_REDIRECT,
      },
      async (acesstoken, refreshtoken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          emailId: profile.emails[0].value,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        }

        try {
          let user = await User.findOne({ googleId: profile.id })

          if (user) {
            done(null, user)
          } else {
            user = await User.create(newUser)
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => done(null, getUserById(id)))
}

module.exports = initialize
