export default {
  validPassword (passwd) {
    return new Promise((resolve, reject) => {
      if (!passwd.old || !passwd.new || !passwd.confirm)
        return reject({ message: 'All fields is required. '})
      if (passwd.new.length < 6)
        return reject({ message: 'New password is short. min 6 characters'})
      if (passwd.new !== passwd.confirm)
        return reject({ message: 'Passwords not match. '})
      resolve()
    })
  },

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