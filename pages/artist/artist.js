
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
let users = document.querySelector('#users')

getSong(`/artists/${songId}`)
.then(res => {
    title.innerHTML = res.data.name
    type_name.innerHTML = res.data.name
    back.style.backgroundImage = `url(${res.data.images[0].url})` 
    users.innerHTML = res.data.followers.total.toLocaleString('ru-RU') + ' слушателей за месяц'
    console.log(res.data);
})

// getSong(`/playlists/${songId}`)
// .then(res  => {
//   console.log(res);
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

getSong("/tracks/11dFghVXANMlKmJXsNCbNl")
.then(res => {
  audioLoyal(document.body, res.data)
  audioFunc()
})

setTimeout(() => {
    footer(main)
}, 500);