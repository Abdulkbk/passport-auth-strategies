const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema(
  {
    googleId: {
      type: String,
      default: null,
    },
    displayName: {
      type: String,
      required: [true, 'Name is required'],
    },
    emailId: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    image: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

UserSchema.methods.encryptPassword = async password => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

UserSchema.methods.matchPassword = async password => {
  return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', UserSchema)
