import passport from 'passport'
import LocalStrategy from 'src/server/config/local'
import FacebookStrategy from 'src/server/config/facebook'
import TwitterStrategy from 'src/server/config/twitter'
import { User } from 'src/server/models'
User.sync()

export default function (app) {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser((user, done) => {
    done(null, user.id) // req.user
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => done(null, user))
      .catch(err => done(err, false))
  })

  // Strategies
  LocalStrategy(passport, User) // set up strategy local
  FacebookStrategy(passport, User) // set up strategy Facebook
  TwitterStrategy(passport, User) // set up strategy Twitter
}
