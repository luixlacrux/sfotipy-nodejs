import Backbone from 'backbone'
import $ from 'jquery'
import Artist from 'src/client/backbone/Models/Artist'
import utils from 'src/client/backbone/Utils'

class Artists extends Backbone.Collection {
  constructor(opts) {
    super()
    this.model = Artist
    this.url = opts && opts.url ? opts.url : null
  }

  addArtist (artist) {
    // agregamos el album a la coleccion
    const newArtist = utils.parseArtist(artist)
    this.add(new Artist(newArtist))
  }

  getArtistsSaved () {
    this.reset()
    return new Promise((resolve, reject) => {
      $.get(this.url).done(data => {
        let artists = data.artists.sort((a, b) => {
          return (b.name < a.name)
        })
        artists.forEach(this.addArtist, this)
        return resolve()
      }).error(err => reject(err))
    })
  }
}

export default Artists
