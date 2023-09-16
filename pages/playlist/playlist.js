
import { asideLoyal, audioLoyal, headerMain, footer } from "../../modules/loyal";
import { audioFunc } from "../../modules/audio";
import { getSong } from "../../modules/http.request.js";
import { ReloadMediatekaSong, createSongCont, tracksPlaylist } from "../../modules/function";

let aside = document.querySelector('aside')
let main = document.querySelector('main')
asideLoyal(aside)
headerMain(main)
let mediate_song_block = document.querySelector('.mediate_song_block')
let songId = location.search.split('=').at(-1)
let title = document.querySelector('title')
let back = document.querySelector('.back')
let type_name = document.querySelector('#type_name') 
let artist_name = document.querySelector('#artist_name') 
let artist_poster = document.querySelector('.artist_poster') 
let all_tracks_cont = document.querySelector('.all_tracks_cont')
let playlist_descr = document.querySelector('.playlist_descr')
let like_info = document.querySelector('#like_info')
let track_count = document.querySelector('#track_count')
let duration = document.querySelector('#duration')
let h3Name = document.querySelector('#songName')


getSong("/tracks/11dFghVXANMlKmJXsNCbNl")
.then(res => {
  audioLoyal(document.body, res.data)
  audioFunc()
})

getSong(`/playlists/${songId}`)
.then(res  => {
  console.log(res.data);
  tracksPlaylist(res.data.tracks.items, all_tracks_cont)
  title.innerHTML = res.data.name + ' • ' + res.data.type
  back.style.backgroundImage = `url(${res.data.images[0].url})`
  h3Name.innerHTML = res.data.name
  type_name.innerHTML = res.data.name
  artist_name.innerHTML = res.data.owner.display_name
  playlist_descr.innerHTML = res.data.description
  like_info.innerHTML = res.data.followers.total.toLocaleString('ru-RU') + ' лайк'
  track_count.innerHTML = res.data.tracks.items.length + ' треков'

  let durationMs = 0
  for (let time of res.data.tracks.items) {
    durationMs += time.track.duration_ms;
  }
  
let totalSeconds = durationMs / 1000;
let totalMinutes = Math.floor(totalSeconds / 60);
let hours = Math.floor(totalMinutes / 60); 
let minutes = totalMinutes % 60; 
let seconds = Math.floor(totalSeconds % 60);
  
  let formattedTime = "";
  
  if (hours > 0) {
    formattedTime += `${hours} ч. `;
  } else {
    formattedTime += `${minutes} мин. `;
    formattedTime += `${seconds} сек.`;
  }
  
  if (minutes > 0) {
    if(hours > 0)  {
        formattedTime += `${minutes} мин. `;
    }
  }

  duration.innerHTML = formattedTime

  if(res.data.artist) {
    getSong(`/artists/${res.data.artists[0].id}`)
    .then(res => {
      artist_poster.style.backgroundImage = `url(${res.data.images[0].url})`
    })
  } else {
    artist_poster.style.backgroundImage = `url('/public/icons/spotify-icon.png')`
  }
})

// getSong(`/tracks/${songId}`)
// .then(res => {

// //   getSong(`/audio-analysis/${songId}`)
// //   .then(res  =>  {
// //     console.log(res);
// //   })
// })

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

// getSong("/tracks/11dFghVXANMlKmJXsNCbNl")
// .then(res => {
//   audioLoyal(document.body, res.data)
//   audioFunc()
// })

setTimeout(() => {
  footer(main)
  }, 500);