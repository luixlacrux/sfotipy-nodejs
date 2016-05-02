export function isLoggedIn (req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()){
    return next()
  }

  // id they aren't redirect them to the home page
  res.redirect('/home/login')
}

// route middleware to make sure a user is not logged in
export function isNotLoggedIn (req, res, next) {
  if(!req.isAuthenticated())
    return next()

  res.redirect('/')
}
