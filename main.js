import axios from 'axios'
import { ReloadMediatekaSong, welcomeSong, createSongCont } from "./modules/function";
import { asideLoyal, audioLoyal, headerMain, footer } from "./modules/loyal";
import { audioFunc } from "./modules/audio";
import { getSong } from "./modules/http.request.js";
import SpotifyWebApi from "spotify-web-api-js";


let main = document.querySelector('main')
let aside = document.querySelector('.aside')
headerMain(main)
asideLoyal(aside)

let mediate_song_block = document.querySelector('.mediate_song_block')
let welcomeBlock = document.querySelector('.welcome-block')
let welcome_h1 = document.querySelector('.welcome_h1')
let all_cont =  document.querySelector('.all_cont')

let currentTime = new Date().getHours();
let allTitle =  ['Твои плейлисты']
let token = location.href.split('access_token=').at(-1)
let playingSong = []
if(playingSong) {
  playingSong = JSON.parse(localStorage.getItem('playingSong'))
}

if(!token && token !== 'http://localhost:5173/pages/unAuth/#' ||  user == 'http://localhost:5173/pages/unAuth/') {
  localStorage.setItem("myId", token);
} 
let playlist = []

getSong("/me/player/recently-played")
    .then(res => {
      welcomeSong(res.data.items.slice(0, 6), welcomeBlock)
      createSongCont([`Недавно прослушенные`], all_cont, res.data.items)
    })
       

getSong("/me/tracks")
.then(res => {
  ReloadMediatekaSong(res.data.items, mediate_song_block)
})

getSong("/me/albums")
.then(res => {
  ReloadMediatekaSong(res.data.items, mediate_song_block)
})
// пишет добрый день
if (currentTime >= 5 && currentTime < 12) {
  welcome_h1.innerHTML = 'Доброе утро';
} else if (currentTime >= 12 && currentTime < 18) {
  welcome_h1.innerHTML = 'Добрый день';
} else {
  welcome_h1.innerHTML = 'Добрый вечер';
}
// пишет добрый день

// функционал audio

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
// функционал audio конец


// появление песен
  getSong(`/me/playlists`)
.then(res => {
  try {
ReloadMediatekaSong(res.data.items, mediate_song_block)
createSongCont(allTitle, all_cont, res.data.items)
  } catch (error) {
    console.log(error);
  }
})

// появление песен конец

// все песни в контейнере
getSong("/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry&seed_tracks=0c6xIDDpzE81m2q797ordA")
.then(res => {
  try {
    createSongCont(['Рекомендованные треки'], all_cont, res.data.tracks)
    
  } catch (error) {
    console.log(error);
  }
})

getSong('/me/top/tracks')
.then(res => {
  getSong("/me")
  .then(resTwo => {
    createSongCont([`Только для тебя, ${resTwo.data.display_name}`], all_cont, res.data.items)
  })
  })

getSong('/browse/featured-playlists') 
.then(res => {
  try {
    createSongCont([`Рекомендованные плейлисты`], all_cont, res.data.playlists.items)
  } catch (error) {
    console.log(error);
  }
})

getSong('/me/top/artists')
.then(res => {
  try {
  createSongCont([`Популярные исполнители`], all_cont, res.data.items)
  } catch (error) {
    console.log(error);
  }
})

getSong('/browse/new-releases')
.then(res => {
  try {
  createSongCont([`Новые релизы`], all_cont, res.data.albums.items)
  } catch (error) {
    console.log(error);
  }
})

// все песни в контейнере

// footer
setTimeout(() => {
  footer(all_cont)
  }, 2500);
  // footer