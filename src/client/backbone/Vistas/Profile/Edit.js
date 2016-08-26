import Backbone from 'backbone'
import $ from 'jquery'
import app from 'src/client/backbone/router'
import utils from 'src/client/backbone/Utils'
/* Templates */
import template from 'src/client/handlebars/Profile/edit.hbs'
import templateMessage from 'src/client/handlebars/Utils/alert_message.hbs'
import loader from 'src/client/handlebars/Utils/loader.hbs'

class ProfileEditView extends Backbone.View {
  get tagName () { return 'section' }
  get className () { return 'Perfil' }
  get id () { return 'profile' }  
  get events () {
    return {
      'click .btn-back': 'navigate',
      'click #change-passwd': 'showFormPasswd',
      'click .perfil figure': 'changePhoto',
      'click #change-photo': 'changePhoto',
      'submit .edit-user': 'updateData',
      'submit .edit-password': 'updatePassword'
    }
  }

  initialize () {
    this.listenTo(this.model, 'change', this.render, this)
  }

  render () {
    this.$el.html(template(this.model.attributes))
    this.$formData = this.$el.find('.edit-user')
    this.$formPassword = this.$el.find('.edit-password')
    return this
  }

  navigate (ev) {
    ev.preventDefault()
    const { username } = this.model.attributes
    app.navigate(`/@${username}`, { trigger: true })
  }

  renderMessage (message) {
    this.removeMessage()
    this.$formPassword.prepend(templateMessage(message))
  }

  removeMessage () {
    this.$formPassword.find('.modal-message').remove()
  }
  
  updateData (ev) {
    ev.preventDefault()
    // obtenemos el boton del formulario
    const $button = this.$formData.find('button')
    // le agregamos el loader
    $button.html(loader({ small: true }))
    // obtenemos los data del formulario
    const data = this.$formData.serializeArray()
    // ejecutamos ´changeData´ metodo del modelo
    // y le pasamos la data del formulario
    // al terminar quitamos el loader
    this.model.changeData(data).then(res => $button.html('Save'))
  }

  updatePassword (ev) {
    ev.preventDefault()
    // Removemos los messages
    this.removeMessage()
    // obtenemos el boton del formulario
    const $button = this.$formPassword.find('button')
    // obtenemos los datos del formulario
    const passwd = {
      old: this.$formPassword.find('.old').val(),
      new: this.$formPassword.find('.new').val(),
      confirm: this.$formPassword.find('.confirm').val()
    }

    // validamos las contraseñas
    utils.validPassword(passwd).then(() => {
      // A '$button' le colocamos el loader 
      $button.html(loader({ small: true }))
      // ejecutamos ´changePass´ metodo del modelo
      // y le pasamos la data del formulario
      this.model.changePass(passwd).then(res => {
        // quitamos el loader
        $button.html('Change')
        // limpiamos los input's
        this.$formPassword.find('.password').val('')
        // renderizamos la respuesta del server
        this.renderMessage(res)
      })

    // Si falla la validacion de contraseñas
    // renderizamos el message que recibimos
    }).catch(message => this.renderMessage(message))
  }

  showFormPasswd (ev) {
    ev.preventDefault()
    this.$formPassword.fadeToggle(300, () => {
      const $body = $('body')
      $body.animate({ scrollTop: $body.get(0).scrollHeight }, 500)
    })
  }

  changePhoto (ev) {
    ev.preventDefault()
    this.$formData.find('#image-profile').click()
  }
}

export default ProfileEditView
