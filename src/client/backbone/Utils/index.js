export default {

  parseAlbum (album) {
    return {
      id: album.id,
      name: album.name,
      cover: album.images[1].url || album.images[0].url || null,
      author: album.artists ? album.artists[0] : null,
      songs: album.tracks ? album.tracks.items : null,
      album: album.album_type
    }
  },

  parseSong (song) {
    return {
      id: song.id,
      name: song.name,
      song: song.preview_url,
      artists: song.artists,
      album: song.album.name,
      album_id: song.album.id,
      track_number: song.track_number,
      cover: song.album.images[1].url || song.album.images[0].url || null
    }
  },

  cache: {
    save (key, jsonData, expirationMin=720) {
      let expirationMS = expirationMin * 60 * 1000
      let record = { value: JSON.stringify(jsonData), timestamp: new Date().getTime() + expirationMS }
      localStorage.setItem(key, JSON.stringify(record))
    },

    load (key) {
      let record = JSON.parse(localStorage.getItem(key))
      if (!record) { return false }
      return (new Date().getTime() < record.timestamp && JSON.parse(record.value))
    }
  },
}