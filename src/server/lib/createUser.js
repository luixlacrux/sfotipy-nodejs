import User from 'src/server/models/user'

export default function (username, password, email) {
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
