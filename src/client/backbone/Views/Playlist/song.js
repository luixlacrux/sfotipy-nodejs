import Backbone from 'backbone'
import $ from 'jquery'
import SongView from 'src/client/backbone/Views/Album/song'

class Song extends SongView {
  constructor (opts) {
    super(opts)
  }

  select () {
    debugger
    const { id, index } = this.model.attributes
    Sfotipy.navigate(`play?playlist=${id}&song=${index}`, { trigger: true })
    return false
  }
}

export default Song
