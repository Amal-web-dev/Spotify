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
let playingSong = []
if(playingSong) {
  playingSong = JSON.parse(localStorage.getItem('playingSong'))
}

getSong('/me')
.then(res => {
    title.innerHTML = 'Spotify - ' + res.data.display_name
    user_name.innerHTML = res.data.display_name
    if(res.data.images) {
        user_avatar.style.backgroundImage = `url(${res.data.images.at(-1).url})`
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

getSong("/me/albums")
.then(res => {
  try {
    liked_albums.innerHTML = res.data.items.length + ' альбома'
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
// createSongCont(allTitle, all_cont, res.data.items)
  } catch (error) {
    console.log(error);
  }
})

getSong('/me/following?type=artist')
.then(res => {
    follow_artist.innerHTML = res.data.artists.items.length + ' подписки'
    console.log(res.data.artists.items.length);
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