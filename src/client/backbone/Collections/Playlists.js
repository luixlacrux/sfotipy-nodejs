import Backbone from 'backbone'
import $ from 'jquery'
import Playlist from 'src/client/backbone/Models/Playlist'

class Playlists extends Backbone.Collection {
  constructor(opts) {
    super()
    this.model = Playlist
    this.url = '/api/playlist'
  }

  getPlaylists () {
    // reseteamos la coleccion
    this.reset()
    return new Promise((resolve, reject) => {

      $.get(this.url).done(data => {
        let playlist = data.playlists.sort((a, b) => {
          return (b.title < a.title) ? 1 : -1
        })
        // por cada elemento ejecutaremos addPlaylist
        playlist.forEach(this.addPlaylist, this)
        // al terminar retornamos success
        return resolve()
      }).error(err => reject(err))

    })
  }

  addPlaylist (playlist) {
    // agregamos el playlist a la coleccion
    this.add(new Playlist(playlist))
  }

  isEmpty () {
    if (!this.length)
      return this.getPlaylists()

    return Promise.resolve()
  }
}

export default Playlists
