
let isMuted = false; 
let previousVolume = 1.0;

export function audioFunc() {
let audio = document.getElementById(`audio-1`);

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
let volumeButton = document.querySelector('.volume-button'); 
let volumeDinamic = document.querySelector('.volume-dinamic'); 

setTimeout(() => {
  if(audio.duration) {
    durationDisplay.innerHTML = formatTime(audio.duration)
  } else {
    durationDisplay.innerHTML = '?:??'
  }

}, 100);
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
        audio.volume = previousVolume;
        volumeBtn.style.bottom = '0%';
        volumeDinamic.style.width = audio.volume * 100 + '%';
        isMuted = false;
    } else {
        previousVolume = audio.volume;
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
    volumeButton.addEventListener('click', updateVolumeMute);

    
  
    audio.addEventListener('timeupdate', updateProgress);
  }    