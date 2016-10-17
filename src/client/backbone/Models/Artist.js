import Backbone from 'backbone'
import $ from 'jquery'
import utils from 'src/client/backbone/Utils'

class Artist extends Backbone.Model {
  constructor(opts) {
    super(opts)
    this.url = opts && opts.url ? opts.url : null
  }

  setArtist (artist) {
    this.set(utils.parseArtist(artist))
  }

  followArtist (artist) {
    return new Promise((resolve, reject) => {
      $.post(this.url, { artist }).done((data) => {
        console.log(data)
        return resolve()
      }).error((err) => reject(err))
    })
  }

  unfollowArtist () {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: this.url,
        type: 'DELETE',
        success: (result) => {
          return resolve()
        }
      })
    })
  }
}

export default Artist
