import $ from 'jquery'
// Main View
import ProfileView from 'src/client/backbone/Vistas/Profile/Main'
// Model Profile
import ProfileModel from 'src/client/backbone/Modelos/Profile'
import app from 'src/client/backbone/router'

export default function (username) {
  // Definimos la url con el username
  const url = `/api/user/${username}`
  const $app = $('#app')
  const $player = $('#player')
  // obtemos el modelo profile, de la vista headerView
  // instanciada en el router
  const profileModelAuth = app.headerView.getProfileModel()
  // nos aseguramos que el modelo no este vacio
  profileModelAuth.isEmptyPromised().then(() => {
    // ocultamos el player
    $player.hide()

    // comprobamos que el username sea igual al del user autenticado
    if (profileModelAuth.get('username') === username) {
      // instancio la vista y con el modelo Profile Authenticado. 
      const profileView = new ProfileView({ model: profileModelAuth })
      // renderiso la vista y muestro en $app
      profileView.render()
      $app.html(profileView.el)
      // retorno false para terminar la ejecucion
      return false
    }

    // instanciamos el modelo y le pasamos la url
    // definida con el username recibido
    const model = new ProfileModel({ url })
    // instanciamos la Vista Principal,
    // ligada al modelo previamente instanciado
    const profileView = new ProfileView({ model })
    // Obtenemos los datos del modelo y
    // renderizamos la vista en $app
    profileView.model.fetchData().then(() => {
      profileView.render()
      $app.html(profileView.el)
    }).catch(err => console.error(err))    
  })
}