import $ from 'jquery'
// Main View
import ProfilePrivateView from 'src/client/backbone/Views/Profile/Private'
import ProfilePublicView from 'src/client/backbone/Views/Profile/Public'
// Model Profile
import ProfileModel from 'src/client/backbone/Models/Profile'
import loader from 'src/client/handlebars/Utils/loader.hbs'
import app from 'src/client/backbone/router'

export default function (username) {
  // Definimos la url con el username
  const url = `/api/user/${username}`
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

    // comprobamos que el username sea igual al del user autenticado
    if (profileModelAuth.get('username') === username) {
      // instanciamos una vista de ProfilePrivate y con el modelo Profile Authenticado. 
      const profileView = new ProfilePrivateView({ model: profileModelAuth })
      // renderiso la vista y muestro en $app
      profileView.render()
      $app.html(profileView.el)

    } else {
      // instanciamos el modelo y le pasamos la url
      // definida con el username recibido
      const model = new ProfileModel({ url })
      // instanciamos una vista de ProfilePublic
      // ligada al modelo previamente instanciado
      const profileView = new ProfilePublicView({ model })
      // Obtenemos los datos del modelo y
      // renderizamos la vista en $app
      profileView.model.fetchData().then(() => {
        profileView.render()
        $app.html(profileView.el)
      }).catch(err => console.error(err))          
    }
  })
}