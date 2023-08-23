import axios from 'axios'
import { ReloadMediatekaSong, welcomeSong, createSongCont } from "./modules/function";
import { asideAuth, audioLoyal } from "./modules/loyal";
import { audioFunc } from "./modules/audio";

let token = location.href.split('access_token=').at(-1)
let login_a = document.querySelector('.login-a')
localStorage.setItem("myId", token);
let aside = document.querySelector('.aside')

asideAuth(aside)
let mediate_song_block = document.querySelector('.mediate_song_block')
let favouriteIcon = document.querySelector('.favorite')
let headerMain = document.querySelector('.header-main')
let main = document.querySelector('main')
let welcomeBlock = document.querySelector('.welcome-block')
let welcome_h1 = document.querySelector('.welcome_h1')
let all_cont =  document.querySelector('.all_cont')
let downloadApp = document.querySelector('.download-app')
// let client_id = '48294f2378014a3d9d49e49477694d79';
// let REDIRECT_URI = 'http://localhost:5173/';
// let AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
// let RESPONSE_TYPE = 'token'
  downloadApp.onclick = () => {
    location.assign('/pages/search/');
  };
let currentTime = new Date().getHours();
let allTitle =  ['Твои лучшие миксы', 'Только для тебя', 'Недавно прослушано', 'Выпуски для тебя', 'Популярные радиостанции', 'Discover picks for you', '#SpotifyWrarpped', 'Сегодняшние хиты', 'Похоже на:MRL', 'Похожее на недавно прослушиваемое', 'Рекомендованные исполнители', 'Персональные подборки', 'Тренировка', 'Популярные альбомы', 'Новые  релизы для тебя', 'Послушай сегодня', 'Похоже на:',  'Похоже на:DTF', 'Только новинки']
const myId = localStorage.getItem("myId");
login_a.href = `${import.meta.env.AUTH_ENDPOINT}?client_id=${import.meta.env.client_id}&redirect_uri=${import.meta.env.REDIRECT_URI}&response_type=${import.meta.env.RESPONSE_TYPE}&score=user-library-read`

// login_a.href = `${AUTH_ENDPOINT}?client_id=${client_id}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&score=user-library-read`

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
      headerMain.style.backgroundColor = '#1C0E40';
  } else {
      headerMain.style.backgroundColor = '#1C0E4020'; 
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
console.log(myId);
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
  createSongCont(allTitle, all_cont, res.data.items)
  }, 0);
})
})


// появление песен конец

// функционал audio
audioLoyal(document.body)

audioFunc()
  
// функционал audio конец

// добавление любимой песни

// добавление любимой песни конец
