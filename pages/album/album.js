
import { asideLoyal, audioLoyal, headerMain, footer } from "../../modules/loyal";
import { audioFunc } from "../../modules/audio";
import { getSong } from "../../modules/http.request.js";
import { ReloadMediatekaSong, createSongCont } from "../../modules/function";

let aside = document.querySelector('aside')
let main = document.querySelector('main')
asideLoyal(aside)
headerMain(main)
let mediate_song_block = document.querySelector('.mediate_song_block')
let songId = location.search.split('=').at(-1)
let title = document.querySelector('title')
let h3Name = document.querySelector('#songName')
let song_poster = document.querySelector('.song_poster') 
let artist_poster = document.querySelector('.artist_poster') 
let artist_name = document.querySelector('#artist_name') 
let release_date = document.querySelector('#release_date') 
let track_count = document.querySelector('#track_count') 
let duration = document.querySelector('#duration') 
let type_name = document.querySelector('#type_name') 

// getSong(`/playlists/${songId}`)
// .then(res  => {
//   console.log(res);
// })

getSong(`/albums/${songId}`)
.then(res => {
  console.log(res.data);
  title.innerHTML = res.data.name + ' • ' + res.data.type
  h3Name.innerHTML = res.data.name
  type_name.innerHTML = res.data.name
  song_poster.style.backgroundImage = `url(${res.data.images[0].url})`
  let durationMs = 0;

  for (let time of res.data.tracks.items) {
    durationMs += time.duration_ms;
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
  track_count.innerHTML =  res.data.tracks.items.length + ' трек'
  artist_name.innerHTML = res.data.artists[0].name
  release_date.innerHTML = res.data.release_date.slice(0, 4)


  getSong(`/artists/${res.data.artists[0].id}`)
  .then(res => {
    console.log(res.data);
    artist_poster.style.backgroundImage = `url(${res.data.images[0].url})`
  })

})

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