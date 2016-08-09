import Backbone from 'backbone'
import $ from 'jquery'
import Song from 'src/client/backbone/Modelos/Song'

class Playing extends Backbone.Collection {
  constructor(opts) {
    super(opts)
    this.model = Song
  }

  addSongs (album) {
    let songs = album.get('songs')
    songs.forEach(song => {
      this.parseSong(song, album)
    })
  }

  parseSong (song, album) {
    this.add(new Song({
      id_spotify: song.id,
      id: song.track_number,
      album_cover: album.get('cover'),
      album_name: album.get('name'),
      author: album.get('author'),
      name: song.name,
      source: song.preview_url
    }))
  }

  // getAlbums () {
  //   // reseteamos la coleccion
  //   this.reset()
  //   return new Promise((resolve, reject) => {
  //     $.get(this.url).done(albums => {
  //       // por cada elemento ejecutaremos parseAlbum
  //       // al terminar devolvemos la promesa
  //       albums.forEach(this.parseAlbum, this)
  //       resolve()
  //     })
  //     .error(err => console.error(err))

  //   })
  // }

  // parseAlbum (item) {
  //   let album = new Album({
  //     id: item.id,
  //     name: item.name,
  //     cover: item.images[1].url || item.images[0].url || null,
  //     author: item.artists[0].name,
  //     songs: item.tracks.items,
  //     album: item.album_type
  //   })

  //   // lo agregamos a la coleccion
  //   this.add(album)
  // }
}

export default Playing