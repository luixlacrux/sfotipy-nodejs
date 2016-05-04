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

export function userTwitter (profile, token) {
  return new Promise((resolve, reject) => {
    // create the user
    var newUser = new User()
    checkUsernameSocial(profile).then(username => {
      newUser.local.username = username
      // set the username because is required
      // set all of the user data that we need
      newUser.twitter.id = profile.id
      newUser.twitter.token = token
      newUser.twitter.username = profile.username
      newUser.twitter.displayName = profile.displayName

      // save the user
      newUser.save(err => {
        if (err)
          throw err
        resolve(newUser)
      })
    })
  })
}

let checkUsernameSocial = (profile) => {
  return new Promise((resolve, reject) => {
    User.findOne({'local.username':  profile.username}, (err, user) => {
      console.log(user)
      if (err)
        throw err
      if (user) {
        let username = `${profile.username}-${profile.id}`
        resolve(username)
      }

      resolve(profile.username)
    })
  })
}
