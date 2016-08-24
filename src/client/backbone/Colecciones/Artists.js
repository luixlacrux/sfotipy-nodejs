import Backbone from 'backbone'
import $ from 'jquery'
import Artist from 'src/client/backbone/Modelos/Artist'

class Artists extends Backbone.Collection {
  constructor(opts) {
    super()
    this.model = Artist
    // this.url = opts && opts.url ? opts.url : null 
  }

  addArtist (artist) {
    // agregamos el album a la coleccion
    this.add(new Artist(artist))
  }
}

export default Artists