import Backbone from 'backbone'
import Handlebars from 'handlebars'
import template from 'src/client/templates/user/edit.hbs'
import templateMessage from 'src/client/templates/user/modal_message.hbs'
import $ from 'jquery'

class ProfileEditView extends Backbone.View {
  get el () { return $('#content') }

  get events () {
    return {
      'click .btn-back': 'navigate',
      'submit #profile .edit-user': 'updateData',
      'submit #profile .edit-password': 'updatePassword'
    }
  }

  initialize () {
    console.log('profile')
  }

  fetchData () {
    if (!Object.keys(this.model.toJSON()).length) {
      this.model.fetchData()
        .then(this.render.bind(this))
    } else {
      this.render()
    }
  }

  render () {
    this.$el.empty()
    let model = {
      'username': this.model.get('localusername'),
      'name': this.model.get('localusername'),
      'email': this.model.get('localemail')
    }
    this.$el.html(template(model))
  }

  renderMessage (message, $form) {
    let template = templateMessage(message)
    this.removeMessage($form)
    $form.prepend(template)
  }

  removeMessage ($form) {
    $form.find('.modal-message').remove()
  }

  navigate (ev) {
    ev.preventDefault()
    let username = this.model.get('localusername')
    Sfotipy.navigate(`/@${username}`, { trigger: true })
  }

  updateData (ev) {
    ev.preventDefault()
    this.$formData = $(ev.target)
    let data = {
      name: this.$formData.find('.name').val(),
      username: this.$formData.find('.username').val(),
      email: this.$formData.find('.email').val(),
    }

    this.model.updateData(data)
      .then(res => {
        if (res.success)
          this.render()
      })
  }

  updatePassword (ev) {
    ev.preventDefault()
    this.$formPassword = $(ev.target)
    let passwd = {
      old: this.$formPassword.find('.old').val(),
      new: this.$formPassword.find('.new').val(),
      confirm: this.$formPassword.find('.confirm').val()
    }

    this.validPassword(passwd)
      .then(() => {
        this.removeMessage(this.$formPassword)
        this.model.updatePassword(passwd)
          .then(res => {
            this.$formPassword.find('#Apassword').val('')
            this.renderMessage(res, this.$formPassword)
          })
      })
      .catch(message => this.renderMessage(message, this.$formPassword))

  }

  validPassword (passwd) {
    return new Promise((resolve, reject) => {
      if (!passwd.old || !passwd.new || !passwd.confirm)
        return reject({ message: 'All fields is required. '})
      if (passwd.new !== passwd.confirm)
        return reject({ message: 'Passwords not match. '})
      if (passwd.new.length < 6)
        return reject({ message: 'New password is short. min 6 characters'})
      resolve()
    })

  }
}

export default ProfileEditView
