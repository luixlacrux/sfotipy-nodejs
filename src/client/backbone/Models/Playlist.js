import Backbone from 'backbone'
import  $ from 'jquery'

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
}

export default PlayList
