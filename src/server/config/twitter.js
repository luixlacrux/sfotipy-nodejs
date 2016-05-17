import TwitterStrategy from 'passport-twitter'
import configAuth from 'src/server/config/auth'
import { userTwitter } from 'src/server/lib/createUser'

export default function (passport, User) {
  // ======================
  // TWITTER ==============
  // ======================
  passport.use(new TwitterStrategy({
    consumerKey: configAuth.twitterAuth.consumerKey,
    consumerSecret: configAuth.twitterAuth.consumerSecret,
    callbackURL: configAuth.twitterAuth.callbackURL
  },
  (token, tokenSecret, profile, done) => {
    // make the code asynchronous
    // User.findOne won fire until we have all our data back form Twitter
    process.nextTick(() => {
      User.findOne({ where: { 'twitterid': profile.id } })
        .then(user => {
          // if the user is found then log them in
          if (user)
            return done(null, user) // user found, return that user

          userTwitter(profile, token)
          .then(newUser => done(null, newUser))
        })
    })
  }))
}
