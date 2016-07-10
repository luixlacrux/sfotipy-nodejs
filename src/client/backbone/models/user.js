import Backbone from 'backbone'
import { ApiProfile, ApiProfileUpdate } from 'src/client/backbone/api'

class User extends Backbone.Model {
  fetchData () {
    return new Promise((resolve, reject) => {
      ApiProfile(user => {
        this.attributes = user
        resolve()
      })
    })
  }

  updateData (formData) {
    return new Promise((resolve, reject) => {
      ApiProfileUpdate(formData, { passwd: false }, res => {
        if (res.success) {
          this.attributes = res.user
          this.trigger('change')
        }
        resolve(res)
      })
    })
  }

  updatePassword (formData) {
    return new Promise((resolve, reject) => {
      ApiProfileUpdate(formData, { passwd:true }, res => {
        resolve(res)
      })
    })
  }
}

export default User
