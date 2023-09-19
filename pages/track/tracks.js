
import { asideLoyal, audioLoyal, headerMain, footer } from "../../modules/loyal";
import { audioFunc } from "../../modules/audio";
import { getSong } from "../../modules/http.request.js";
import { ReloadMediatekaSong, createSongCont, artist, tracks } from "../../modules/function";
import { Logger } from "sass";

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
let duration = document.querySelector('#duration')
let type_name = document.querySelector('#type_name')
let all_tracks_cont = document.querySelector('.all_tracks_cont')
let type = document.querySelector('#type')
let artists_cont = document.querySelector('.artists_cont')
let fan_like = document.querySelector('.fan_like')
let album_poster = document.querySelector('.album_poster')
let from_album_name = document.querySelector('#from_album_name')
let from_album_block = document.querySelector('.from_album_block')
let from_album_tracks = document.querySelector('.from_album_tracks')
let play_btn = document.querySelector('.play_btn')
const myId = localStorage.getItem("myId");

// getSong(`/playlists/${songId}`)
// .then(res  => {
//   console.log(res);
// })

// Инициализация Spotify Web Playback SDK
window.onSpotifyWebPlaybackSDKReady = () => {
  const player = new Spotify.Player({
      name: 'Your App Name',
      getOAuthToken: callback => {
          const token = myId;
          callback(token);
      },
      volume: 0.5
  });

  player.connect().then(success => {
      if (success) {
          console.log('Connected to Spotify Web Playback SDK');
      }
  });

  // Добавляем обработчики событий для элементов управления
  // document.getElementById('login').addEventListener('click', () => {
  //     // Ваш код для аутентификации пользователя
  // });
  const audio = document.querySelector('#audio-1');
  console.log(audio);

  audio.addEventListener('click', () => {
      audio.play();
      console.log('Started playback');
  });

  // document.getElementById('pause').addEventListener('click', () => {
  //     // Ваш код для паузы музыки
  //     const audio = document.getElementById('yourAudioElementId');
  //     audio.pause();
  //     console.log('Paused playback');
  // });

  // document.getElementById('next').addEventListener('click', () => {
  //     // Ваш код для переключения на следующий трек
  // });

  // document.getElementById('prev').addEventListener('click', () => {
  //     // Ваш код для переключения на предыдущий трек
  // });
};

getSong(`/tracks/${songId}`)
  .then(res => {
    console.log(res.data.album);
    title.innerHTML = res.data.name + ' • ' + res.data.type
    h3Name.innerHTML = res.data.name
    type_name.innerHTML = res.data.name
    song_poster.style.backgroundImage = `url(${res.data.album.images[0].url})`
    album_poster.style.backgroundImage = `url(${res.data.album.images[0].url})`
    from_album_name.innerHTML = res.data.album.name
    artist_name.innerHTML = res.data.artists[0].name
    release_date.innerHTML = res.data.album.release_date.slice(0, 4)
    artist(res.data.artists, artists_cont)
    // tracks(res.data, from_album_tracks)

    from_album_block.onclick = () => {
      location.assign(`/pages/${res.data.album.type}/?id=${res.data.album.id}`)
    }
    
    getSong(`/artists/${res.data.artists[0].id}`)
    .then(res => {
      artist_poster.style.backgroundImage = `url(${res.data.images[0].url})`

      getSong(`/artists/${res.data.id}/related-artists`)
    .then(res => {
      if(res.data.artists.length > 1) {
        createSongCont(['Поклонникам также нравятся'] ,fan_like, res.data.artists)
      }
    })

    getSong(`/artists/${res.data.id}/albums`)
    .then(alb => {
      if(alb.data.items.length > 1) {
        createSongCont([`${res.data.name}: Популярные альбомы`] ,fan_like, alb.data.items)
      }
    })
    })

    getSong(`/albums/${res.data.album.id}`)
    .then(albTrack => {
      tracks(albTrack.data.tracks.items, from_album_tracks)
    })

    

    let durationMs = res.data.duration_ms;
    let totalSeconds = Math.floor(durationMs / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    duration.innerHTML = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    getSong(`/albums/${res.data.album.id}`)
      .then(album => {
        // console.log(album);
      })
    localStorage.setItem("songName", res.data.name);
    // getSong(`/audio-analysis/${songId}`)
    // .then(res  =>  {
    //   console.log(res);
    // })
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

  getSong(`/audio-features/${songId}`) 
  .then(res => {
    console.log(res.data);

    getSong(`/audio-analysis/${songId}`)
    .then(analysis => {
      console.log(analysis.data);
    })
  })

  setTimeout(() => {
    footer(main)
    }, 500);