import FacebookStrategy from 'passport-facebook'
import configAuth from 'src/server/config/auth'
import { userFacebook } from 'src/server/lib/createUser'

export default function (passport, User) {
  // ==================================
  // FACEBOOK =========================
  // ==================================
  passport.use('facebook', new FacebookStrategy({
    // pull in our app id and secret from our auth.js file
    clientID: configAuth.facebookAuth.clientID, // clientID of app in facebook
    clientSecret: configAuth.facebookAuth.clientSecret, // clientSecret of app in facebook
    callbackURL: configAuth.facebookAuth.callbackURL // callbackURL of app in facebook
  },
  (token, resfreshToken, profile, done) => {
    process.nextTick(() => {
      // find the user in the database based on their facebook id
      User.findOne({ where: { 'facebookid': profile.id } })
        .then(user => {
          // if the user is found, then log them in
          if (user)
          // if there is no user found with that facebook id, create them
            return done(null, user) // user found, return that user
          userFacebook(profile, token)
            // all is well, return successsfully user
            .then(newUser => done(null, newUser))
          })
        // if there is an error, stop everything and return that
        // ie an error connecting to the database
        .catch(err => done(err))
    })
  }))
}
