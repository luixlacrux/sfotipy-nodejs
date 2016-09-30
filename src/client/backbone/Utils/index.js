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

  parseAlbumArtist (album) {
    return {
      id: album.id,
      name: album.name,
      year: '2000',
      cover: album.images[1].url || album.images[0].url || null
    }
  },

  parseSongAlbum (song, album) {
    return {
      id: song.id,
      name: song.name,
      index: song.track_number,
      source: song.preview_url,
      album: album.get('name'),
      album_id: album.get('id'),
      cover: album.get('cover'),
      author: album.get('author')
    }
  },

  parseSongTopTrack (song, index) {
    return {
      id: song.id,
      name: song.name,
      index: index,
      source: song.preview_url,
      album: song.album.name,
      album_id: song.album.id,
      artists: song.artists,
      cover: song.album.images[1].url || song.album.images[0].url || null
    }
  },

  parseSongSearch (song) {
    return {
      id: song.id,
      name: song.name,
      index: song.track_number,
      source: song.preview_url,
      album: song.album.name,
      album_id: song.album.id,
      artists: song.artists,
      cover: song.album.images[1].url || song.album.images[0].url || null
    }
  },

  parseArtist (artist) {
    return {
      id: artist.id,
      name: artist.name,
      image: artist.images[1].url || song.album.images[0].url || null,
      followers: artist.followers.total
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
