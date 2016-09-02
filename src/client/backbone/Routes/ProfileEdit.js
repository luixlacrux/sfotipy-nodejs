import $ from 'jquery'
import ProfileEditView from 'src/client/backbone/Views/Profile/Edit'
import loader from 'src/client/handlebars/Utils/loader.hbs'
import app from 'src/client/backbone/router'

export default function (username) {
  const $app = $('#app')
  const $player = $('#player')

  // colocamos el loader
  $app.html(loader({ big: true }))
  // obtemos el modelo profile, de la vista headerView
  // instanciada en el router
  const profileModelAuth = app.headerView.getProfileModel()
  // nos aseguramos que el modelo no este vacio
  profileModelAuth.isEmptyPromised().then(() => {
    // ocultamos el player
    $player.hide()

    // obtenemos el username del user authenticado
    const usernameAuth = profileModelAuth.attributes.username
    // comprobamos que el username sea igual al del user autenticado
    if ( usernameAuth === username) {
      // instanciamos una vista de ProfileEdit y con el modelo Profile Authenticado. 
      const profileEditView = new ProfileEditView({ model: profileModelAuth })
      // renderiso la vista y muestro en $app
      profileEditView.render()
      $app.html(profileEditView.el)

    } else {
      // redireccion a su profile del user authenticado
      app.navigate(`@${usernameAuth}/edit`, { trigger: true })
    }
  })
}