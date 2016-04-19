import $ from 'jquery'

export function ApiSearch (query, callback) {
  $.ajax(`/api/search/${query}`, {
    success: (data, textStatus, xhr) => {
      callback(data)
    }
  })
}

export function ApiAlbums (callback) {
  $.ajax('/api/top-albums', {
    success: (albums, textStatus, xhr) => {
      callback(albums)
    }
  })
}