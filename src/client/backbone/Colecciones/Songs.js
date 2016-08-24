import Backbone from 'backbone'
import $ from 'jquery'
import Song from 'src/client/backbone/Modelos/Song'
import utils from 'src/client/backbone/Utils'

class Songs extends Backbone.Collection {
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

  addSongMoreInfo (song) {
    this.add(new Song(utils.parseSong(song)))
  }
}

export default Songs