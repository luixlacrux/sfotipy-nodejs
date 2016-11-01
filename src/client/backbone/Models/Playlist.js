import Backbone from 'backbone'
import  $ from 'jquery'
import utils from 'src/client/backbone/Utils'

class PlayList extends Backbone.Model {
  constructor(opts) {
    super(opts)
    this.url = opts ? opts.url : '/api/playlist'
  }

  newPlaylist (title) {
    return new Promise((resolve, reject) => {
      $.post(this.url, { title }).done((data) => {
        console.log(data)
        return resolve()
      }).error((err) => reject(err))
    })
  }

  getPlaylist (data) {
    return new Promise((resolve, reject) => {
      this.set(
        Object.assign(utils.parsePlaylist(data))
      )
    })
  }
}

export default PlayList
