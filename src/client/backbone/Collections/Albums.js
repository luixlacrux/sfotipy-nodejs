import Backbone from 'backbone'
import $ from 'jquery'
import Album from 'src/client/backbone/Models/Album'
import utils from 'src/client/backbone/Utils'

class Albums extends Backbone.Collection {
  constructor(opts) {
    super()
    this.model = Album
    this.url = opts && opts.url ? opts.url : null
  }

  getAlbums () {
    // reseteamos la coleccion
    this.reset()
    return new Promise((resolve, reject) => {

      let albums = utils.cache.load('topAlbums')
      // si exite obtenemos los datos de localstorage
      // al terminar retornamos success
      if (albums) {
        albums.forEach(this.addAlbum, this)
        return resolve()
      }

      $.get(this.url).done(albums => {
        // guardamos en cache
        // key, jsonData, expireTime
        utils.cache.save('topAlbums', albums, 60)
        // por cada elemento ejecutaremos addAlbum
        albums.forEach(this.addAlbum, this)
        // al terminar retornamos success
        return resolve()
      }).error(err => reject(err))

    })
  }

  getAlbumsSaved () {
    this.reset()
    return new Promise((resolve, reject) => {
      $.get(this.url).done(data => {
        let album = data.albums.sort((a, b) => {
          return (b.artist < a.artist)
        })
        album.forEach(this.addAlbumArtist, this)
        return resolve()
      }).error(err => reject(err))
    })
  }

  addAlbum (album) {
    // agregamos el album a la coleccion
    this.add(new Album(utils.parseAlbum(album)))
  }

  addAlbumArtist (album, artist) {
    // agregamos el album a la coleccion
    this.add(new Album(utils.parseAlbumArtist(album, artist)))
  }

  isEmpty () {
    if (!this.length)
      return this.getAlbums()

    return Promise.resolve()
  }
}

export default Albums
