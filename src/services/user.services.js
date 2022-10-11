const User = require('../models/user.model')
const {
  findUserByEmail,
  findUserById,
  addNewUser,
} = require('./user.repository')

const getUserByEmail = async email => {
  try {
    return await findUserByEmail(email)
  } catch (error) {
    console.log(error)
    throw new Error(`User with ${email} email not found`)
  }
}

const getUserById = async id => {
  try {
    return await findUserById(id)
  } catch (error) {
    console.log(error)
    throw new Error('User with that Id not found')
  }
}

const registerUser = async user => {
  return await addNewUser(user)
}

module.exports = { getUserByEmail, getUserById, registerUser }
