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
      'click #change-passwd': 'showFormPasswd',
      'click #change-photo': 'changePhoto',
      'submit #profile .edit-user': 'updateData',
      'submit #profile .edit-password': 'updatePassword'
    }
  }

  initialize () {
    this.$body = this.$el.closest('body')
    this.$spinner = $('<div class="loader small">')
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
    let $button = this.$formData.find('button')
    let data = {
      name: this.$formData.find('.name').val(),
      username: this.$formData.find('.username').val(),
      email: this.$formData.find('.email').val(),
    }
    $button.html(this.$spinner)
    this.model.updateData(data)
      .then(res => {
        $button.html('Save')
        if (res.success)
          this.render()
      })
  }

  updatePassword (ev) {
    ev.preventDefault()
    this.$formPassword = $(ev.target)
    let $button = this.$formPassword.find('button')
    let passwd = {
      old: this.$formPassword.find('.old').val(),
      new: this.$formPassword.find('.new').val(),
      confirm: this.$formPassword.find('.confirm').val()
    }

    this.validPassword(passwd)
      .then(() => {
        $button.html(this.$spinner)
        this.removeMessage(this.$formPassword)
        this.model.updatePassword(passwd)
          .then(res => {
            $button.html('Change')
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
      if (passwd.new.length < 6)
        return reject({ message: 'New password is short. min 6 characters'})
      if (passwd.new !== passwd.confirm)
        return reject({ message: 'Passwords not match. '})
      resolve()
    })
  }

  showFormPasswd (ev) {
    ev.preventDefault()
    this.$el.find('.edit-password').fadeToggle(300, () => {
      this.$body.animate({ scrollTop: this.$body.get(0).scrollHeight }, 800)
    })
  }

  changePhoto (ev) {
    ev.preventDefault()
    this.$el.find('#image-profile').click()
  }
}

export default ProfileEditView
