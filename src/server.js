const express = require('express')
const colors = require('colors')
const session = require('express-session')
const initPassport = require('./config/passport')

require('dotenv').config()

const connectDB = require('./config/db')
const passport = require('passport')
const { getUserByEmail, getUserById } = require('./services/user.services')
const { isAuthenticated } = require('./middlewares/auth.middleware')

const port = process.env.PORT || 8000

// Create connection to the mongodb database
connectDB()

// Initialize app
const app = express()

// Setups
app.set('view engine', 'ejs')
app.set('views', './src/views')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Passport auth
initPassport(passport, getUserByEmail, getUserById)
app.set(passport.initialize())

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
)
app.use(passport.session())

// Routes
app.get('/', isAuthenticated, (req, res) => res.render('pages/index'))
app.use('/api/auth', require('./routes/auth.routes'))
// app.use('/api/user', require('./routes/user.routes'))

app.listen(port, () => console.log(`Server started on port ${port}`))
