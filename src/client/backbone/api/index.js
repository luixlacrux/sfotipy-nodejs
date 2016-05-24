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

export function ApiProfile (callback) {
  $.ajax('/api/profile', {
    success: (user, textStatus, xhr) => {
      callback(user)
    }
  })
}

export function ApiProfileUpdate (formData, opts, callback) {
  var endpoint = opts.passwd ? '/api/profile?passwd=true' : '/api/profile'
  $.ajax({
    url: endpoint,
    method: 'put',
    data: formData,
    success: (res, textStatus, xhr) => {
      callback(res)
    }
  })
}
