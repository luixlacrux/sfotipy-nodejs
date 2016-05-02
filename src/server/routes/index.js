import User from 'src/server/models/user'
import { isLoggedIn, isNotLoggedIn } from 'src/server/lib/middlewares'

export default function (app, passport) {
  let renderIndex = (req, res) => res.render('index', {user: req.user})
  let renderHome = (req, res) => res.render('home', {message: req.flash('message')})

  app.get('/', (req, res) => res.redirect('/top-albums'))
  app.get('/top-albums', isLoggedIn, renderIndex)
  app.get('/home', isNotLoggedIn, renderHome)
  app.get('/home/:action', isNotLoggedIn, renderHome)
  app.get('/@:username', isLoggedIn, renderIndex)
  app.get('/album/:name', isLoggedIn, renderIndex)
  app.get('/search/:query', isLoggedIn, renderIndex)

  app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/home')
  })

  app.get('/users', (req, res) => {
    User.find({}, (err, users) => {
      if (err)
        throw err

      res.json(users)
    })
  })


  app.post('/home/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/home/login',
    failureFlash: true // allow flash messages
  }))

  app.post('/home/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/home/signup',
    failureFlash: true // allow flash messages
  }))
  /*(req, res) => {
    if (!req.body.username || !req.body.email || !req.body.password)
      return res.json({ success: false, message: 'all fields are required' })

    let newUser = new User()
    newUser.local.username = req.body.username
    newUser.local.password = newUser.generateHash(req.body.password)
    newUser.local.email = req.body.email

    newUser.save(err => {
      if (err)
        throw err
      res.json({ success: true, message: 'Successfully' })
    }*/
}
