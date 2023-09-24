import axios from 'axios'
import { asideLoyal, audioLoyal, footer, headerMainSearch } from "../../modules/loyal";
import { categoriesFunc, bestResult, trackResult, createSongCont } from "../../modules/function";
import { audioFunc } from "../../modules/audio";
import { getSong } from "../../modules/http.request.js";
import { ReloadMediatekaSong } from "../../modules/function";

let aside = document.querySelector('aside')
let main = document.querySelector('main')
let searchCont = document.querySelector('.search-cont')
headerMainSearch(main);
asideLoyal(aside);

let token = location.href.split('access_token=').at(-1)
let login_a = document.querySelector('.login-a')
let mediate_song_block = document.querySelector('.mediate_song_block')
let all_categories = document.querySelector('.all_categories')
let input_search = document.querySelector('.input_search')
let input_block = document.querySelector('.input-block')
let best = document.querySelector('.best')
let best_track_result = document.querySelector('.best_track_result')
let albums = document.querySelector('.albums')
let artist = document.querySelector('.artist')
let playlists = document.querySelector('.playlists')
let findCont = document.querySelector('.find-cont')
let noFind = document.querySelector('.no_find')
let profiles = document.querySelector('.profiles')
let searchHistoryString = localStorage.getItem('searchHistory');
let history_cont = document.querySelector('.history_cont')
let playingSong = []
if(playingSong) {
  playingSong = JSON.parse(localStorage.getItem('playingSong'))
}

getSong("/me/tracks")
.then(res => {
  ReloadMediatekaSong(res.data.items, mediate_song_block)
})

getSong("/me/albums")
.then(res => {
  ReloadMediatekaSong(res.data.items, mediate_song_block)
})

if (searchHistoryString) {
  setTimeout(() => {
  let searchHistory = JSON.parse(searchHistoryString);
  createSongCont(['История поиска'], history_cont, searchHistory)
  }, 200);
} else {
 searchHistory = [];
}

getSong('/browse/categories')
  .then(res => {
    categoriesFunc(res.data.categories.items, all_categories)
  })


// loyal
let name_search = document.querySelector('.name_search')
input_search.onkeyup = () => {

  if (input_search.value.length >= 4) {
    searchCont.style.display = 'none'
    findCont.style.display = 'block'
    noFind.style.display = 'none'
    getSong(`/search?q=remaster%2520track%3ADoxy%2520artist%3A${input_search.value}&type=track`)
      .then(res => {
        try {
          if (res.data.tracks.items[0] && res.data.tracks.items.length > 4) {
            bestResult(res.data.tracks.items[0], best)
            trackResult(res.data.tracks.items.slice(0, 4), best_track_result)
          } else {
            findCont.style.display = 'none'
            noFind.style.display = 'block'
            name_search.innerHTML = `«${input_search.value}»`
          }
        } catch (error) {
          console.log(error);
        }
      })

    getSong(`/search?q=remaster%2520track%3ADoxy%2520artist%3A${input_search.value}&type=album`)
      .then(res => {
        albums.innerHTML = ''
        try {
          if (res.data.albums.items.length > 2) {
            createSongCont(['Альбомы'], albums, res.data.albums.items)
          }
        } catch (error) {
          console.log('no');
        }
      })


    getSong(`/search?q=remaster%2520track%3ADoxy%2520artist%3A${input_search.value}&type=artist`)
      .then(res => {
        artist.innerHTML = ''
        try {
          if (res.data.artists.items.length > 2) {
            createSongCont(['Артисты'], artist, res.data.artists.items)
          }
        } catch (error) {
          console.log(no);
        }
      })

    getSong(`/search?q=remaster%2520track%3ADoxy%2520artist%3A${input_search.value}&type=playlist`)
      .then(res => {
        playlists.innerHTML = ''
        try {
          if (res.data.playlists.items.length > 2) {
            createSongCont(['Плейлисты'], artist, res.data.playlists.items)
          }
        } catch (error) {
          console.log('no');
        }
      })

  } else {
    searchCont.style.display = 'block'
    findCont.style.display = 'none'
    noFind.style.display = 'none'
  }

}

function onClear(event) {
  searchCont.style.display = 'block'
  findCont.style.display = 'none'
  noFind.style.display = 'none'
}

input_search.onclick = () => {
  input_search.addEventListener('search', onClear);

  setTimeout(() => input_search.removeEventListener('search', onClear));
};


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
    if(playingSong) {
      audioLoyal(document.body, playingSong)
      audioFunc()
    } else {
      audioLoyal(document.body, res.data)
      audioFunc()
    }
  })

// footer(searchCont)

// loyal


// footer
footer(main);
// footer
