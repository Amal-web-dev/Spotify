import { asideLoyal, audioLoyal, headerMain, footer } from "../../modules/loyal";
import { audioFunc } from "../../modules/audio";
import { getSong, likeSong, unLikeSong } from "../../modules/http.request.js";
import { ReloadMediatekaSong, createSongCont, tracks } from "../../modules/function.js";

let aside = document.querySelector('aside')
let main = document.querySelector('main')
asideLoyal(aside)
headerMain(main)

let mediate_song_block = document.querySelector('.mediate_song_block')
let title = document.querySelector('title')
let user_avatar = document.querySelector('.user_avatar')
let user_name = document.querySelector('#user_name')
let open_playlists = document.querySelector('#open_playlists')
let follow_artist = document.querySelector('#follow_artist')
let liked_albums = document.querySelector('#liked_albums')
let user_cont = document.querySelector('.user_cont')
let user_mini_ava = document.querySelector('.user_mini_ava')
let change_cont = document.querySelector('.change_cont')
let back_black = document.querySelector('.back_black')
let change_hidden = document.querySelector('.change_hidden')
let change_name_input = document.querySelector('#change_name_input')
let close_modul_icon = document.querySelector('#close_modul_icon')
let playingSong = []
if(playingSong) {
  playingSong = JSON.parse(localStorage.getItem('playingSong'))
}

change_hidden.onclick = () => {
  change_cont.classList.add('spawn')
  back_black.classList.add('spawn')
}


close_modul_icon.onclick = () => {
  change_cont.classList.remove('spawn')
  back_black.classList.remove('spawn')
}

back_black.onclick = () => {
  change_cont.classList.remove('spawn')
  back_black.classList.remove('spawn')
}

user_name.onclick = () => {
  change_cont.classList.add('spawn')
  back_black.classList.add('spawn')
}

getSong('/me/following?type=artist')
.then(res => {
    follow_artist.innerHTML = res.data.artists.items.length + ' подписки'
    try {
    createSongCont(['Подписки'], user_cont, res.data.artists.items)
    } catch (error) {
      console.log(error);
    }
})

getSong('/me')
.then(res => {
    title.innerHTML = 'Spotify - ' + res.data.display_name
    user_name.innerHTML = res.data.display_name
    change_name_input.value = res.data.display_name
    if(res.data.images) {
        user_avatar.style.backgroundImage = `url(${res.data.images.at(-1).url})`
        user_mini_ava.style.backgroundImage = `url(${res.data.images.at(-1).url})`
    }
})

getSong("/me/tracks")
.then(res => {
  try {
  ReloadMediatekaSong(res.data.items, mediate_song_block)
  } catch (error) {
    console.log(error);
  }
})

getSong("/me/top/tracks")
.then(res => {
  try {
    createSongCont(['Топ треков этого месяца'], user_cont, res.data.items)
  } catch (error) {
    console.log(error);
  }
})

getSong("/me/top/artists")
.then(res => {
  try {
    createSongCont(['Топ артистов этого месяца'], user_cont, res.data.items)
  } catch (error) {
    console.log(error);
  }
})

getSong("/me/albums")
.then(res => {
  try {
    liked_albums.innerHTML = ' • ' + res.data.items.length + ' альбома'
  ReloadMediatekaSong(res.data.items, mediate_song_block)
  } catch (error) {
    console.log(error);
  }
})

getSong(`/me/playlists`)
.then(res => {
  try {
ReloadMediatekaSong(res.data.items, mediate_song_block)
open_playlists.innerHTML = res.data.items.length + ' плейлистов'
createSongCont(['Ваши плейлисты'], user_cont, res.data.items)
  } catch (error) {
    console.log(error);
  }
})



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

setTimeout(() => {
  footer(main)
  }, 1500);