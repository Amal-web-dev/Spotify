
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


console.log(songId);

// getSong(`/playlists/${songId}`)
// .then(res  => {
//   console.log(res);
// })

getSong(`/tracks/${songId}`)
.then(res => {
  console.log(res);
  title.innerHTML = res.data.name + ' • ' + res.data.type

  localStorage.setItem("songName", res.data.name);
  getSong(`/audio-analysis/${songId}`)
  .then(res  =>  {
    console.log(res);
  })
})

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

getSong("/tracks/11dFghVXANMlKmJXsNCbNl")
.then(res => {
  audioLoyal(document.body, res.data)
  audioFunc()
})