import User from 'src/server/models/user'

export function userLocal (username, password, email) {
  return new Promise((resolve, reject) => {
    // create the user
    var newUser = new User()
    // set the user's local crendentials
    newUser.local.username = username
    newUser.local.password = newUser.generateHash(password)
    newUser.local.email = email

    // save the user
    newUser.save(err => {
      if (err)
        throw err
      resolve(newUser)
    })
  })
}

export function userFacebook (profile, token) {
  return new Promise((resolve, reject) => {
    // create the user
    var newUser = new User()
    // set the username because is required
    newUser.local.username = profile.displayName
    // set the user's facebook crendentials
    newUser.facebook.id = profile.id
    newUser.facebook.token = token
    newUser.facebook.name = profile.displayName
    newUser.facebook.email = profile.email

    // save the user
    newUser.save(err => {
      if (err)
        throw err
      resolve(newUser)
    })
  })
}
