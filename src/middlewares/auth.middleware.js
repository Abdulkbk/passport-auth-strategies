const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.status(401)
    throw new Error('User not authorized')
    next()
  }
}

const isNotAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next()
  } else {
    res.status(401)
    throw new Error('User already authorized')
    next()
  }
}

module.exports = { isAuthenticated, isNotAuthenticated }
