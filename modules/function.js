import axios from 'axios'



export function ReloadMediatekaSong(arr, place) {
    place.innerHTML = ''

    for (const media of arr) {
        let mediateka_song = document.createElement('div')
        let song_poster = document.createElement('div')
        let media_song_descr = document.createElement('div')
        let p = document.createElement('p')
        let span = document.createElement('span')

        mediateka_song.classList.add('mediateka_song')
        song_poster.classList.add('song_poster')
        media_song_descr.classList.add('media_song_descr')

        p.innerHTML = media.name
        span.innerHTML = media.album_type + " x " + media.artists[0].name
        song_poster.style.backgroundImage =  `url(${media.images[0].url})`

        place.append(mediateka_song)
        mediateka_song.append(song_poster, media_song_descr)
        media_song_descr.append(p,  span)


    }
}

