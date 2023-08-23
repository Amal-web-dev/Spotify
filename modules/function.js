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
        
        if(media.artists) {
            span.innerHTML = media.album_type + " x " + media.artists[0].name
        } else  {
            span.innerHTML = media.type + " • " + media.owner.display_name
        }
        song_poster.style.backgroundImage =  `url(${media.images[0].url})`

        place.append(mediateka_song)
        mediateka_song.append(song_poster, media_song_descr)
        media_song_descr.append(p,  span)


    }
}

export function welcomeSong(arr, place) {
    place.innerHTML = ''

    for (const song of arr) {
        let welcome_song_block = document.createElement('div')
        let song_poster = document.createElement('div')
        let song_name = document.createElement('div')
        let song_button = document.createElement('button')
        let song_p = document.createElement('p')
        let buttonImg = document.createElement('img')

        welcome_song_block.classList.add('welcome_song_block')
        song_poster.classList.add('song_poster')
        song_name.classList.add('song_name')

        song_p.innerHTML = song.name
        song_poster.style.backgroundImage =  `url(${song.images[0].url})`
        buttonImg.src = '/public/icons/start-audio.svg'

        place.append(welcome_song_block)
        welcome_song_block.append(song_poster, song_name, song_button)
        song_name.append(song_p)
        song_button.append(buttonImg)
        
    }
    
}

export function createSongCont(arr, place, info) {

    for (const item of arr) {
        let song_cont = document.createElement('div')
        let song_top = document.createElement('div')
        let song_bottom = document.createElement('div')
        let h1Title = document.createElement('h1')

        if(info.length <= 9) {
            let pAll = document.createElement('p')

        pAll.innerHTML = 'Показать все'

        song_top.append(pAll)
        }

        for (const song of info) {
            let song_block = document.createElement('div')
            let song_poster = document.createElement('div')
            let song_description = document.createElement('div')
            let pNameSong = document.createElement('p')
            let pPLayer = document.createElement('span')
            let button = document.createElement('button')
            let buttonImg = document.createElement('img')

            
        song_block.classList.add('song_block')
        song_poster.classList.add('song_poster')
        song_description.classList.add('song_description')
            
        if(song.name.length >= 15) {
            pNameSong.innerHTML = song.name.slice(0, 15) + '...'
        } else {
            pNameSong.innerHTML = song.name
        }
        pPLayer.innerHTML =  'amal, asdnahsd, ashd'
        buttonImg.src = '/public/icons/start-audio.svg'
        song_poster.style.backgroundImage =  `url(${song.images[0].url})`

        
        button.append(buttonImg)
        song_bottom.append(song_block)
        song_block.append(song_poster, song_description)
        song_description.append(pNameSong, pPLayer)
        song_poster.append(button)
        }

        h1Title.innerHTML = item

        song_cont.classList.add('song_cont')
        song_top.classList.add('song_top')
        song_bottom.classList.add('song_bottom')


        song_top.prepend(h1Title)
        place.append(song_cont)
        song_cont.append(song_top, song_bottom)
        
        
    }
}