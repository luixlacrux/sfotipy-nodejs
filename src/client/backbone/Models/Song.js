import Backbone from 'backbone'
import $ from 'jquery'

class Song extends Backbone.Model {
  constructor(opts) {
    super(opts)
    this.url = opts && opts.url ? opts.url : null
  }

  getRawArtists () {
    console.log(this.attributes.artists)
  }

  addSongToPlaylist (playlist, song) {
    return new Promise((resolve, reject) => {
      $.post(this.url, { playlist, song }).done((response) => {
        console.log(response)
        return resolve()
      }).error((err) => reject(err))
    })
  }
}

export default Song
