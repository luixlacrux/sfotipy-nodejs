import User from 'src/server/models'
User.sync()

export default function (apiRoute, app) {

  app.route(`${apiRoute}/profile`)
    // ================================
    // Get data of user authenticate ==
    // ================================
    .get((req, res) => {
      let user = req.user.dataValues
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

            user.update({ localpassword: passwd.new })
              .then(() => res.json({ success: true, message: 'Password update successsfully'}))
          })
      } else {
        let formData = {
          //name: req.body.name,
          localusername: req.body.username || req.user.localusername,
          localemail: req.body.email || req.user.localemail
        }

        if (!formData.localusername || !formData.localemail)
          return res.format({ default: () => res.sendStatus(400) })

        User.findOne({ where: { id: user_id } })
          .then(user => {
            if (!user)
              return res.format({ default: () => res.sendStatus(404) })

            user.update(formData)
              .then(() => res.json({ success: true, message: 'Data update sucessfully', user: user.dataValues }))
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

    User.findOne({ where: { localusername: username } })
      .then(user => {
        if (!user)
          return res.format({ default: () => res.sendStatus(404) })

        res.json(user.dataValues)
      })
  })
}
