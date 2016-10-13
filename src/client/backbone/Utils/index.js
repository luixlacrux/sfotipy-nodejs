function secondsToTime (s) {
	  function addZ(n) {
	    return (n<10? '0':'') + n
	  }
	  let ms = s % 1000
	  s = (s - ms) / 1000
	  let secs = s % 60
	  s = (s - secs) / 60
	  let mins = s % 60
		let hrs = (s - mins) / 60

		if (hrs) {
			return `${addZ(hrs)}:${addZ(mins)}:${addZ(secs)}`
		}

	  return addZ(mins) + ':' + addZ(secs)
}

export default {
	countSongsTime (ms) {
		let time = secondsToTime(ms).split(':')

		if (time.length === 3) {
			return `${time[0]} hr ${time[1]} min`
		}

		return `${time[0]} min`
	},

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
		const images = album.images
    return {
      id: album.id,
      name: album.name,
      cover: images.length ? images[1].url || images[0].url : null,
      artists: album.artists,
      songs: album.tracks ? album.tracks.items : null,
      album: album.album_type,
			total: album.tracks ? album.tracks.total : null,
			type: album.album_type,
			date: album.release_date,
			copyrights: album.copyrights
    }
  },

  parseAlbumArtist (album, artist) {
		if (artist == 0) artist = undefined
    return {
      id: album.id_album ? album.id_album : album.id,
      name: album.name,
			id_artist: artist ? artist.id : album.id_artist,
			artist: artist ? artist.name || album.artist : album.artist,
      type: album.album_type ? album.album_type : album.type,
      cover: album.images ? album.images[1].url || album.images[0].url : album.cover
    }
  },

  parseSongAlbum (song, album) {
    return {
      id: song.id,
      name: song.name,
      index: song.track_number,
      duration: secondsToTime(song.duration_ms),
			duration_ms: song.duration_ms,
      source: song.preview_url,
      album: album.get('name'),
      album_id: album.get('id'),
      cover: album.get('cover'),
      artists: song.artists
    }
  },

  parseSongTopTrack (song, index) {
		const images = song.album.images
    return {
      id: song.id,
      name: song.name,
      index: index + 1,
			duration: secondsToTime(song.duration_ms),
			duration_ms: song.duration_ms,
      source: song.preview_url,
      album: song.album.name,
      album_id: song.album.id,
      artists: song.artists,
      cover: images.length ? images[1].url || images[0].url : null
    }
  },

  parseSongSearch (song) {
		const images = song.album.images
    return {
      id: song.id,
      name: song.name,
      index: song.track_number,
      source: song.preview_url,
      album: song.album.name,
      album_id: song.album.id,
      artists: song.artists,
      cover: images.length ? images[1].url || images[0].url : null
    }
  },

  parseArtist (artist) {
		const images = artist.images
    return {
      id: artist.id,
      name: artist.name,
      image: images.length ? images[1].url || images[0].url : null,
      followers: artist.followers.total
    }
  },

  cache: {
		set (key, jsonData) {
			localStorage.setItem(key, JSON.stringify(jsonData))
		},
		get (key) {
			return JSON.parse(localStorage.getItem(key))
		},
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
