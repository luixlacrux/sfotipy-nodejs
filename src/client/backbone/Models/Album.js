import Backbone from 'backbone'
import $ from 'jquery'
import utils from 'src/client/backbone/Utils'

class Album extends Backbone.Model {
  constructor(opts) {
    super(opts)
    this.url = opts && opts.url ? opts.url : null
  }

  fetchData (id) {
    // generamos la key para acceder a localStorage
    let key = `album-${id}`
    return new Promise((resolve, reject) => {

      // si exite obtenemos los datos de localstorage
      // al terminar retornamos success
      let album = utils.cache.load(key)
      if (album) {
        this.setAlbum(album)
        return resolve()
      }

      $.get(this.url).done(album => {
        // guardamos en cache
        // @params key, jsonData, expireTime
        utils.cache.save(key, album)
        // parseamos los datos y agregamos al modelo
        this.setAlbum(album)
        // retornamos success
        return resolve()
      }).error(err => reject(err))
    })
  }

  setAlbum (album) {
    this.set(utils.parseAlbum(album))
  }
}

export default Album
