import Backbone from 'backbone'
import $ from 'jquery'
import Artist from 'src/client/backbone/Models/Artist'
import utils from 'src/client/backbone/Utils'

class Artists extends Backbone.Collection {
  constructor(opts) {
    super()
    this.model = Artist
  }

  addArtist (artist) {
    // agregamos el album a la coleccion
    const newArtist = utils.parseArtist(artist)
    this.add(new Artist(newArtist))
  }
}

export default Artists
