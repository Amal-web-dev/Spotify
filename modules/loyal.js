import { getSong } from "../modules/http.request.js";

let userBul = false
let main = document.querySelector('main')
let favTru = false

export function asideLoyal(place) {
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
  let cancelBlock = document.createElement('div')
  let cancelImg = document.createElement('img')


  asideTop.classList.add('aside-top')
  asideBottom.classList.add('aside-bottom')
  homeBlock.classList.add('home-block')
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
  cancelBlock.classList.add('cancel-block')


  if (location.href.includes('http://localhost:5173/#access') || location.href == 'http://localhost:5173/') {
    homeIcon.src = '/public/icons/home_icon_active.svg'
    searchIconMain.src = '/public/icons/search-icon.svg'
    homeBlock.classList.add('active-main')
  } else if (location.href.includes('http://localhost:5173/') && location.href == 'http://localhost:5173/pages/search/') {
    searchIconMain.src = '/public/icons/search_icon_active.svg'
    searhBlock.classList.add('active-main')
    homeIcon.src = '/public/icons/home-main.svg'
  } else {
    homeIcon.src = '/public/icons/home-main.svg'
    searchIconMain.src = '/public/icons/search-icon.svg'
  }
  searchIcon.src = '/public/icons/search-icon.svg'
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
  cancelImg.src = '/public/icons/close_icon.svg'


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
  categoriesBlock.append(cancelBlock, playListBtn, artistsBtn, albumsBtn)
  searchMedia.append(searchMediaBtn, filter_rercent)
  searchMediaBtn.append(searchIcon)
  filter_rercent.append(recentSpan, arrowBottomIcon)
  media_song_descr.append(songName, spanName)
  searchInput.prepend(searchIconInputDiv)
  searchIconInputDiv.append(searchIconInput)
  cancelBlock.append(cancelImg)


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


  homeBlock.onclick = () => {
    location.assign('/');
  }
  searhBlock.onclick = () => {
    location.assign('/pages/search/');
  }

  //   getSong("/me")
  // .then(res => {

  //   // getSong(`/users/${res.data.id}`)
  //   getSong(`/users/${res.data.id}/following?type=artist`)
  // .then(res => {
  //   try {
  //     console.log(res);
  // // ReloadMediatekaSong(res.data.items, mediate_song_block)
  // // createSongCont(allTitle, all_cont, res.data.items.slice(0, 9))
  //   } catch (error) {
  //     console.log(error);
  //   }
  // })
  // })


  artistsBtn.onclick = () => {
    playListBtn.style.display = 'none'
    albumsBtn.style.display = 'none'
    playListBtn.classList.remove('btn_active')
    albumsBtn.classList.remove('btn_active')
    artistsBtn.classList.add('btn_active')
    cancelBlock.style.display = 'flex'
  }

  playListBtn.onclick = () => {
    artistsBtn.style.display = 'none'
    albumsBtn.style.display = 'none'
    artistsBtn.classList.remove('btn_active')
    albumsBtn.classList.remove('btn_active')
    playListBtn.classList.add('btn_active')
    cancelBlock.style.display = 'flex'
  }

  albumsBtn.onclick = () => {
    artistsBtn.style.display = 'none'
    playListBtn.style.display = 'none'
    artistsBtn.classList.remove('btn_active')
    playListBtn.classList.remove('btn_active')
    albumsBtn.classList.add('btn_active')
    cancelBlock.style.display = 'flex'
  }

  cancelBlock.onclick = () => {
    artistsBtn.style.display = 'block'
    playListBtn.style.display = 'block'
    albumsBtn.style.display = 'block'
    cancelBlock.style.display = 'none'
    artistsBtn.classList.remove('btn_active')
    playListBtn.classList.remove('btn_active')
    albumsBtn.classList.remove('btn_active')
  }
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
  volumeDynamicDiv.classList.add('volume-dinamic');
  volumeSliderDiv.classList.add('volume-slider');
  volumeIcon.classList.add('volume-icon');
  volumeButton.classList.add('volume-button');
  volumeDiv.classList.add('volume');
  playPause.classList.add('play-pause')
  audioPlayer.classList.add('audio-player')
  audioInfo.classList.add('audio-info')

  aName.innerHTML = arr.name.slice(0, 10)
  songArt.innerHTML = arr.artists[0].name
  likeIcon.src = '/public/icons/favorite-icon.svg'
  currentTimeSpan.textContent = '0:00';
  audio.src = '/public/img/Automotivo Infernal 1.0.mp3'
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
    if (!favTru) {
      likeIcon.src = '/public/icons/favorite-full.svg'
      favTru = true
    } else {
      likeIcon.src = '/public/icons/favorite-icon.svg'
      favTru = false
    }
  }
}

export function headerMain(place) {
  let headerMain = document.createElement('div')
  let headerLeft = document.createElement('div')
  let headerRight = document.createElement('div')
  let btnLeft = document.createElement('button')
  let btnRight = document.createElement('button')
  let iconLeft = document.createElement('img')
  let iconRight = document.createElement('img')
  let aPremium = document.createElement('a')
  let btnPremium = document.createElement('button')
  let btnDownload = document.createElement('button')
  let iconDownload = document.createElement('img')
  let userBtn = document.createElement('button')
  let userIcon = document.createElement('img')
  let userSetting = document.createElement('div')
  let aAcc = document.createElement('a')
  let aPremiumUpgrade = document.createElement('a')
  let aLog_out = document.createElement('a')
  let acc = document.createElement('div')
  let profile = document.createElement('div')
  let goPremium = document.createElement('div')
  let settings = document.createElement('div')
  let log_out = document.createElement('div')
  let accP = document.createElement('p')
  let profileP = document.createElement('p')
  let goPremiumP = document.createElement('p')
  let settingsP = document.createElement('p')
  let log_outP = document.createElement('p')
  let linkIconTwo = document.createElement('img')
  let linkIcon = document.createElement('img')


  headerMain.classList.add('header-main')
  headerLeft.classList.add('header-left')
  headerRight.classList.add('header-right')
  btnPremium.classList.add('btn-premium')
  btnDownload.classList.add('download-app')
  userBtn.classList.add('user-btn')
  userSetting.classList.add('user-setting-block')
  acc.classList.add('p-block')
  profile.classList.add('p-block')
  goPremium.classList.add('p-block')
  settings.classList.add('p-block')
  log_out.classList.add('p-block')
  log_out.classList.add('log-out')
  btnLeft.classList.add('btn_left')
  btnRight.classList.add('btn_right')


  btnPremium.innerHTML = 'Узнать больше о Premium'
  aPremium.href = 'https://www.spotify.com/uz/premium/?utm_source=app&utm_medium=desktop&utm_campaign=upgrade&ref=web_loggedin_upgrade_button'
  iconLeft.src = '/public/icons/arrow-left.svg'
  iconRight.src = '/public/icons/arrow-right.svg'
  iconDownload.src = '/public/icons/download-icon.svg'
  btnDownload.innerHTML = 'Установить приложение'
  userIcon.src = '/public/icons/user.svg'
  aAcc.href = 'https://www.spotify.com/uz/account/overview/?utm_source=spotify&utm_medium=menu&utm_campaign=your_account'
  aPremiumUpgrade.href = 'https://www.spotify.com/uz/premium/?ref=web_loggedin_upgrade_menu'
  accP.innerHTML = 'Аккаунт'
  goPremiumP.innerHTML = 'Переход на Premium'
  profileP.innerHTML = 'Профиль'
  settingsP.innerHTML = 'Настройки'
  log_outP.innerHTML = 'Выйти'
  linkIconTwo.src = '/public/icons/link-icon.svg'
  linkIcon.src = '/public/icons/link-icon.svg'

  place.prepend(headerMain)

  headerMain.append(headerLeft, headerRight)

  headerLeft.append(btnLeft, btnRight)
  btnLeft.append(iconLeft)
  btnRight.append(iconRight)

  headerRight.append(aPremium, btnDownload, userBtn, userSetting)
  aPremium.append(btnPremium)
  btnDownload.prepend(iconDownload)
  userBtn.append(userIcon)

  userSetting.append(aAcc, profile, aPremiumUpgrade, settings, aLog_out)
  aAcc.append(acc)
  aPremiumUpgrade.append(goPremium)
  aLog_out.append(log_out)
  acc.append(accP, linkIcon)
  goPremium.append(goPremiumP, linkIconTwo)
  profile.append(profileP)
  settings.append(settingsP)
  log_out.append(log_outP)

  if (location.href.includes('album') || location.href.includes('playlist') || location.href.includes('track') || location.href.includes('artist')) {
    let btnPlay = document.createElement('button')
    let h3Name = document.createElement('h3')
    let btnImg = document.createElement('img')


    if(!location.href.includes('track') || !location.href.includes('artist')) {
      let tableBlock = document.createElement('div')
      let leftSide = document.createElement('div');
      let rightSide = document.createElement('div');
      let numberHeader = document.createElement('p');
      let nameHeader = document.createElement('p');
      let durationImage = document.createElement('img');

      tableBlock.classList.add('tracks_table');
      tableBlock.classList.add('header_table')
      leftSide.classList.add('left_side');
      rightSide.classList.add('right_side');

      
    numberHeader.textContent = '#';
    nameHeader.textContent = 'Название';
    durationImage.src = '/public/icons/duration_time.svg';
    tableBlock.style.display = 'none'

    leftSide.append(numberHeader, nameHeader);

    rightSide.append(durationImage);

    tableBlock.append(leftSide, rightSide);

    headerMain.append(tableBlock)


    main.onscroll = () => {
      if(location.href.includes('playlist')) {
        if(!location.href.includes('track') || !location.href.includes('artist')) {
          if (main.scrollTop >= 410) {
            tableBlock.style.display = 'flex'
          } else {
            tableBlock.style.display = 'none'
          }
        }
       

        if (main.scrollTop >= 365) {
          btnPlay.style.opacity = '1'
          h3Name.style.opacity = '1'
        } else {
          btnPlay.style.opacity = '0'
          h3Name.style.opacity = '0'
        }
      } else {
        if(!location.href.includes('artist')) {
          if(!location.href.includes('track')) {
            if (main.scrollTop >= 360) {
              tableBlock.style.display = 'flex'
            } else {
              tableBlock.style.display = 'none'
            }
          }
          
        }


        if (main.scrollTop >= 310) {
          btnPlay.style.opacity = '1'
          h3Name.style.opacity = '1'
        } else {
          btnPlay.style.opacity = '0'
          h3Name.style.opacity = '0'
        }
      }

      if (main.scrollTop >= 100) {
        headerMain.style.backgroundColor = '#121212';
      } else {
      if(location.href.includes('track')) {
        headerMain.style.backgroundColor = '#121212';
      } else {
        headerMain.style.backgroundColor = '#12121200';
      }
      }
    }
    }


    let btnPlayFalse = false
    btnPlay.style.opacity = '0'
    h3Name.style.opacity = '0'

    h3Name.innerHTML = name
    h3Name.id = 'songName'
    btnImg.src = '/public/icons/start-audio.svg'

    btnPlay.classList.add('btn_play')

    headerLeft.append(btnPlay, h3Name)
    btnPlay.append(btnImg)

    
    if(location.href.includes('track')) {
      headerMain.style.backgroundColor = '#121212';
    }
    btnPlay.onclick = () => {

      if (!btnPlayFalse) {
        btnImg.src = '/public/icons/pause-audio.svg'
        btnPlayFalse = true
      } else {
        btnImg.src = '/public/icons/start-audio.svg'
        btnPlayFalse = false
      }
    }
  }

  userBtn.onclick = () => {
    if (!userBul) {
      userSetting.classList.add('user-setting-active')
      userBul = true
      userIcon.src = '/public/icons/user-full.svg'
    } else {
      userSetting.classList.remove('user-setting-active')
      userBul = false
      userIcon.src = '/public/icons/user.svg'
    }
  }

  log_out.onclick = () => {
    localStorage.setItem("myId", '');
    location.assign('/pages/unAuth/')
  }

  btnLeft.onclick = () => {
    try {
      window.history.back();
    } catch (e) {
      btnLeft.style.backgroundColor = '#05050550';
    }
  }

  btnRight.onclick = () => {
    try {
      window.history.forward();
    } catch (e) {
      btnRight.style.backgroundColor = '#05050550';
    }
  }
  
  if(!window.navigation.canGoForward) {
    btnRight.style.backgroundColor = '#05050550';

  btnRight.onmouseenter = () => {
    btnRight.style.cursor = 'not-allowed';
  };
  }

  if(!window.navigation.canGoBack) {
    btnLeft.style.backgroundColor = '#05050550';

    btnLeft.onmouseenter = () => {
      btnLeft.style.cursor = 'not-allowed';
    };
  }

}

export function headerMainSearch(place) {
  let headerMain = document.createElement('div')
  let headerLeft = document.createElement('div')
  let headerRight = document.createElement('div')
  let btnLeft = document.createElement('button')
  let btnRight = document.createElement('button')
  let iconLeft = document.createElement('img')
  let iconRight = document.createElement('img')
  let btnDownload = document.createElement('button')
  let iconDownload = document.createElement('img')
  let userBtn = document.createElement('button')
  let userIcon = document.createElement('img')
  let userSetting = document.createElement('div')
  let aAcc = document.createElement('a')
  let aPremiumUpgrade = document.createElement('a')
  let aLog_out = document.createElement('a')
  let acc = document.createElement('div')
  let profile = document.createElement('div')
  let goPremium = document.createElement('div')
  let settings = document.createElement('div')
  let log_out = document.createElement('div')
  let accP = document.createElement('p')
  let profileP = document.createElement('p')
  let goPremiumP = document.createElement('p')
  let settingsP = document.createElement('p')
  let log_outP = document.createElement('p')
  let linkIconTwo = document.createElement('img')
  let linkIcon = document.createElement('img')
  let inputSearch = document.createElement('input')
  let inputBlock = document.createElement('div')
  let searchIcon = document.createElement('img')


  headerMain.classList.add('header-main')
  headerLeft.classList.add('header-left')
  headerRight.classList.add('header-right')
  btnDownload.classList.add('download-app')
  userBtn.classList.add('user-btn')
  userSetting.classList.add('user-setting-block')
  acc.classList.add('p-block')
  profile.classList.add('p-block')
  goPremium.classList.add('p-block')
  settings.classList.add('p-block')
  log_out.classList.add('p-block')
  log_out.classList.add('log-out')
  inputSearch.classList.add('input_search')
  inputBlock.classList.add('input-block')


  searchIcon.src = '/public/icons/search-icon.svg'
  iconLeft.src = '/public/icons/arrow-left.svg'
  iconRight.src = '/public/icons/arrow-right.svg'
  iconDownload.src = '/public/icons/download-icon.svg'
  btnDownload.innerHTML = 'Установить приложение'
  userIcon.src = '/public/icons/user.svg'
  aAcc.href = 'https://www.spotify.com/uz/account/overview/?utm_source=spotify&utm_medium=menu&utm_campaign=your_account'
  aPremiumUpgrade.href = 'https://www.spotify.com/uz/premium/?ref=web_loggedin_upgrade_menu'
  accP.innerHTML = 'Аккаунт'
  goPremiumP.innerHTML = 'Переход на Premium'
  profileP.innerHTML = 'Профиль'
  settingsP.innerHTML = 'Настройки'
  log_outP.innerHTML = 'Выйти'
  linkIconTwo.src = '/public/icons/link-icon.svg'
  linkIcon.src = '/public/icons/link-icon.svg'
  inputSearch.placeholder = 'Что хочешь послушать?'
  inputSearch.type = 'search'

  place.prepend(headerMain)

  headerMain.append(headerLeft, headerRight)

  headerLeft.append(btnLeft, btnRight, inputBlock)
  btnLeft.append(iconLeft)
  btnRight.append(iconRight)
  inputBlock.append(inputSearch, searchIcon)

  headerRight.append(btnDownload, userBtn, userSetting)
  btnDownload.prepend(iconDownload)
  userBtn.append(userIcon)

  userSetting.append(aAcc, profile, aPremiumUpgrade, settings, aLog_out)
  aAcc.append(acc)
  aPremiumUpgrade.append(goPremium)
  aLog_out.append(log_out)
  acc.append(accP, linkIcon)
  goPremium.append(goPremiumP, linkIconTwo)
  profile.append(profileP)
  settings.append(settingsP)
  log_out.append(log_outP)

  userBtn.onclick = () => {
    if (!userBul) {
      userSetting.classList.add('user-setting-active')
      userBul = true
      userIcon.src = '/public/icons/user-full.svg'
    } else {
      userSetting.classList.remove('user-setting-active')
      userBul = false
      userIcon.src = '/public/icons/user.svg'
    }
  }

  log_out.onclick = () => {
    localStorage.setItem("myId", '');
    location.assign('/pages/unAuth/')
  }



  document.addEventListener('click', (event) => {
    if (!event.target.classList.contains('search_active')) {
      inputBlock.classList.remove('search_active');
    }
  });

  inputSearch.onfocus = () => {
    inputBlock.classList.add('search_active');
    inputSearch.classList.add('search_active');
  }

  main.onscroll = () => {
    if (main.scrollTop >= 100) {
      headerMain.style.backgroundColor = '#121212';
    } else {
      headerMain.style.backgroundColor = '#12121220';
    }
  };

}

export function footer(place) {
  let mainBottomDiv = document.createElement('div');
  let mainLinkTopDiv = document.createElement('div');
  let mainLinksDiv = document.createElement('div');
  let companyLinksDiv = document.createElement('div');
  let companyLinksTitle = document.createElement('h4');
  let communityLinksTitle = document.createElement('h4');
  let communityLinksDiv = document.createElement('div');
  let helpfulLinksTitle = document.createElement('h4');
  let helpfulLinksDiv = document.createElement('div');
  let networkBlockDiv = document.createElement('div');
  let instagramBtn = document.createElement('button');
  let instagramIcon = document.createElement('img');
  let twitterBtn = document.createElement('button');
  let twitterIcon = document.createElement('img');
  let facebookBtn = document.createElement('button');
  let facebookIcon = document.createElement('img');
  let hrElement = document.createElement('hr');
  let mainLinkBottomDiv = document.createElement('div');
  let mainLinkBottomLeftDiv = document.createElement('div');
  let mainLinkBottomRightDiv = document.createElement('div');
  let copyRightParagraph = document.createElement('p');

  mainLinksDiv.classList.add('main-links');
  companyLinksDiv.classList.add('company-links');
  mainLinkTopDiv.classList.add('main-link-top');
  mainBottomDiv.classList.add('main-bottom');
  communityLinksDiv.classList.add('community-links');
  helpfulLinksDiv.classList.add('helpful-links');
  networkBlockDiv.classList.add('network_block');
  mainLinkBottomDiv.classList.add('main-link-bottom');
  mainLinkBottomRightDiv.classList.add('main-link-bottom-right');
  mainLinkBottomLeftDiv.classList.add('main-link-bottom-left');

  companyLinksTitle.innerHTML = 'Компания';
  communityLinksTitle.innerHTML = 'Сообщества';
  helpfulLinksTitle.innerHTML = 'Полезные ссылки';
  instagramIcon.src = '/public/icons/instagram.svg';
  facebookIcon.src = '/public/icons/facebook.svg';
  twitterIcon.src = '/public/icons/twitter.svg';
  copyRightParagraph.textContent = '© 2023 Spotify AB';


  let aboutLink = document.createElement('a');
  aboutLink.innerHTML = 'О нас';
  aboutLink.href = 'https://www.spotify.com/uz/about-us/contact/';

  let vacanciesLink = document.createElement('a');
  vacanciesLink.innerHTML = 'Вакансии';
  vacanciesLink.href = 'https://www.lifeatspotify.com/';

  let forTheRecordLink = document.createElement('a');
  forTheRecordLink.innerHTML = 'For the Record';
  forTheRecordLink.href = 'https://newsroom.spotify.com/';


  let performerLink = document.createElement('a');
  performerLink.innerHTML = 'Для исполнителей';
  performerLink.href = 'https://artists.spotify.com/ru/home';

  let developersLink = document.createElement('a');
  developersLink.innerHTML = 'Для разработчиков';
  developersLink.href = 'https://developer.spotify.com/';

  let advertisingLink = document.createElement('a');
  advertisingLink.innerHTML = 'Реклама';
  advertisingLink.href = 'https://ads.spotify.com/en-US/';

  let investorsLink = document.createElement('a');
  investorsLink.innerHTML = 'Для инвесторов';
  investorsLink.href = 'https://investors.spotify.com/home/default.aspx';

  let vendorsLink = document.createElement('a');
  vendorsLink.innerHTML = 'Для вендоров';
  vendorsLink.href = 'https://spotifyforvendors.com/';

  let helpLink = document.createElement('a');
  helpLink.innerHTML = 'Справка';
  helpLink.href = 'https://support.spotify.com/uz/';

  let mobileAppLink = document.createElement('a');
  mobileAppLink.innerHTML = 'Бесплатное мобильное приложение';
  mobileAppLink.href = 'https://www.spotify.com/uz/free/';

  if (location.href !== 'http://localhost:5173/pages/unAuth/#' && location.href !== 'http://localhost:5173/pages/unAuth/') {
    let legalInfoLink = document.createElement('a');
    legalInfoLink.innerHTML = 'Юридическая информация';
    legalInfoLink.href = 'https://www.spotify.com/uz/legal/end-user-agreement/';

    let privacyCenterLink = document.createElement('a');
    privacyCenterLink.innerHTML = 'Центр конфиденциальности';
    privacyCenterLink.href = 'https://www.spotify.com/uz/privacy';

    let privacyPolicyLink = document.createElement('a');
    privacyPolicyLink.innerHTML = 'Политика конфиденциальности';
    privacyPolicyLink.href = 'https://www.spotify.com/uz/legal/privacy-policy/';

    let cookieFilesLink = document.createElement('a');
    cookieFilesLink.innerHTML = 'Файлы сookie';
    cookieFilesLink.href = 'https://www.spotify.com/uz/legal/cookies-policy/';

    let aboutAdvertisingLink = document.createElement('a');
    aboutAdvertisingLink.innerHTML = 'О рекламе';
    aboutAdvertisingLink.href = 'https://www.spotify.com/uz/legal/privacy-policy/#s3';

    let specialFeaturesLink = document.createElement('a');
    specialFeaturesLink.innerHTML = 'Специальные возможности';
    specialFeaturesLink.href = 'https://www.spotify.com/uz/accessibility';

    mainLinkBottomLeftDiv.append(legalInfoLink, privacyCenterLink, privacyPolicyLink, cookieFilesLink, aboutAdvertisingLink, specialFeaturesLink);

  }



  place.append(mainBottomDiv)

  companyLinksDiv.append(companyLinksTitle, aboutLink, vacanciesLink, forTheRecordLink);

  communityLinksDiv.append(communityLinksTitle, performerLink, developersLink, advertisingLink, investorsLink, vendorsLink);

  helpfulLinksDiv.append(helpfulLinksTitle, helpLink, mobileAppLink);

  mainLinksDiv.append(companyLinksDiv, communityLinksDiv, helpfulLinksDiv);

  networkBlockDiv.append(instagramBtn, twitterBtn, facebookBtn);

  mainLinkTopDiv.append(mainLinksDiv, networkBlockDiv);


  mainLinkBottomDiv.append(mainLinkBottomLeftDiv, mainLinkBottomRightDiv);

  mainBottomDiv.append(mainLinkTopDiv, hrElement, mainLinkBottomDiv);

  mainLinkBottomRightDiv.append(copyRightParagraph);

  facebookBtn.append(facebookIcon);
  twitterBtn.append(twitterIcon);
  instagramBtn.append(instagramIcon);

}