import LocalStrategy from 'passport-local'
import User from 'src/server/models/user'
import { userLocal } from 'src/server/lib/createUser'

export default function (passport) {
  //===================================
  // LOCAL SIGNUP =====================
  // ==================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'
  passport.use('local-signup', new LocalStrategy(
    { passReqToCallback: true }, // allows us to pass back the entire request to the callback
    (req, username, password, done) => {
    process.nextTick(() => {
      User.find({ $or: [
        { 'local.username': username },
        { 'local.email': req.body.email }
        ]}, (err, users) => {
          // if there are any errors, return the error
          if (err)
            return done(err)
          if (!req.body.email)
            return done(null, false, req.flash('message', 'Email is required'))
          // check to see if theres already a user with that username or email
          if (users.length)
            return done(null, false, req.flash('message', 'That username our email is already taken.'))
          // create a new user
          userLocal(username, password, req.body.email)
            // all is well, return successsfully user
            .then(newUser => done(null, newUser))
        })
      })
    }
  ))

  // ==================================
  // LOCAL LOGIN ======================
  // ==================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'
  passport.use('local-login', new LocalStrategy(
    { passReqToCallback: true }, // allows us to pass back the entire request to the callback
    (req, username, password, done) => {
    process.nextTick(() => {
      User.findOne({ 'local.username': username }, (err, user) => {
        // if there are any errors, return the error before anything else
        if (err)
          return done(err)
        // if no user is found, return the message
        if (!user)
          return done(null, false, req.flash('message', 'User not found'))
        // if the user is found but the password is wrong
        if (!user.validPassword(password))
          return done(null, false, req.flash('message', 'Oops! Wrong password'))

        // all is well, return successsfully user
        done(null, user)
      })
    })
  }))
}
