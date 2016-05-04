import passport from 'passport'
import User from 'src/server/models/user'
import LocalStrategy from 'src/server/config/local'
import FacebookStrategy from 'src/server/config/facebook'
import TwitterStrategy from 'src/server/config/twitter'

export default function (app) {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser((user, done) => {
    done(null, user.id) // req.user
  })
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })

  // Strategies
  LocalStrategy(passport) // set up strategy local
  FacebookStrategy(passport) // set up strategy Facebook
  TwitterStrategy(passport) // set up strategy Twitter
}
