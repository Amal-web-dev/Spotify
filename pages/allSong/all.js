
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

let songs = JSON.parse(localStorage.getItem('seeAll'))
let title = JSON.parse(localStorage.getItem('title'))
let all_tracks = document.querySelector('.all_tracks')
let playingSong = []
if(playingSong) {
  playingSong = JSON.parse(localStorage.getItem('playingSong'))
}


createSongCont([`${title}`], all_tracks, songs)

getSong("/me/tracks")
.then(res => {
  ReloadMediatekaSong(res.data.items, mediate_song_block)
})

getSong("/me/albums")
.then(res => {
  ReloadMediatekaSong(res.data.items, mediate_song_block)
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
  if(playingSong) {
    audioLoyal(document.body, playingSong)
    audioFunc()
  } else {
    audioLoyal(document.body, res.data)
    audioFunc()
  }
})

setTimeout(() => {
    footer(main)
}, 500);