import $ from 'jquery'
import ArtistModel from 'src/client/backbone/Models/Artist'

export function followArtist (data) {
  let artist = {
    id: data.id,
    name: data.name,
    cover: data.image
  }
  const modelArtist = new ArtistModel({ url: `/api/following/artists` })
  modelArtist.followArtist(artist).then(() => {
    console.log(`${artist.name} saved :)`)
  })
  .catch((err) => {
    console.log(`${err.status}\n${artist.name} not saved :(`)
  })
}

export function unfollowArtist (artist) {
  const modelArtist = new ArtistModel({ url: `/api/following/artist/${artist.id}` })
  modelArtist.unfollowArtist().then(() => {
    console.log(`${artist.name} deleted :)`)
  })
}
