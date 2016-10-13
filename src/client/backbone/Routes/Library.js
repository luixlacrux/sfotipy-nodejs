import $ from 'jquery'
// Template
import template from 'src/client/handlebars/Library/main.hbs'
import noAlbums from 'src/client/handlebars/Empty/NoAlbums.hbs'
// Collections
import AlbumsCollections from 'src/client/backbone/Collections/Albums'
// Views
import AlbumsListView from 'src/client/backbone/Views/Library/Albums/albums'

export function AlbumsLibrary (username) {
  $('#player').hide()
  $('main#app')
    .empty()
    .html(template())

  const albums = new AlbumsCollections({ url: '/api/following/albums' })
  albums.getAlbumsSaved().then(() => {

    if (albums.models == '') {
      $('main#app')
        .empty()
        .html(noAlbums())
    }
    const view = new AlbumsListView({ collection: albums })
    view.render()
  })
}
