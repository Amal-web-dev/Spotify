import axios from 'axios'
import { ReloadMediatekaSong } from "./modules/function";


let login_a = document.querySelector('.login-a')
const client_id = '48294f2378014a3d9d49e49477694d79';
const REDIRECT_URI = 'http://localhost:5173/';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token'
let token = location.href.split('=').at(-3)
let mediate_song_block = document.querySelector('.mediate_song_block')
const players = document.querySelectorAll('.audio-player');




login_a.href = `${AUTH_ENDPOINT}?client_id=${client_id}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&score=user-library-read`

localStorage.setItem("myId", token);

const myId = localStorage.getItem("myId");




axios.get("https://api.spotify.com/v1/albums?ids=382ObEPsp2rxGrnsizN5TX%2C1A2GTWGtFfWp7KSQTwWOyo%2C2noRn2Aes5aoNVsU6iWThc", {
    headers: {
        Authorization: `Bearer ${myId}`
    }
}).then(res => {
    ReloadMediatekaSong(res.data.albums, mediate_song_block)
})


axios.get("https://api.spotify.com/v1/browse/featured-playlists", {
    headers: {
        Authorization: `Bearer ${myId}`
    }
}).then(res => {
    players.forEach((player, index) => {
        let audio = document.getElementById(`audio-${index + 1}`);
        let playButton = player.querySelector('.play-button');
        let playButtonIcon = player.querySelector('.play-button img');
        let progressBar = player.querySelector('.progress-bar .progress');
        let progressBarOne = document.querySelector('.progress-bar');
        let currentTimeDisplay = player.querySelector('.current-time');
        let durationDisplay = player.querySelector('.duration');
        let secBtn5Plus = player.querySelector('.five-plus-sec');
        let secBtn5Minus = player.querySelector('.five-minus-sec');

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

        function seek(event) {
            let progressRect = progressBarOne.getBoundingClientRect();
            let clickX = event.clientX - progressRect.left;
            let progressWidth = progressRect.width;
            let seekPercentage = (clickX / progressWidth) * 100;
            let seekTime = (audio.duration * seekPercentage) / 100;
            audio.currentTime = seekTime;
        }

        function rewind(seconds) {
            let newTime = Math.max(audio.currentTime - seconds, 0);
            audio.currentTime = newTime;
        }

        function forward(seconds) {
            let newTime = Math.min(audio.currentTime + seconds, audio.duration);
            audio.currentTime = newTime;
        }

        secBtn5Plus.addEventListener('click', () => forward(5));
        secBtn5Minus.addEventListener('click', () => rewind(5));

        durationDisplay.textContent = formatTime(audio.duration);

        playButton.addEventListener('click', togglePlay);
        progressBarOne.addEventListener('click', seek);
        audio.addEventListener('timeupdate', updateProgress);
    });


})


let main = document.querySelector('main')

console.log(main.style.width);
