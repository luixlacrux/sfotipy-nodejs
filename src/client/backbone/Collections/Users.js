import Backbone from 'backbone'
import $ from 'jquery'
import User from 'src/client/backbone/Models/Profile'

class Users extends Backbone.Collection {
  constructor(opts) {
    super()
    this.model = User
  }

  addUser (user) {
    // agregamos el user a la coleccion
    this.add(new User(user))
  }
}

export default Users
