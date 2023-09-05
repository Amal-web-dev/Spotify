
import { asideLoyal, audioLoyal, headerMain, footer } from "../../modules/loyal";
import { audioFunc } from "../../modules/audio";
import { getSong } from "../../modules/http.request.js";
import { ReloadMediatekaSong, createSongCont } from "../../modules/function";

let aside = document.querySelector('aside')
let main = document.querySelector('main')
asideLoyal(aside)
headerMain(main)
let mediate_song_block = document.querySelector('.mediate_song_block')
let songId = location.search.split('=').at(-1)
let title = document.querySelector('title')
let back = document.querySelector('.back')
let type_name = document.querySelector('#type_name') 
let artist_name = document.querySelector('#artist_name') 
let artist_poster = document.querySelector('.artist_poster') 

console.log(songId);

// getSong(`/playlists/${songId}`)
// .then(res  => {
//   console.log(res.data);
//   title.innerHTML = res.data.name + ' • ' + res.data.type
//   back.style.backgroundImage = `url(${res.data.images[0].url})`
//   type_name.innerHTML = res.data.name
//   artist_name.innerHTML = res.data.owner.display_name
//   if(res.data.artist) {
//     getSong(`/artists/${res.data.artists[0].id}`)
//     .then(res => {
//       artist_poster.style.backgroundImage = `url(${res.data.images[0].url})`
//     })
//   } else {
//     artist_poster.style.backgroundImage = `url('/public/icons/spotify-icon.png')`
//   }
// })

// getSong(`/tracks/${songId}`)
// .then(res => {
//   console.log(res);

//   getSong(`/audio-analysis/${songId}`)
//   .then(res  =>  {
//     console.log(res);
//   })
// })

getSong("/me")
.then(res => {
  getSong(`/users/${res.data.id}/playlists`)
.then(res => {
  try {
ReloadMediatekaSong(res.data.items, mediate_song_block)
  } catch (error) {
    console.log(error);
  }
})
})

// getSong("/tracks/11dFghVXANMlKmJXsNCbNl")
// .then(res => {
//   audioLoyal(document.body, res.data)
//   audioFunc()
// })