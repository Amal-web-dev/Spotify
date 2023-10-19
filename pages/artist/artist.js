
import { asideLoyal, audioLoyal, headerMain, footer } from "../../modules/loyal";
import { audioFunc } from "../../modules/audio";
import { getSong, subscribeToArtist, unsubscribeFromArtist } from "../../modules/http.request.js";
import { ReloadMediatekaSong, createSongCont } from "../../modules/function";

let aside = document.querySelector('aside')
let main = document.querySelector('main')
asideLoyal(aside)
headerMain(main)
let mediate_song_block = document.querySelector('.mediate_song_block')
let artistId = location.search.split('=').at(-1)
let title = document.querySelector('title')
let back = document.querySelector('.back')
let type_name = document.querySelector('#type_name')
let users = document.querySelector('#users')
let fan_like = document.querySelector('.fan_like')
let all_song_cont = document.querySelector('.all_song_cont')
let btnCat = document.querySelectorAll('.btn_cat') 
let popular_tracks = document.querySelector('.popular_tracks')
let album_cat = document.querySelector('.album_cat')
let art_friend = document.querySelector('.art_friend')
let submit = document.querySelector('.submit')
let song = document.querySelector('.song')
let isSub = false
let playingSong = []
if(playingSong) {
  playingSong = JSON.parse(localStorage.getItem('playingSong'))
}


getSong(`/me/following/contains?type=artist&ids=${artistId}`)
.then(res => {
  if(res.data[0]) {
    submit.innerHTML = 'Подписка'
    isSub = true
  } else {
    submit.innerHTML = 'Подписаться'
    isSub = false
  }
})

submit.onclick = () => {
  if(!isSub) {
    subscribeToArtist(artistId)
    submit.innerHTML = 'Подписка'
    isSub = true
  } else {
    unsubscribeFromArtist(artistId)
    submit.innerHTML = 'Подписаться'
    isSub = false
  }
}

btnCat.forEach(button => {
  button.addEventListener('click', () => {
    btnCat.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});

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


getSong("/me/tracks")
.then(res => {
  ReloadMediatekaSong(res.data.items, mediate_song_block)
})

getSong("/me/albums")
.then(res => {
  ReloadMediatekaSong(res.data.items, mediate_song_block)
})

popular_tracks.onclick = () => {
  getSong(`/artists/${artistId}/albums`)
.then(alb => {
  all_song_cont.innerHTML = ''
  if(alb.data.items.length > 1) {
    createSongCont([''], all_song_cont, alb.data.items.slice(0, 9))
  }
})
}

art_friend.onclick = () => {
  getSong(`/artists/${artistId}/related-artists`)
  .then(alb => {
    all_song_cont.innerHTML = ''
  if(alb.data.artists.length > 1) {
    createSongCont([``], all_song_cont, alb.data.artists.slice(10, 19))
  }
  })
}

album_cat.onclick = () => {
  getSong(`/artists/${artistId}/albums`)
.then(alb => {
  all_song_cont.innerHTML = ''
  if(alb.data.items.length > 1)  {
    createSongCont([''], all_song_cont, alb.data.items.slice(10, 19))
  }
})
}

getSong(`/artists/${artistId}`)
.then(res => {
    title.innerHTML = res.data.name
    type_name.innerHTML = res.data.name
    users.innerHTML = (res.data.followers.total.toLocaleString('ru-RU')) + ' фанатов'
    if(res.data.images[0]) {
      back.style.backgroundImage = `url(${res.data.images[0].url})` 
    } else {
      back.style.backgroundImage =`url(/public/img/no_img.jpg)`
    }

    getSong(`/artists/${artistId}/related-artists`)
.then(alb => {
  if(alb.data.artists.length > 1) {
    createSongCont([''], all_song_cont, alb.data.artists)
  } else {
    song.innerHTML = ''
  }
})

    getSong(`/artists/${artistId}/related-artists`)
.then(alb => {
  if(alb.data.artists.length > 1) {
    createSongCont(['Поклонникам также нравятся'], fan_like, alb.data.artists)
  }
})

getSong(`/artists/${artistId}/albums`)
.then(alb => {
  if(alb.data.items.length > 1) {
    createSongCont([`Альбомы исполнителя`], fan_like, alb.data.items)
  }
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



setTimeout(() => {
    footer(main)
}, 500);