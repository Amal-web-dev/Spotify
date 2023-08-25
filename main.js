import axios from 'axios'
import { ReloadMediatekaSong, welcomeSong, createSongCont } from "./modules/function";
import { asideAuth, audioLoyal, headerMain } from "./modules/loyal";
import { audioFunc } from "./modules/audio";

let main = document.querySelector('main')

headerMain(main)

let token = location.href.split('access_token=').at(-1)
let login_a = document.querySelector('.login-a')
localStorage.setItem("myId", token);
let aside = document.querySelector('.aside')
asideAuth(aside)
let mediate_song_block = document.querySelector('.mediate_song_block')
let welcomeBlock = document.querySelector('.welcome-block')
let welcome_h1 = document.querySelector('.welcome_h1')
let all_cont =  document.querySelector('.all_cont')
let headerMainBlock = document.querySelector('.header-main')
let log_out = document.querySelector('.log-out')

let currentTime = new Date().getHours();
let allTitle =  ['Твои лучшие миксы', 'Только для тебя', 'Недавно прослушано', 'Выпуски для тебя', 'Популярные радиостанции', 'Discover picks for you', '#SpotifyWrarpped', 'Сегодняшние хиты', 'Похоже на:MRL', 'Похожее на недавно прослушиваемое', 'Рекомендованные исполнители', 'Персональные подборки', 'Тренировка', 'Популярные альбомы', 'Новые  релизы для тебя', 'Послушай сегодня', 'Похоже на:',  'Похоже на:DTF', 'Только новинки']
const myId = localStorage.getItem("myId");

log_out.onclick = () => {
  localStorage.setItem("myId", '');
  location.assign('/pages/unAuth/')
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
main.onscroll = () => {
  if (main.scrollTop >= 100) {
    headerMainBlock.style.backgroundColor = '#1C0E40';
  } else {
    headerMainBlock.style.backgroundColor = '#1C0E4020'; 
  }
};
// header-main становитья не прозрачным

// появление песен
axios.get("https://api.spotify.com/v1/albums?ids=382ObEPsp2rxGrnsizN5TX%2C1A2GTWGtFfWp7KSQTwWOyo%2C2noRn2Aes5aoNVsU6iWThc", {
    headers: {
        Authorization: `Bearer ${myId}`
    }
}).then(res => {
  setTimeout(() => {
    welcomeSong(res.data.albums, welcomeBlock)
  }, 0);
})


axios.get("https://api.spotify.com/v1/me", {
    headers: {
        Authorization: `Bearer ${myId}`
    }
}).then(res => {
  axios.get(`https://api.spotify.com/v1/users/${res.data.id}/playlists`, {
    headers: {
        Authorization: `Bearer ${myId}`
    }
}).then(res => {
  setTimeout(() => {
ReloadMediatekaSong(res.data.items, mediate_song_block)
  createSongCont(allTitle, all_cont, res.data.items.slice(0, 9))
  }, 0);
})
})


// появление песен конец

// функционал audio

axios.get("https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl", {
    headers: {
        Authorization: `Bearer ${myId}`
    }
}).then(res => {
  audioLoyal(document.body, res.data)
  audioFunc()
})

  
// функционал audio конец

// добавление любимой песни

// добавление любимой песни конец
