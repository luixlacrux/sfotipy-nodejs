import LocalStrategy from 'passport-local'
import { userLocal } from 'src/server/lib/createUser'

export default function (passport, User) {
  //===================================
  // LOCAL SIGNUP =====================
  // ==================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'
  passport.use('local-signup', new LocalStrategy(
    { passReqToCallback: true }, // allows us to pass back the entire request to the callback
    (req, username, password, done) => {
      process.nextTick(() => {
        User.findAll({ where: {
          localusername: username,
          $or:[{ localemail: req.body.email }]
        }})
        .then(users => {
          if (!req.body.email)
            return done(null, false, req.flash('message', 'Email is required'))
          // check to see if theres already a user with that username or email
          if (users.length)
            return done(null, false, req.flash('message', 'That username our email is already taken.'))
          if (password.length < 6)
            return done(null, false, req.flash('message', 'Password is short. min 6 characters'))
          // create a new user
          userLocal(username, password, req.body.email)
            // all is well, return successsfully user
            .then(newUser => done(null, newUser))
        })
        .catch(err => done(err))
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
        User.findOne({ where: { localusername: username }})
        .then(user => {
          // if no user is found, return the message
          if (!user)
            return done(null, false, req.flash('message', 'User not found'))
          // if the user is found but the password is wrong
          if (!user.validPassword(password))
            return done(null, false, req.flash('message', 'Oops! Wrong password'))

          // all is well, return successsfully user
          done(null, user)
        })
        .catch(err => done(err))
      })
    }
  ))
}
