import axios from 'axios'
import { putSong } from "../modules/http.request.js";
let favB = false
let hidB = true



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

        if (media.artists) {
            span.innerHTML = media.album_type + " x " + media.artists[0].name
        } else {
            span.innerHTML = media.type + " • " + media.owner.display_name
        }
        song_poster.style.backgroundImage = `url(${media.images[0].url})`

        place.append(mediateka_song)
        mediateka_song.append(song_poster, media_song_descr)
        media_song_descr.append(p, span)


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

        if (song.name.length >= 25) {
            song_p.innerHTML = song.name.slice(0, 25) + '...'
        } else {
            song_p.innerHTML = song.name
        }
        if (song.images) {
            song_poster.style.backgroundImage = `url(${song.images[0].url})`
        } else if (song.album.images) {
            song_poster.style.backgroundImage = `url(${song.album.images[0].url})`
        }
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

        if (info.length >= 9) {
            let pAll = document.createElement('p')

            pAll.innerHTML = 'Показать все'

            song_top.append(pAll)
        }

        for (const song of info) {
            let song_block = document.createElement('div')
            let song_poster = document.createElement('div')
            let song_description = document.createElement('div')
            let pNameSong = document.createElement('p')
            let pPlayer = document.createElement('span')
            let button = document.createElement('button')
            let buttonImg = document.createElement('img')

            song_block.onclick  = () => {
                location.assign(`/pages/${song.type}/?id=${song.id}`)
                console.log(song);
            }

            song_block.classList.add('song_block')
            song_poster.classList.add('song_poster')
            song_description.classList.add('song_description')

            if (song.name.length >= 15) {
                pNameSong.innerHTML = song.name.slice(0, 15) + '...'
            } else {
                pNameSong.innerHTML = song.name
            }
            if (song.description) {
                pPlayer.innerHTML = song.description.slice(0, 49)
            } else if (song.artists) {
                let artistNames = "";

                for (let index = 0; index < song.artists.length; index++) {
                    if (index !== 0) {
                        artistNames += ", ";
                    }
                    artistNames += song.artists[index].name
                }

                if (artistNames.length >= 70) {
                    pPlayer.innerHTML = artistNames.slice(0, 70) + '...';
                } else {
                    pPlayer.innerHTML = artistNames;
                }
            } else {
                pPlayer.innerHTML = song.type
            }
            buttonImg.src = '/public/icons/start-audio.svg'

            if (song && song.images && song.images.length !== 0) {
                song_poster.style.backgroundImage = `url(${song.images[0].url})`;
              } else if (song && song.album && song.album.images && song.album.images.length !== 0) {
                song_poster.style.backgroundImage = `url(${song.album.images[0].url})`;
              } else {
                song_poster.style.backgroundImage = `url(/public/img/no_img.jpg)`;
              }

            if (song.type == 'artist' || song.type == 'исполнитель') {
                song_poster.style.borderRadius = '100%'
            }

            button.append(buttonImg)
            song_bottom.append(song_block)
            song_block.append(song_poster, song_description)
            song_description.append(pNameSong, pPlayer)
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

export function categoriesFunc(arr, place) {
    place.innerHTML = ''

    for (const categ of arr) {
        let categories_block = document.createElement('div')
        let categName = document.createElement('p')

        categories_block.classList.add('categories_block')

        categName.innerHTML = categ.name
        categories_block.style.backgroundImage = `url(${categ.icons[0].url})`



        place.append(categories_block)
        categories_block.append(categName)
    }
}



export function bestResult(arr, place) {
    place.innerHTML = ''

    let bestResultBlock = document.createElement('div');
    let heading = document.createElement('h3');
    let bestResult = document.createElement('div');
    let resultPoster = document.createElement('div');
    let resultTitle = document.createElement('h2');
    let artistBlock = document.createElement('div');
    let artistSpan = document.createElement('span');
    let type = document.createElement('div');
    let typeParagraph = document.createElement('p');
    let playButton = document.createElement('button');
    let playButtonImage = document.createElement('img');

    bestResultBlock.classList.add('best_result_block');
    bestResult.classList.add('best_result');
    resultPoster.classList.add('result_poster');
    artistBlock.classList.add('artist_block');
    type.classList.add('type');
    playButton.classList.add('play_btn');

    heading.innerHTML = 'Лучший результат';
    if (arr.name.length >= 20) {
        resultTitle.innerHTML = arr.name.slice(0, 20) + '...';
    } else {
        resultTitle.innerHTML = arr.name
    }
    artistSpan.innerHTML = arr.artists[0].name;
    typeParagraph.innerHTML = arr.type;
    playButtonImage.src = '/public/icons/start-audio.svg';
    resultPoster.style.backgroundImage = `url(${arr.album.images[0].url})`


    bestResult.append(resultPoster, resultTitle, artistBlock);
    artistBlock.append(artistSpan, type);
    type.append(typeParagraph);
    bestResult.append(playButton);
    playButton.append(playButtonImage);

    bestResultBlock.append(heading, bestResult);

    place.append(bestResultBlock);
}

export function trackResult(arr, place) {
    place.innerHTML = ''

    for (const track of arr) {
        const trackResult = document.createElement('div');
        const aboutTrack = document.createElement('div');
        const trackPoster = document.createElement('div');
        const trackPosterImage = document.createElement('img');
        const nameTrack = document.createElement('div');
        const trackName1 = document.createElement('p');
        const trackName2 = document.createElement('span');
        const timeTrack = document.createElement('div');
        const timeTrackImage = document.createElement('img');
        const timeTrackSpan = document.createElement('span');

        aboutTrack.classList.add('about_track');
        trackResult.classList.add('track_result');
        trackPoster.classList.add('track_poster');
        timeTrack.classList.add('time_track');
        nameTrack.classList.add('name_track');

        function millisecondsToMinutesAndSeconds(duration_ms) {
            const minutes = Math.floor(duration_ms / 60000);
            const seconds = ((duration_ms % 60000) / 1000).toFixed(0);
            return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
          }

        trackPosterImage.src = '/public/icons/start-audio.svg';
        trackName1.innerHTML = track.name.slice(0, 20)  +  '...';
        trackName2.innerHTML = track.artists[0].name;
        timeTrackImage.src = '/public/icons/favorite-icon.svg';
        timeTrackSpan.innerHTML = millisecondsToMinutesAndSeconds(track.duration_ms);
        trackPoster.style.backgroundImage = `url(${track.album.images[0].url})`

        trackResult.append(aboutTrack, timeTrack);
        aboutTrack.append(trackPoster, nameTrack);
        trackPoster.append(trackPosterImage);
        nameTrack.append(trackName1, trackName2);
        timeTrack.append(timeTrackImage, timeTrackSpan);

        place.append(trackResult);
    }
}

export function tracks(arr, place) {
    place.innerHTML = ''

    for (let track of arr) {
let trackBlock = document.createElement('div');
let leftTrackSide = document.createElement('div');
let hiddenIconBtn = document.createElement('button');
let hiddenIconImg = document.createElement('img');
let trackNumber = document.createElement('span');
let trackName = document.createElement('div');
let trackNameText = document.createElement('p');
let trackNameSpan = document.createElement('span');
let rightTrackSide = document.createElement('div');
let favoriteIcon = document.createElement('img');
let timeDur = document.createElement('p');
let dotsIcon = document.createElement('img');

trackBlock.classList.add('track_block');
leftTrackSide.classList.add('left_track_side');
hiddenIconBtn.classList.add('hidden_icon');
trackName.classList.add('track_name');
favoriteIcon.classList.add('favorite-icon');
rightTrackSide.classList.add('right_track_side');
dotsIcon.classList.add('dots_icon');

trackNumber.id = 'track_number';
hiddenIconImg.src =  '/public/icons/start-audio.svg';
trackNameText.innerHTML = track.name;
timeDur.id = 'time_dur';
trackNameSpan.innerHTML = track.artists[0].name;
if(track.artists[1]) {
    trackNameSpan.innerHTML += ', ' + track.artists[1].name
} else if(track.artists[2]) {
    trackNameSpan.innerHTML += ', ' + track.artists[2].name
}
const durationMs = track.duration_ms; 
const totalSeconds = Math.floor(durationMs / 1000);
const minutes = Math.floor(totalSeconds / 60);
const seconds = totalSeconds % 60;
timeDur.innerHTML = `${minutes}:${seconds.toString().padStart(2, '0')}`;

trackNumber.innerHTML = track.track_number;
if(track.track_number > 9) {
    trackBlock.style.padding = '0 10px'
} else if(track.track_number > 99)  {
    trackBlock.style.padding = '0 5px'
}
favoriteIcon.src = '/public/icons/favorite-icon.svg';
dotsIcon.src = '/public/icons/dots_icon.svg';

hiddenIconBtn.append(hiddenIconImg);

trackName.append(trackNameText, trackNameSpan);

leftTrackSide.append(hiddenIconBtn,trackNumber, trackName);

rightTrackSide.append(favoriteIcon, timeDur, dotsIcon);

trackBlock.append(leftTrackSide, rightTrackSide);

place.append(trackBlock);

hiddenIconImg.onclick = () => {

    if(hidB) {
        hiddenIconImg.src = '/public/icons/pause-audio.svg'
        hidB = false
    }  else  {
        hiddenIconImg.src = '/public/icons/start-audio.svg'
        hidB = true
    }
}

favoriteIcon.onclick = () =>  {

    if(!favB) {
       favoriteIcon.src = '/public/icons/favorite-full.svg'
       favB = true
    } else {
        favoriteIcon.src = '/public/icons/favorite-icon.svg';
        favB = false
    }

    // putSong(`/me/tracks?ids=${track.id}`)
}

    }
}
let n = 1

export function tracksPlaylist(arr, place) {
    place.innerHTML = ''

    for (let track of arr) {
let trackBlock = document.createElement('div');
let leftTrackSide = document.createElement('div');
let hiddenIconBtn = document.createElement('button');
let hiddenIconImg = document.createElement('img');
let trackNumber = document.createElement('span');
let trackName = document.createElement('div');
let trackNameText = document.createElement('p');
let trackNameSpan = document.createElement('span');
let rightTrackSide = document.createElement('div');
let favoriteIcon = document.createElement('img');
let timeDur = document.createElement('p');
let dotsIcon = document.createElement('img');
let albumDiv = document.createElement('div');
let lastAddDiv = document.createElement('div');
let lastAddP = document.createElement('p');
let albumP = document.createElement('p');


trackBlock.classList.add('track_block');
leftTrackSide.classList.add('left_track_side');
hiddenIconBtn.classList.add('hidden_icon');
trackName.classList.add('track_name');
favoriteIcon.classList.add('favorite-icon');
rightTrackSide.classList.add('right_track_side');
dotsIcon.classList.add('dots_icon');

trackNumber.id = 'track_number';
hiddenIconImg.src =  '/public/icons/start-audio.svg';
trackNameText.innerHTML = track.track.name;
timeDur.id = 'time_dur';
albumP.innerHTML = 'afde'
console.log(track);
lastAddP.innerHTML =  'sdasdd'
trackNameSpan.innerHTML = track.track.artists[0].name;
if(track.track.artists[1]) {
    trackNameSpan.innerHTML += ', ' + track.track.artists[1].name
} else if(track.track.artists[2]) {
    trackNameSpan.innerHTML += ', ' + track.track.artists[2].name
} 
const durationMs = track.duration_ms; 
const totalSeconds = Math.floor(durationMs / 1000);
const minutes = Math.floor(totalSeconds / 60);
const seconds = totalSeconds % 60;
timeDur.innerHTML = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  trackNumber.innerHTML = n;
if(track.track_number > 9) {
    trackBlock.style.padding = '0 10px'
} else if(track.track_number > 99)  {
    trackBlock.style.padding = '0 5px'
}
favoriteIcon.src = '/public/icons/favorite-icon.svg';
dotsIcon.src = '/public/icons/dots_icon.svg';

hiddenIconBtn.append(hiddenIconImg);

trackName.append(trackNameText, trackNameSpan);

leftTrackSide.append(hiddenIconBtn,trackNumber, trackName);

rightTrackSide.append(favoriteIcon, timeDur, dotsIcon);

trackBlock.append(leftTrackSide, albumDiv, lastAddDiv, rightTrackSide);

albumDiv.append(albumP)
lastAddDiv.append(lastAddP)

place.append(trackBlock);
n++

hiddenIconImg.onclick = () => {

    if(hidB) {
        hiddenIconImg.src = '/public/icons/pause-audio.svg'
        hidB = false
    }  else  {
        hiddenIconImg.src = '/public/icons/start-audio.svg'
        hidB = true
    }
}

favoriteIcon.onclick = () =>  {

    if(!favB) {
       favoriteIcon.src = '/public/icons/favorite-full.svg'
       favB = true
    } else {
        favoriteIcon.src = '/public/icons/favorite-icon.svg';
        favB = false
    }

    // putSong(`/me/tracks?ids=${track.id}`)

}

    }
}