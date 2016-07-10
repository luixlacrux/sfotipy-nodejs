import User from 'src/server/models'
User.sync()

export default function (apiRoute, app) {

  app.route(`${apiRoute}/profile`)
    // ================================
    // Get data of user authenticate ==
    // ================================
    .get((req, res) => {
      let reqUser = req.user.dataValues
      let user = {
        first_name: reqUser.first_name,
        last_name: reqUser.last_name,
        username: reqUser.username,
        email: reqUser.email,
        facebookid: reqUser.facebookid,
        twitterid: reqUser.twitterid,
        has_password: false
      }
      
      if (reqUser.password)
        user.has_password = true
      
      res.json(user)
    })

    // ================================
    // Update data to user ==========
    // ================================
    .put((req, res) => {
      let user_id = req.user.id

      // if is passed the query passwd=true, only update password the user
      if (req.query.passwd) {
        let passwd = {
          old: req.body.old,
          new: req.body.new,
          confirm: req.body.confirm
        }
        if (!passwd.old || !passwd.new || !passwd.confirm)
          return res.format({ default: () => res.sendStatus(400) })

        if (passwd.new !== passwd.confirm)
          return res.json({ success: false, message: 'Passwords not match' })
        if (passwd.new.length < 6)
          return res.json({ sucess: false, message: 'New password is short. min 6 characters' })

        passwd.new = User.generateHash(passwd.new)

        User.findOne({ where: { id: user_id } })
          .then(user => {
            if (!user)
              return res.format({ default: () => res.sendStatus(404) })
            if (!user.validPassword(passwd.old))
              return res.json({ success: false, message: 'Oops! Wrong password' })

            user.update({ password: passwd.new })
              .then(() => res.json({ success: true, message: 'Password update successsfully'}))
          })
      } else {
        let formData = {
          first_name: req.body.first_name || req.user.first_name,
          last_name: req.body.last_name || req.user.last_name,
          username: req.body.username || req.user.username,
          email: req.body.email || req.user.email
        }

        if (!formData.username || !formData.email)
          return res.format({ default: () => res.sendStatus(400) })

        User.findOne({ where: { id: user_id } })
          .then(user => {
            if (!user)
              return res.format({ default: () => res.sendStatus(404) })

            user.update(formData)
              .then(() => res.json({ success: true, message: 'Data update sucessfully', user: user.dataValues }))
              .catch(err => res.json({ succes: false, message: 'Oops an error occurred' }))
          })
      }
    })

    // ================================
    // Remove account to the user =====
    // ================================
    .delete((req, res) => {
      let user_id = req.user.id

      User.findOne({ where: { id: user_id } })
        .then(user => {
          if (!user)
            return res.format({ default: () => res.sendStatus(404) })

          return user.destroy()
        }).then(() => res.json({ success: true, message: 'User has been deleted' }))
    })


  // ================================
  // Get a user for the username ====
  // ================================
  app.get(`${apiRoute}/user/:username`, (req, res) => {
    let username = req.params.username
    if (!username)
      return res.format({ default: () => res.sendStatus(400) })

    User.findOne({ where: { username: username } })
      .then(user => {
        if (!user)
          return res.format({ default: () => res.sendStatus(404) })

        res.json(user.dataValues)
      })
  })
}
