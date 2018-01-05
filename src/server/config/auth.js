const PORT = process.env.PORT

const config = {
  'facebookAuth': {
    'clientID': process.env.F_CLIENT,
    'clientSecret': process.env.F_SECRET,
    'callbackURL': `http://localhost:${PORT}/auth/facebook/callback`
  },
  'twitterAuth': {
    'consumerKey': process.env.T_CLIENT,
    'consumerSecret': process.env.T_SECRET,
    'callbackURL': `http://localhost:${PORT}/auth/twitter/callback`
  },
  'spotifyAuth': {
    'consumer': {
      'key': process.env.S_CLIENT,
      'secret': process.env.S_SECRET
    }
  }
}
export default config
