import $ from 'jquery'
import SongModel from 'src/client/backbone/Models/Song'

export function loveSong (data) {
  let song = {
    id: data.id,
    name: data.name,
    song: data.source,
    duration: data.duration_ms,
    cover: data.cover,
    id_album: data.album_id,
    album: data.album,
    id_artist: data.artists[0].id,
    artist: data.artists[0].name
  }
  const modelSong = new SongModel({ url: `/api/love/songs` })
  modelSong.addSongToLove(song)
    .then(() => {
      console.log(`${song.name} loved`)
    })
    .catch((err) => {
      console.log(`${err.status}\t${song.name} not loved :(`)
    })
}

export function deleteSong (song) {
  const modelSong = new SongModel({ url: `/api/love/song/${song.id}` })
  modelSong.deleteSongLoved()
    .then(() => {
      console.log(`${song.name} deleted :)`)
    })
    .catch((err) => {
      console.log(`${err.status}\t${song.name} cannot be deleted :(`)
    })
}
