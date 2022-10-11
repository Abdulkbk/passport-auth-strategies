const User = require('../models/user.model')

const findUserById = async id => {
  return await User.findById(id).select('-password')
}

const findUserByEmail = async email => {
  return await User.findOne({ email }).select('-password')
}

const addNewUser = async user => {
  const newUser = new User(user)
  newUser.password = await newUser.encryptPassword(newUser.password)
  return newUser.save()
}

module.exports = { findUserByEmail, findUserById, addNewUser }
