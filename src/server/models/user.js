import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

//define the schema for our user model
const UserSchema = mongoose.Schema({
  local: {
    username: {
      type: String,
      unique: true,
      required: true
    },
    password: String,
    email: String
  },
  
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  }
})

// methods ============
// generating a hash
UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

// checking if password is valid
UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password)
}

// create the model for users and expose it to our app
let user = mongoose.model('User', UserSchema)

export default user

