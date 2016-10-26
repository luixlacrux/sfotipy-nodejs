import $ from 'jquery'
// Template
import template from 'src/client/handlebars/Library/main.hbs'
import noResults from 'src/client/handlebars/Empty/content.hbs'
// Collections
import AlbumsCollections from 'src/client/backbone/Collections/Albums'
import PlaylistsCollections from 'src/client/backbone/Collections/Playlists'
import ArtistsCollections from 'src/client/backbone/Collections/Artists'
import SongsCollections from 'src/client/backbone/Collections/Songs'
// Views
import LibraryView from 'src/client/backbone/Views/Library/main.js'
import AlbumsListView from 'src/client/backbone/Views/Library/Albums/albums'
import ArtistsListView from 'src/client/backbone/Views/Library/Artists/artists'
import PlaylistsView from 'src/client/backbone/Views/Library/Playlists/playlists'
import MusicsView from 'src/client/backbone/Views/Library/Musics/musics'

function init (data) {
  $('#player').hide()
  const viewLibrary = new LibraryView({ model: data })
  viewLibrary.render()
}

export function AlbumsLibrary (username) {
  let order = [
    'Artist',
    'Name'
  ]
  init({order, name: 'Album'})
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

// Get Artists
export function ArtistsLibrary (username) {
  let order = [
    'Name'
  ]
  init({order, name: 'Artist'})
  const artists = new ArtistsCollections({ url: '/api/following/artists' })
  artists.getArtistsSaved().then(() => {

    if (artists.models == '') {
      $('main#app')
        .empty()
        .html(noResults({ name: 'Artists' }))
    }
    const view = new ArtistsListView({ collection: artists })
    view.render()
  })
}

export function PlaylistsLibrary (username) {
  let order = [
    'Name',
    'Date'
  ]
  init({order, name: 'Playlist'})
  const playlists = new PlaylistsCollections({ url: '/api/playlist' })
  playlists.getPlaylists().then(() => {
    const view = new PlaylistsView({ collection: playlists })
    view.render()
  })
}

export function MusicsLibrary (username) {
  let order = [
    'Artist',
    'Name'
  ]
  init({order, name: 'Music'})
  const musics = new SongsCollections({ url: '/api/love/songs' })
  musics.getSongs()
    .then(() => {
      const view = new MusicsView({ collection: musics })
      view.render()
    })
}
