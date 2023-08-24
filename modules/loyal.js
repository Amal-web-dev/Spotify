let favTru = false
import axios from 'axios'
const myId = localStorage.getItem("myId");

export function asideAuth(place) {

  let asideTop = document.createElement('div')
  let asideBottom = document.createElement('div')
  let homeBlock = document.createElement('div')
  let searhBlock = document.createElement('div')
  let mediaTeka = document.createElement('div')
  let leftMedia = document.createElement('div')
  let rightMedia = document.createElement('div')
  let plusBlock = document.createElement('div')
  let arrowblock = document.createElement('div')
  let categoriesBlock = document.createElement('div')
  let homeIcon = document.createElement('img')
  let searchIcon = document.createElement('img')
  let searchIconMain = document.createElement('img')
  let searchIconInput = document.createElement('img')
  let searchIconInputDiv = document.createElement('div')
  let homeSpan = document.createElement('span')
  let searchSpan = document.createElement('span')
  let playListBtn = document.createElement('button')
  let artistsBtn = document.createElement('button')
  let albumsBtn = document.createElement('button')
  let searchMedia = document.createElement('div')
  let searchMediaIcon = document.createElement('img')
  let searchMediaBtn = document.createElement('button')
  let filter_rercent = document.createElement('div')
  let recentSpan = document.createElement('span')
  let arrowBottomIcon = document.createElement('img')
  let mediaIcon = document.createElement('img')
  let plusIcon = document.createElement('img')
  let rightArrow = document.createElement('img')
  let mediate_song_block = document.createElement('div')
  let mediateka_song = document.createElement('div')
  let song_poster = document.createElement('div')
  let media_song_descr = document.createElement('div')
  let songName = document.createElement('p')
  let spanName = document.createElement('span')
  let mediaSpan = document.createElement('span')
  let searchInput = document.createElement('input');


  asideTop.classList.add('aside-top')
  asideBottom.classList.add('aside-bottom')
  homeBlock.classList.add('home-block')
  homeBlock.classList.add('active-main')
  homeBlock.classList.add('hovered_block')
  searhBlock.classList.add('search-block')
  searhBlock.classList.add('hovered_block')
  mediaTeka.classList.add('mediaTeka-block')
  leftMedia.classList.add('left-mediateka')
  rightMedia.classList.add('rightmedia-teka')
  plusBlock.classList.add('plus-block')
  plusBlock.classList.add('hovered_block')
  arrowblock.classList.add('arrow-block')
  arrowblock.classList.add('hovered_block')
  searchMediaBtn.classList.add('hovered')
  categoriesBlock.classList.add('categories-block')
  searchMedia.classList.add('search_mediateka_block')
  filter_rercent.classList.add('filter_recent_block')
  mediate_song_block.classList.add('mediate_song_block')
  mediateka_song.classList.add('mediateka_song')
  song_poster.classList.add('song_poster')
  searchInput.classList.add('search-input');
  media_song_descr.classList.add('media_song_descr')
  searchIconInput.classList.add('search-icon-input')


  homeIcon.src = '/public/icons/home-main.svg'
  searchIcon.src = '/public/icons/search-icon.svg'
  searchIconMain.src = '/public/icons/search-icon.svg'
  searchIconInput.src = '/public/icons/search-icon.svg'
  homeSpan.innerHTML = 'Главная'
  searchSpan.innerHTML = 'Поиск'
  playListBtn.innerHTML = 'Playlists'
  artistsBtn.innerHTML = 'Artists'
  albumsBtn.innerHTML = 'Albums'
  searchMediaIcon.src = '/public/icons/search-icon.svg'
  recentSpan.innerHTML = 'Recents'
  arrowBottomIcon.src = '/public/icons/arrow-bottom.svg'
  songName.innerHTML = 'Liked Songs'
  spanName.innerHTML = 'Плейлист х 47 треков'
  mediaIcon.src = '/public/icons/library_icon.svg'
  mediaSpan.innerHTML = 'Моя медиатека'
  plusIcon.src = '/public/icons/plus-icon.svg'
  rightArrow.src = '/public/icons/right-arrow.svg'
  searchInput.type = 'text';
  searchInput.placeholder = 'Искать в медиатеке';


  place.append(asideTop, asideBottom)
  asideTop.append(homeBlock, searhBlock)
  homeBlock.append(homeIcon, homeSpan)
  searhBlock.append(searchIconMain, searchSpan)
  asideBottom.append(mediaTeka, categoriesBlock, searchMedia, mediate_song_block)
  mediaTeka.append(leftMedia, rightMedia)
  leftMedia.append(mediaIcon, mediaSpan)
  rightMedia.append(plusBlock, arrowblock)
  plusBlock.append(plusIcon)
  arrowblock.append(rightArrow)
  categoriesBlock.append(playListBtn, artistsBtn, albumsBtn)
  searchMedia.append(searchMediaBtn, filter_rercent)
  searchMediaBtn.append(searchIcon)
  filter_rercent.append(recentSpan, arrowBottomIcon)
  mediate_song_block.append(mediaTeka)
  mediaTeka.append(song_poster, media_song_descr)
  media_song_descr.append(songName, spanName)
  searchInput.prepend(searchIconInputDiv)
  searchIconInputDiv.append(searchIconInput)


  searchMediaBtn.onclick = () => {
    searchMediaBtn.classList.remove('hovered')
    searchMedia.prepend(searchInput);
    searchInput.focus();
    setTimeout(() => {
      searchInput.classList.add('show-input');
    }, 10);
  };

  document.addEventListener('click', (event) => {
    if (!searchInput.contains(event.target) && !searchMediaBtn.contains(event.target)) {
      searchInput.classList.remove('show-input');
      searchMediaBtn.classList.add('hovered')
    }
  });

}



export function audioLoyal(place, arr) {
  let audioCont = document.createElement('div')
  let leftAudio = document.createElement('div')
  let centerAudio = document.createElement('div')
  let rightAudio = document.createElement('div')
  let songPoster = document.createElement('div')
  let songName = document.createElement('div')
  let songLike = document.createElement('div')
  let aName = document.createElement('a')
  let songArt = document.createElement('p')
  let likeIcon = document.createElement('img')
  let audioPlayer = document.createElement('div')
  let audioInfo = document.createElement('div')
  let playPause = document.createElement('div')
  let createButton = (iconSrc) => {
    const button = document.createElement('button');
    const icon = document.createElement('img');
    icon.src = iconSrc;
    button.append(icon);
    return button;
  };
  let mixSong = createButton('/public/icons/mix-icon.svg');
  let preSong = createButton('/public/icons/previeus-song.svg');
  let minusSec = createButton('/public/icons/-5sec-icon.svg');
  let playSong = createButton('/public/icons/start-audio.svg');
  let plusSec = createButton('/public/icons/+5sec-icon.svg');
  let nextSong = createButton('/public/icons/next-song.svg');
  let repeatSong = createButton('/public/icons/repeat_icon.svg');
  let audioControls = document.createElement('div');
  let currentTimeSpan = document.createElement('span');
  let progressBarDiv = document.createElement('div');
  let progressDiv = document.createElement('div');
  let progressBtnDiv = document.createElement('div');
  let durationSpan = document.createElement('span');
  let audio = document.createElement('audio');
  let volumeDiv = document.createElement('div');
  let volumeButton = document.createElement('button');
  let volumeIcon = document.createElement('img');
  let volumeSliderDiv = document.createElement('div');
  let volumeDynamicDiv = document.createElement('div');
  let volumeBtnDiv = document.createElement('div');


  audioCont.classList.add('audio-cont')
  leftAudio.classList.add('left_audio')
  centerAudio.classList.add('center-audio')
  rightAudio.classList.add('right_audio')
  songPoster.classList.add('song-poster')
  songName.classList.add('song-name')
  songLike.classList.add('song-like')
  nextSong.classList.add('next-song');
  repeatSong.classList.add('next-song');
  preSong.classList.add('next-song');
  mixSong.classList.add('next-song');
  plusSec.classList.add('five-plus-sec');
  plusSec.classList.add('sec-btn');
  playSong.classList.add('play-button');
  minusSec.classList.add('five-minus-sec');
  minusSec.classList.add('sec-btn');
  audioControls.classList.add('audio-controls');
  durationSpan.classList.add('duration');
  progressBtnDiv.classList.add('progress-btn');
  progressDiv.classList.add('progress');
  progressBarDiv.classList.add('progress-bar');
  currentTimeSpan.classList.add('current-time');
  audio.id = 'audio-1'
  volumeBtnDiv.classList.add('volume-btn');
  volumeBtnDiv.setAttribute('draggable', 'true');
  volumeDynamicDiv.classList.add('volume-dinamic');
  volumeSliderDiv.classList.add('volume-slider');
  volumeIcon.classList.add('volume-icon');
  volumeButton.classList.add('volume-button');
  volumeDiv.classList.add('volume');
  playPause.classList.add('play-pause')
  audioPlayer.classList.add('audio-player')
  audioInfo.classList.add('audio-info')
  axios.get(`https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl`, {
    headers: {
        Authorization: `Bearer ${myId}`
    }
}).then(res => {
  axios.get(`https://api.spotify.com/v1/audio-features/${res.data.id}`, {
    headers: {
        Authorization: `Bearer ${myId}`
    }
}).then(res => {
console.log(res);
})
  
})
  aName.innerHTML = arr.name
  songArt.innerHTML = arr.artists[0].name
  likeIcon.src = '/public/icons/favorite-icon.svg'
  currentTimeSpan.textContent = '0:00';
  audio.src = '/public/img/passion-127011.mp3'
  volumeIcon.src = '/public/icons/volume-up.svg';
  songPoster.style.backgroundImage = `url(${arr.album.images[0].url})`

  audioCont.append(leftAudio, centerAudio, rightAudio);

  leftAudio.append(songPoster, songName, songLike);
  songName.append(aName, songArt);
  songLike.append(likeIcon)

  rightAudio.append(volumeDiv);

  volumeDiv.append(volumeButton, volumeSliderDiv)
  volumeButton.append(volumeIcon)
  volumeSliderDiv.append(volumeDynamicDiv)
  volumeDynamicDiv.append(volumeBtnDiv)

  centerAudio.append(audioPlayer);

  audioPlayer.append(audioInfo, audioControls, audio);

  audioInfo.append(playPause);

  playPause.append(mixSong, preSong, minusSec, playSong, plusSec, nextSong, repeatSong);

  audioControls.append(currentTimeSpan, progressBarDiv, durationSpan);

  progressBarDiv.append(progressDiv);

  progressDiv.append(progressBtnDiv);

  place.append(audioCont);



  songLike.onclick = () => {
    if(!favTru) {
        likeIcon.src = '/public/icons/favorite-full.svg'
        favTru = true
    } else  {
        likeIcon.src = '/public/icons/favorite-icon.svg'
        favTru = false
    }
}
}

