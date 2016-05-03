const config = {
  'facebookAuth': {
    'clientID': process.env.F_CLIENT,
    'clientSecret': process.env.F_SECRET,
    'callbackURL': 'http://localhost:3000/auth/facebook/callback'
  },
  'twitterAuth': {
    'consumerKey': process.env.T_CLIENT,
    'consumerSecret': process.env.T_SECRET,
    'callbackURL': 'http://localhost:3000/auth/twitter/callback'
  }
}
export default config
