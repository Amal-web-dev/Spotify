import axios from 'axios'
import { ReloadMediatekaSong, welcomeSong, createSongCont } from "./modules/function";
import { asideLoyal, audioLoyal, headerMain, footer } from "./modules/loyal";
import { audioFunc } from "./modules/audio";
import { getSong } from "./modules/http.request.js";


let main = document.querySelector('main')
let aside = document.querySelector('.aside')
headerMain(main)
asideLoyal(aside)
for (let index = 0; index < 1; index++) {
}
let login_a = document.querySelector('.login-a')
let mediate_song_block = document.querySelector('.mediate_song_block')
let welcomeBlock = document.querySelector('.welcome-block')
let welcome_h1 = document.querySelector('.welcome_h1')
let all_cont =  document.querySelector('.all_cont')
let headerMainBlock = document.querySelector('.header-main')
let log_out = document.querySelector('.log-out')

let currentTime = new Date().getHours();
let allTitle =  ['Твои плейлисты']
const myId = localStorage.getItem("myId");
let token = location.href.split('access_token=').at(-1)


if(!token && token !== 'http://localhost:5173/pages/unAuth/#' ||  user == 'http://localhost:5173/pages/unAuth/') {
  localStorage.setItem("myId", token);
} 

// пишет добрый день
if (currentTime >= 5 && currentTime < 12) {
  welcome_h1.innerHTML = 'Доброе утро';
} else if (currentTime >= 12 && currentTime < 18) {
  welcome_h1.innerHTML = 'Добрый день';
} else {
  welcome_h1.innerHTML = 'Добрый вечер';
}
// пишет добрый день

// header-main становитья не прозрачным
// main.onscroll = () => {
//   if (main.scrollTop >= 100) {
//     headerMainBlock.style.backgroundColor = '#1C0E40';
//   } else {
//     headerMainBlock.style.backgroundColor = '#1C0E4020'; 
//   }
// };
// header-main становитья не прозрачным

// появление песен
getSong("/me")
.then(res => {

  getSong(`/users/${res.data.id}/playlists`)
.then(res => {
  try {
ReloadMediatekaSong(res.data.items, mediate_song_block)
createSongCont(allTitle, all_cont, res.data.items.slice(0, 9))
  } catch (error) {
    console.log(error);
  }
})
})

// getSong('/me/tracks')
// .then(res => {
//   // console.log(res);
// })


getSong("/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry&seed_tracks=0c6xIDDpzE81m2q797ordA")
.then(res => {
  try {
    welcomeSong(res.data.tracks.slice(0, 6), welcomeBlock)
  } catch (error) {
    console.log(error);
  }
})



// появление песен конец

// функционал audio

getSong("/tracks/11dFghVXANMlKmJXsNCbNl")
.then(res => {
  audioLoyal(document.body, res.data)
  audioFunc()
})
// функционал audio конец

// все песни в контейнере
getSong("/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry&seed_tracks=0c6xIDDpzE81m2q797ordA")
.then(res => {
  createSongCont(['Рекомендованные треки'], all_cont, res.data.tracks.slice(0, 9))
  getSong("/me")
.then(resTwo => {
  createSongCont([`Только для тебя, ${resTwo.data.display_name}`], all_cont, res.data.tracks.slice(10, 19))

})
})

getSong('/browse/featured-playlists') 
.then(res => {
  createSongCont([`Рекомендованные плейлисты`], all_cont, res.data.playlists.items.slice(0, 9))
})

getSong('/artists/0TnOYISbd1XYRBk9myaseg/related-artists')
.then(res => {
  createSongCont([`Популярные исполнители`], all_cont, res.data.artists.slice(0, 9))
  createSongCont([`Рекомендованные исполнители`], all_cont, res.data.artists.slice(10, 19))
})

getSong('/browse/new-releases')
.then(res => {
  createSongCont([`Новые релизы`], all_cont, res.data.albums.items.slice(0, 9))
  createSongCont([`Новые альбомы`], all_cont, res.data.albums.items.slice(10, 19))
})

// все песни в контейнере

// footer
setTimeout(() => {
  footer(all_cont)
  }, 1500);
  // footer