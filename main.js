import axios from 'axios'
import { ReloadMediatekaSong, welcomeSong, createSongCont } from "./modules/function";

let token = location.href.split('access_token=').at(-1)
let login_a = document.querySelector('.login-a')
localStorage.setItem("myId", token);
const client_id = '48294f2378014a3d9d49e49477694d79';
const REDIRECT_URI = 'http://localhost:5173/';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token'
let mediate_song_block = document.querySelector('.mediate_song_block')
const players = document.querySelectorAll('.audio-player');
let playButton = document.querySelector('.play-button');
let playButtonIcon = document.querySelector('.play-button img');
let progressBar = document.querySelector('.progress-bar .progress');
let progressBarOne = document.querySelector('.progress-bar');
let currentTimeDisplay = document.querySelector('.current-time');
let durationDisplay = document.querySelector('.duration');
let secBtn5Plus = document.querySelector('.five-plus-sec');
let secBtn5Minus = document.querySelector('.five-minus-sec');
let volumeSlider = document.querySelector('.volume-slider');
let volumeIcon = document.querySelector('.volume-icon')
let volumeBtn = document.querySelector('.volume-btn'); 
let volumeDinamic = document.querySelector('.volume-dinamic'); 
let favouriteIcon = document.querySelector('.favorite')
let headerMain = document.querySelector('.header-main')
let main = document.querySelector('main')
let  welcomeBlock = document.querySelector('.welcome-block')
let welcome_h1 = document.querySelector('.welcome_h1')
let all_cont =  document.querySelector('.all_cont')
let downloadApp = document.querySelector('.download-app')

  downloadApp.onclick = () => {
    location.assign('/pages/searchPage');
  };
let currentTime = new Date().getHours();
let allTitle =  ['Твои лучшие миксы', 'Только для тебя', 'Недавно прослушано', 'Выпуски для тебя', 'Популярные радиостанции', 'Discover picks for you', '#SpotifyWrarpped', 'Сегодняшние хиты', 'Похоже на:MRL', 'Похожее на недавно прослушиваемое', 'Рекомендованные исполнители', 'Персональные подборки', 'Тренировка', 'Популярные альбомы', 'Новые  релизы для тебя', 'Послушай сегодня', 'Похоже на:',  'Похоже на:DTF', 'Только новинки']
const myId = localStorage.getItem("myId");
let favTru = false
let isMuted = false; 
login_a.href = `${AUTH_ENDPOINT}?client_id=${client_id}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&score=user-library-read`

if(myId) {
  console.log(token);
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
    ReloadMediatekaSong(res.data.albums, mediate_song_block)
    welcomeSong(res.data.albums, welcomeBlock)
    createSongCont(allTitle, all_cont, res.data.albums)
})

// появление песен конец
// функционал audio
    players.forEach((player, index) => {
        let audio = document.getElementById(`audio-${index + 1}`);
        function formatTime(seconds) {
          let minutes = Math.floor(seconds / 60);
          let remainingSeconds = Math.floor(seconds % 60);
          return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        }
      
        function updateProgress() {
          let progress = (audio.currentTime / audio.duration) * 100;
          progressBar.style.width = `${progress}%`;
          currentTimeDisplay.textContent = formatTime(audio.currentTime);
      
          if (audio.currentTime >= audio.duration) {
            playButtonIcon.src = '/public/icons/start-audio.svg';
          }
        }
      
        function togglePlay() {
          if (audio.paused) {
            audio.play();
            playButtonIcon.src = '/public/icons/pause-audio.svg';
          } else {
            audio.pause();
            playButtonIcon.src = '/public/icons/start-audio.svg';
          }
        }
      
        progressBarOne.onclick = () => {
            let progressRect = progressBarOne.getBoundingClientRect();
            let clickX = event.clientX - progressRect.left;
            let progressWidth = progressRect.width;
            let seekPercentage = (clickX / progressWidth) * 100;
            let seekTime = (audio.duration * seekPercentage) / 100;
            audio.currentTime = seekTime;
        }

        playButton.onclick = () => {
            togglePlay()
        }
      
        function rewind(seconds) {
          let newTime = Math.max(audio.currentTime - seconds, 0);
          audio.currentTime = newTime;
        }
      
        function forward(seconds) {
          let newTime = Math.min(audio.currentTime + seconds, audio.duration);
          audio.currentTime = newTime;
        }
      
        function updateVolume(event) {
            let volumePercentage = event.layerX / 100
            volumePercentage = Math.max(0, Math.min(1, volumePercentage));
            
            audio.volume = volumePercentage;
            volumeBtn.style.bottom = `${volumePercentage * 100}%`;
            volumeDinamic.style.width = `${volumePercentage * 100}%`; 

            if(volumePercentage == 0) {
              volumeIcon.src = '/public/icons/volume-mute.svg'
            }else if(volumePercentage >= 0.3) {
                volumeIcon.src = '/public/icons/volume-up.svg'
            } else if(volumePercentage >= 0.01) {
                volumeIcon.src = '/public/icons/volume-low.svg'
            }
        }

        function updateVolumeMute() {
            if (isMuted) {
                audio.volume = 1; 
                volumeBtn.style.bottom = '0%'; 
                volumeDinamic.style.width = '100%'; 
                isMuted = false; 
            } else {
                audio.volume = 0; 
                volumeBtn.style.bottom = '100%';
                volumeDinamic.style.width = '0%'; 
                isMuted = true; 
            }
        
            if (isMuted) {
                volumeIcon.src = '/public/icons/volume-mute.svg';
            } else {
                volumeIcon.src = '/public/icons/volume-up.svg';
            }
        }
      
        secBtn5Plus.addEventListener('click', () => forward(5));
        secBtn5Minus.addEventListener('click', () => rewind(5));
      
        volumeSlider.addEventListener('click', updateVolume);
        volumeIcon.addEventListener('click', updateVolumeMute);
      
        if(audio.duration) {
          durationDisplay.innerHTML = formatTime(audio.duration);
        } else {
          durationDisplay.innerHTML = '0:00';
        }
      
        audio.addEventListener('timeupdate', updateProgress);
      });
      
// функционал audio конец

// добавление любимой песни
favouriteIcon.onclick = () => {
    if(!favTru) {
        favouriteIcon.src = '/public/icons/favorite-full.svg'
        favTru = true
    } else  {
        favouriteIcon.src = '/public/icons/favorite-icon.svg'
        favTru = false
    }
}
// добавление любимой песни конец