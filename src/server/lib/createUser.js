import { User } from 'src/server/models'
User.sync()

export function userLocal (username, password, email) {
  return new Promise((resolve, reject) => {
    // create the user
    let newUser = User.build({
      // set the user's local crendentials
      username: username,
      password: User.generateHash(password),
      email: email
    })

    // save the user
    newUser.save()
      .then(() => resolve(newUser))
      .catch(err => {
        throw err
      })
  })
}

export function userFacebook (profile, token) {
  return new Promise((resolve, reject) => {
    // create the user
    let newUser = User.build({
      // set the username because is required
      username: profile.displayName,
      // set the user's facebook crendentials
      facebookid: profile.id,
      facebooktoken: token,
      email: profile.email
    })

    // save the user
    newUser.save()
      .then(() => resolve(newUser))
      .catch(err => {
        throw err
      })
  })
}

export function userTwitter (profile, token) {
  return new Promise((resolve, reject) => {
    // create the user
    checkUsernameSocial(profile).then(username => {
      let newUser = User.build({
        username: username,
        // set the username because is required
        // set all of the user data that we need
        twitterid: profile.id,
        twittertoken: token
      })
      // save the user
      newUser.save()
      .then(() => resolve(newUser))
      .catch(err => {
        throw err
      })
    })
  })
}

let checkUsernameSocial = (profile) => {
  return new Promise((resolve, reject) => {
    User.findOne({ where: { username:  profile.username } })
      .then(user => {
        console.log(user)
        if (user) {
          let username = `${profile.username}-${profile.id}`
          resolve(username)
        }
        resolve(profile.username)
      })
  })
}
