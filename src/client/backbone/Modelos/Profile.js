import Backbone from 'backbone'
import $ from 'jquery'
// import utils from 'src/client/backbone/Utils'

class Profile extends Backbone.Model {
  constructor(opts) {
    super(opts)
    this.url = '/api/profile'
  }

  fetchData () {
    return new Promise((resolve, reject) => {
      // hacemos la peticion de los datos
      $.get(this.url).done(profile => {
        // si es exitosa guardamos los datos en el modelo
        this.set(profile)
        // retornamos success
        return resolve()
      }).error(err => reject(err))      
    })
  }

  changeData (data) {
    return new Promise((resolve, reject) => {
      // ejecutamos 
      this.updateData(this.url, data).done(res => {
        if (!res.success) {
          return reject(res.message)
        }

        resolve(res.message)
      }).error(err => console.log)
    })
  }

  changePass (data) {
    const url = `${this.url}?passwd=true` 
    return new Promise((resolve, reject) => {
      this.updateData(url, data).done(res => {
        if (!res.success) {
          return reject(res.message)
        }

        resolve(res.message)
      }).error(err => console.log)
    })
  }


  updateData (url, data) {
    return $.ajax({ url, data, method: 'PUT' })
  }
}

export default Profile