import axios from 'axios'
import { asideLoyal, audioLoyal, footer, headerMainSearch } from "../../modules/loyal";
import { createSongCont } from "../../modules/function";
import { getDetails } from "../../modules/http.request.js";
import { audioFunc } from "../../modules/audio";
import { getSong } from "../../modules/http.request.js";
import { ReloadMediatekaSong } from "../../modules/function";

let aside = document.querySelector('aside')
let main = document.querySelector('main')
headerMainSearch(main)
asideLoyal(aside)

let token = location.href.split('access_token=').at(-1)
let login_a = document.querySelector('.login-a')
let mediate_song_block = document.querySelector('.mediate_song_block')

getSong('/recommendations/available-genre-seeds?language=ru-RU')
.then(res => {
    console.log(res.data);
})
// loyal

getSong("/me")
.then(res => {

  getSong(`/users/${res.data.id}/playlists`)
.then(res => {
  try {
        ReloadMediatekaSong(res.data.items, mediate_song_block)        
  } catch (error) {
    console.log(error);
  }
})
})

getSong("/tracks/11dFghVXANMlKmJXsNCbNl")
.then(res => {
  audioLoyal(document.body, res.data)
  audioFunc()
})


// loyal