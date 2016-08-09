import { isLoggedIn, isNotLoggedIn } from 'src/server/lib/middlewares'

export default function (app, passport) {
  let renderIndex = (req, res) => res.render('index', {user: req.user})
  let renderHome = (req, res) => res.render('login', {message: req.flash('message')})

  app.get('/', (req, res) => res.redirect('/top-albums'))
  app.get('/top-albums', isLoggedIn, renderIndex)
  app.get('/home', isNotLoggedIn, renderHome)
  app.get('/home/:action', isNotLoggedIn, renderHome)
  app.get('/@:username', isLoggedIn, renderIndex)
  app.get('/@:username/edit', isLoggedIn, renderIndex)
  app.get('/album/:name', isLoggedIn, renderIndex)
  app.get('/play/:name/:id', isLoggedIn, renderIndex)
  app.get('/search/:query', isLoggedIn, renderIndex)

  app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/home')
  })

  // =====================
  // LOCAL ===============
  // =====================
  app.post('/home/login', (req, res, next) => {
    console.log(req.body)
    next()
  },passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/home/login',
    failureFlash: true // allow flash messages
  }))

  app.post('/home/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/home/signup',
    failureFlash: true // allow flash messages
  }))

  // =====================
  // FACEBOOK ============
  // =====================
  // route for facebook authentication and login
  app.get('/auth/facebook', isNotLoggedIn, passport.authenticate('facebook', { scope: 'email' }))
  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback', isNotLoggedIn, passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/home'
  }))

  // =====================
  // TWITTER ============
  // =====================
  // route for twitter authentication and login
  app.get('/auth/twitter', passport.authenticate('twitter'))
  // handle the callback after twitter has authenticated the user
  app.get('/auth/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/home'
  }))

  app.get('/users', (req, res) => {
    let user = req.user
    if (user.localpassword) {
      return res.json({
        username: user.localusername,
        password: user.localpassword,
        email: user.localemail
      })
    }

    res.json({username: user.localusername})
  })
}
