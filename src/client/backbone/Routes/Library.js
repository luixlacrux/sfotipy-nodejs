import $ from 'jquery'
// Template
import template from 'src/client/handlebars/Library/main.hbs'
import noResults from 'src/client/handlebars/Empty/content.hbs'
// Collections
import AlbumsCollections from 'src/client/backbone/Collections/Albums'
import PlaylistsCollections from 'src/client/backbone/Collections/Playlists'
// Views
import AlbumsListView from 'src/client/backbone/Views/Library/Albums/albums'
import PlaylistsView from 'src/client/backbone/Views/Library/Playlists/playlists'
import LibraryView from 'src/client/backbone/Views/Library/main.js'

function init (data) {
  $('#player').hide()
  const viewLibrary = new LibraryView({ model: data })
  viewLibrary.render()
}

export function AlbumsLibrary (username) {
  init({type: 'Album', something: 'Artist'})
  const albums = new AlbumsCollections({ url: '/api/following/albums' })
  albums.getAlbumsSaved().then(() => {

    if (albums.models == '') {
      $('main#app')
        .empty()
        .html(noResults({ name: 'Albums' }))
    }
    const view = new AlbumsListView({ collection: albums })
    view.render()
  })
}

export function PlaylistsLibrary (username) {
  init({type: 'Playlist', something: 'date of create'})
  const playlists = new PlaylistsCollections({ url: '/api/playlist' })
  playlists.getPlaylists().then(() => {
    const view = new PlaylistsView({ collection: playlists })
    view.render()
  })
}
