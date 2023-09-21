import { Logger } from "sass";
import { getSong, putSong } from "../modules/http.request.js";
let favB = false
let hidB = true
let n = 1
let artistSpans = []
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
let cancel = false
let playingSong = JSON.parse(localStorage.getItem('playingSong'));
let nextS = 1
let preS = nextS - 1
let isPlay = true
let currentSong = null

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
        if(media.images[0]) {
            song_poster.style.backgroundImage = `url(${media.images[0].url})`
        } else {
            song_poster.style.backgroundImage = `url(/public/img/no_img.jpg)`;
        }

        place.append(mediateka_song)
        mediateka_song.append(song_poster, media_song_descr)
        media_song_descr.append(p, span)

        mediateka_song.onclick = () => {
            location.assign(`/pages/${media.type}/?id=${media.id}`)
        }

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

        welcome_song_block.onclick = () => {
            location.assign(`/pages/${song.type}/?id=${song.id}`)
        }


        song_button.onclick = () => {
            event.stopPropagation();
            audioPlayFunc(song, buttonImg)
        }
    }



}

export function createSongCont(arr, place, info) {

    if(arr == 'История поиска') {
        cancel = true
    }

    for (const item of arr) {
        let song_cont = document.createElement('div')
        let song_top = document.createElement('div')
        let song_bottom = document.createElement('div')
        let h1Title = document.createElement('h1')

        if (info.length >= 9) {
            if (!location.href.includes('search') || cancel == true) {
                if (!location.href.includes('allSong')) {
                    let pAll = document.createElement('p')

                    pAll.innerHTML = 'Показать все'

                    song_top.append(pAll)

                    pAll.onclick = () => {
                        localStorage.setItem('seeAll', JSON.stringify(info))
                        localStorage.setItem('title', JSON.stringify(h1Title.innerHTML))
                        location.assign(`/pages/allSong/`)
                    }

                    h1Title.onclick = () => {
                        localStorage.setItem('seeAll', JSON.stringify(info))
                        localStorage.setItem('title', JSON.stringify(h1Title.innerHTML))
                        location.assign(`/pages/allSong/`)
                    }

                }
            }

        }


        if (location.href.includes('allSong')) {
            createSongs(info, song_bottom)
        } else {
            createSongs(info.slice(0, 9), song_bottom)
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

export function formatMillisecondsToTime(duration_ms) {
    const minutes = Math.floor(duration_ms / 60000); 
    const seconds = ((duration_ms % 60000) / 1000).toFixed(0); 

    return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
}

function audioSongNames(song) {
    localStorage.setItem('playingSong', JSON.stringify(song));
    let audio = document.querySelector('#audio-1')
    let playImg = document.querySelector('.play-button img')
    let songName = document.querySelector('.song-name a')
    let artistName = document.querySelector('.song-name p')
    let songDur = document.querySelector('.duration')
    let songPost = document.querySelector('.song-poster')

    audio.src = song.preview_url
    playImg.src = '/public/icons/pause-audio.svg'
    audio.play()
    songName.innerHTML = song.name.slice(0, 10)
    artistName.innerHTML = song.artists[0].name
    songDur.innerHTML = formatMillisecondsToTime(song.duration_ms)
    if(song.album) {
        songPost.style.backgroundImage = `url(${song.album.images[0].url})`
    } else {
        getSong(`/artists/${song.artists[0].id}`)
        .then(res => {
        songPost.style.backgroundImage = `url(${res.data.images[0].url})`
        })
    }
}

function audioPlayPlaylistsFunc(song, hiddenIconImg, pSongName) {
    let nextSong = document.querySelector('#next-song img')
    let preSong = document.querySelector('#pre-song img')
    let audio = document.querySelector('#audio-1')
    let playButtonIcon = document.querySelector('.play-button img');

    event.stopPropagation();
    if(isPlay || currentSong !== song) {
        if(currentSong !== song) {
            currentSong = song;
            hiddenIconImg.src = '/public/icons/pause-audio.svg'
            playButtonIcon.src = '/public/icons/pause-audio.svg'
            pSongName.style.color = '#1ED760';
            if(song.preview_url) {
                audioSongNames(song)
                preSong.style.opacity = '0.5'
                nextSong.style.opacity = '0.5'
            } else if(song.type == 'artist') {
                getSong(`/artists/${song.id}/albums`)
                .then(res => {
                    getSong(`/albums/${res.data.items[0].id}/tracks`)
                    .then(res2 => {
                        audioSongsMany(res2.data.items)
                    })
                })
            } else if (song.type == 'playlist') {
                getSong(`/playlists/${song.id}/tracks`)
                .then(res => {
                    audioSongsMany(res.data.items)
                })
            } else if (song.type == 'album') {
                getSong(`/albums/${song.id}/tracks`)
                .then(res => {
                    audioSongsMany(res.data.items)
                })
            }
        } else {
            audio.play()
            hiddenIconImg.src = '/public/icons/pause-audio.svg'
            playButtonIcon.src = '/public/icons/pause-audio.svg'
            pSongName.style.color = '#1ED760';
        }
      

        isPlay = false
    } else {
        audio.pause()
        hiddenIconImg.src = '/public/icons/start-audio.svg'
        playButtonIcon.src = '/public/icons/start-audio.svg'
        isPlay = true
    }
}

function preSongFunc(song) {
    let preSong = document.querySelector('#pre-song img')
    let nextSong = document.querySelector('#next-song img')
    preSong.onclick = () => {
        if(nextS > 1) {
            nextS--
            preS = nextS - 1
            preSong.style.opacity = '1'
            nextSong.style.opacity = '1'
            if(song[0].track) {
                localStorage.setItem('playingSong', JSON.stringify(song[preS].track));
            } else {
                localStorage.setItem('playingSong', JSON.stringify(song[preS]));
            }
            if (song[0].track) {
                while (preS >= 0 && song[preS].track.preview_url === null) {
                    nextS--
                    preS = nextS - 1
                }
            } else {
                while (preS >= 0 && song[preS].preview_url === null) {
                    nextS--
                    preS = nextS - 1
                }
            }
            if(nextS < song.length ) {
                if(song[nextS].track) {
                    audioSongNames(song[preS].track)
                } else {
                    audioSongNames(song[preS])
                }
            } 
        } else {
            preSong.style.opacity = '0.5'
        }
    }
}

function nextSongFunc(song) {
    let preSong = document.querySelector('#pre-song img')
    let nextSong = document.querySelector('#next-song img')
    nextSong.onclick = () => {
        if(song[0].type == 'track') {
            while ((nextS < song.length && song[nextS].preview_url === null)) {
                nextS++;
            }
        } else {
            while ((nextS < song.length && song[nextS].track.preview_url === null)) {
                nextS++;
            }
        }

        if(song[nextS].track && nextS < song.length) {
            localStorage.setItem('playingSong', JSON.stringify(song[nextS].track));
        } else {
            localStorage.setItem('playingSong', JSON.stringify(song[nextS]));
        }
        
        if(nextS < song.length) {
            if(song[nextS].track) {
                audioSongNames(song[nextS].track)
            } else  {
                audioSongNames(song[nextS])
            }
            preSong.style.opacity = '1'
            nextSong.style.opacity = '1'
            nextS++
            preS = nextS - 1
        } else {
           nextSong.style.opacity = '0.5'
        }
    }
}

function audioPlayFunc(song, buttonImg) {
    event.stopPropagation();
    let nextSong = document.querySelector('#next-song img')
    let preSong = document.querySelector('#pre-song img')
    let audio = document.querySelector('#audio-1')
    let playButtonIcon = document.querySelector('.play-button img');  

    let allButtonImg = document.querySelectorAll('#play_img_all')
    let allSongName = document.querySelectorAll('#all_song_name')

    allButtonImg.forEach(icon => {
        icon.src = '/public/icons/start-audio.svg'
    })

    allSongName.forEach(p => {
        p.style.color = 'white'
    })
    if(isPlay || currentSong !== song) {
        if(currentSong !== song) {
            currentSong = song
            buttonImg.src = '/public/icons/pause-audio.svg'
            playButtonIcon.src = '/public/icons/pause-audio.svg'
            if(song.preview_url) {
                audioSongNames(song)
                preSong.style.opacity = '0.5'
                nextSong.style.opacity = '0.5'
            } else if(song.type == 'artist') {
                getSong(`/artists/${song.id}/albums`)
                .then(res => {
                    getSong(`/albums/${res.data.items[0].id}/tracks`)
                    .then(res2 => {
                        audioSongsMany(res2.data.items)
                    })
                })
            } else if (song.type == 'playlist') {
                getSong(`/playlists/${song.id}/tracks`)
                .then(res => {
                    audioSongsMany(res.data.items)
                })
            } else if (song.type == 'album') {
                getSong(`/albums/${song.id}/tracks`)
                .then(res => {
                    audioSongsMany(res.data.items)
                })
            }
        } else {
            audio.play()
            buttonImg.src = '/public/icons/pause-audio.svg'
            playButtonIcon.src = '/public/icons/pause-audio.svg'
        }
      

        isPlay = false
    } else {
        audio.pause()
        buttonImg.src = '/public/icons/start-audio.svg'
        playButtonIcon.src = '/public/icons/start-audio.svg'
        isPlay = true
    }
}

function audioSongsMany(song) {
    if(song[0].track) {
        localStorage.setItem('playingSong', JSON.stringify(song[0].track));
    } else {
        localStorage.setItem('playingSong', JSON.stringify(song[0]));
    }
    let audio = document.querySelector('#audio-1')
    let playImg = document.querySelector('.play-button img')
    let songName = document.querySelector('.song-name a')
    let artistName = document.querySelector('.song-name p')
    let songDur = document.querySelector('.duration')
    let songPost = document.querySelector('.song-poster')
    let nextSong = document.querySelector('#next-song img')
    let preSong = document.querySelector('#pre-song img')
    preSong.style.opacity = '1'
    nextSong.style.opacity = '1'

    if(song[0].preview_url || song[0].track.preview_url) {
        audio.src = song[0].preview_url ? song[0].preview_url : song[0].track.preview_url
    } else {
        return
    }
    playImg.src = '/public/icons/pause-audio.svg'
    audio.play()
    songName.innerHTML = (song[0].track ? song[0].track.name : song[0].name).slice(0, 10);
    artistName.innerHTML = (song[0].artists ? song[0].artists[0].name : song[0].track.artists[0].name);
    songDur.innerHTML = song[0].track ? formatMillisecondsToTime(song[0].track.duration_ms) : formatMillisecondsToTime(song[0].duration_ms);
    if((song[0].track && song[0].track.album) || (song.album && song.album.images)) {
        songPost.style.backgroundImage = song[0].track ? `url(${song[0].track.album.images[0].url})` : `url(${song[0].album.images[0].url})`;
    } else if(song.type = 'artist') {
        getSong(`/artists/${song[0].artists[0].id}`)
        .then(res => {
        songPost.style.backgroundImage = `url(${res.data.images[0].url})`
        })
    }

    nextSongFunc(song)

    preSongFunc(song)
}

export function createSongs(arr, place) {
    place.innerHTML = ''

    for (const song of arr) {
        let song_block = document.createElement('div')
        let song_poster = document.createElement('div')
        let song_description = document.createElement('div')
        let pNameSong = document.createElement('p')
        let pPlayer = document.createElement('span')
        let button = document.createElement('button')
        let buttonImg = document.createElement('img')

        song_block.onclick = () => {
            location.assign(`/pages/${song.type}/?id=${song.id}`)
        }

        song_block.classList.add('song_block')
        song_poster.classList.add('song_poster')
        song_description.classList.add('song_description')
        button.classList.add('btn-play-audio')
        buttonImg.id = 'play_img_all'

        if (song.name.length >= 15) {
            pNameSong.innerHTML = song.name.slice(0, 14) + '...'
        } else {
            pNameSong.innerHTML = song.name
        }
        if (song.description) {
            pPlayer.innerHTML = song.description + '...'
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
        } else if(song.type == artist || song.external_urls) {
           getSong(`/artists/${song.id}`)
           .then(art => {
            if(art.data.images[0]) {
                song_poster.style.backgroundImage = `url(${art.data.images[0].url})`;
            } else {
                song_poster.style.backgroundImage = `url(/public/img/no_img.jpg)`;
            }
           })
        } else {
            song_poster.style.backgroundImage = `url(/public/img/no_img.jpg)`;
        }

        if (song.type == 'artist' || song.type == 'исполнитель') {
            song_poster.style.borderRadius = '100%'
        }

        button.append(buttonImg)
        place.append(song_block)
        song_block.append(song_poster, song_description)
        song_description.append(pNameSong, pPlayer)
        song_poster.append(button)
        
        if (cancel) {
            let button = document.createElement('button')
            let imgBtn = document.createElement('img')

            button.classList.add('btn_del')

            imgBtn.src = '/public/icons/close_icon.svg'

            button.append(imgBtn)
            song_block.append(button)

            button.onclick = (event) =>  {
                event.stopPropagation();
                removeSearchHistoryItem(song.id)
            }

          }

          if(location.href.includes('search')) {
            song_block.addEventListener('click', function () {
                updateSearchHistory(song);
              });
          }

          button.onclick = () => {
            audioPlayFunc(song, buttonImg)
          }

    }
    cancel = false
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

function updateSearchHistory(query) {
    // Фильтруем элементы по их id
    const filteredHistory = searchHistory.filter(item => item.id !== query.id);

    filteredHistory.unshift(query);

    if (filteredHistory.length > 20) {
        filteredHistory.pop();
    }

    searchHistory = filteredHistory;

    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

    // updateSearchHistoryUI();
}

function removeSearchHistoryItem(id) {
    const filteredHistory = searchHistory.filter(item => item.id !== id);
  
    localStorage.setItem('searchHistory', JSON.stringify(filteredHistory));
  
    window.location.reload();
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
    playButtonImage.id = 'play_img_all'

    heading.innerHTML = 'Лучший результат';
    resultTitle.innerHTML = arr.name
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

    bestResult.onclick = () => {
        updateSearchHistory(arr);
        location.assign(`/pages/${arr.type}/?id=${arr.id}`)
    }

    playButton.onclick = () => {
        event.stopPropagation();
        audioPlayFunc(arr, playButtonImage)
    }

}

export function trackResult(arr, place) {
    place.innerHTML = ''

    for (const track of arr) {
        let trackResult = document.createElement('div');
        let aboutTrack = document.createElement('div');
        let trackPoster = document.createElement('div');
        let trackPosterImage = document.createElement('img');
        let nameTrack = document.createElement('div');
        let trackName1 = document.createElement('p');
        let allArtistName = document.createElement('div');
        let timeTrack = document.createElement('div');
        let timeTrackImage = document.createElement('img');
        let timeTrackSpan = document.createElement('span');

        aboutTrack.classList.add('about_track');
        trackResult.classList.add('track_result');
        trackPoster.classList.add('track_poster');
        timeTrack.classList.add('time_track');
        nameTrack.classList.add('name_track');
        trackPosterImage.id = 'play_img_all'
        trackName1.id = 'all_song_name'

        function millisecondsToMinutesAndSeconds(duration_ms) {
            let minutes = Math.floor(duration_ms / 60000);
            let seconds = ((duration_ms % 60000) / 1000).toFixed(0);
            return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
        }

        trackPosterImage.src = '/public/icons/start-audio.svg';
        trackName1.innerHTML = track.name.slice(0, 20) + '...';
        timeTrackImage.src = '/public/icons/favorite-icon.svg';
        timeTrackSpan.innerHTML = millisecondsToMinutesAndSeconds(track.duration_ms);
        trackPoster.style.backgroundImage = `url(${track.album.images[0].url})`

        if (track.artists) {
            for (let artist of track.artists) {
                let artistSpan = document.createElement('span');
                artistSpan.innerHTML = artist.name + ', ';

                allArtistName.append(artistSpan);
                artistSpans.push(artistSpan);

                artistSpan.onclick = () => {
                    location.assign(`/pages/${artist.type}/?id=${artist.id}`)
            updateSearchHistory(artist);
                }
            }
            if (artistSpans.length > 0) {
                let lastArtistSpan = artistSpans[artistSpans.length - 1];
                lastArtistSpan.innerHTML = lastArtistSpan.innerHTML.replace(', ', '');
            }

            trackPoster.onclick = () => {
                let hidden_icon_all = document.querySelectorAll('.track_poster img')
                let pSongNameAll = document.querySelectorAll('.name_track p')
                let pSongName = trackPoster.nextElementSibling.firstChild
    
                hidden_icon_all.forEach(icon => {
                    icon.src = '/public/icons/start-audio.svg'
                })
    
                pSongNameAll.forEach(p => {
                    p.style.color = 'white'
                })
                
                if (hidB) {
                    trackPosterImage.src = '/public/icons/pause-audio.svg'
                    hidB = false
                    pSongName.style.color = '#1ED760';
                } else {
                    trackPosterImage.src = '/public/icons/start-audio.svg'
                    hidB = true
                    pSongName.style.color = 'white';
                }
    
                audioPlayPlaylistsFunc(track, trackPosterImage, pSongName)
            }
        } 

        trackResult.append(aboutTrack, timeTrack);
        aboutTrack.append(trackPoster, nameTrack);
        trackPoster.append(trackPosterImage);
        nameTrack.append(trackName1, allArtistName);
        timeTrack.append(timeTrackImage, timeTrackSpan);

        place.append(trackResult);

        trackName1.onclick = () => {
            location.assign(`/pages/${track.type}/?id=${track.id}`)
            updateSearchHistory(track);
        }

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
        let rightTrackSide = document.createElement('div');
        let favoriteIcon = document.createElement('img');
        let timeDur = document.createElement('p');
        let dotsIcon = document.createElement('img');
        let allArtistName = document.createElement('div');

        trackBlock.classList.add('track_block');
        leftTrackSide.classList.add('left_track_side');
        hiddenIconBtn.classList.add('hidden_icon');
        trackName.classList.add('track_name');
        favoriteIcon.classList.add('favorite-icon');
        rightTrackSide.classList.add('right_track_side');
        dotsIcon.classList.add('dots_icon');
        hiddenIconImg.id = 'play_img_all'

        trackNumber.id = 'track_number';
        hiddenIconImg.src = '/public/icons/start-audio.svg';
        trackNameText.innerHTML = track.name;
        timeDur.id = 'time_dur';
        trackNameText.id = 'all_song_name'

        let durationMs = track.duration_ms;
        let totalSeconds = Math.floor(durationMs / 1000);
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        timeDur.innerHTML = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        trackNumber.innerHTML = track.track_number;
        if (track.track_number > 9) {
            trackBlock.style.padding = '0 10px'
        } else if (track.track_number > 99) {
            trackBlock.style.padding = '0 5px'
        }
        favoriteIcon.src = '/public/icons/favorite-icon.svg';
        dotsIcon.src = '/public/icons/dots_icon.svg';

        hiddenIconBtn.append(hiddenIconImg);

        trackName.append(trackNameText, allArtistName);

        leftTrackSide.append(hiddenIconBtn, trackNumber, trackName);

        rightTrackSide.append(favoriteIcon, timeDur, dotsIcon);

        trackBlock.append(leftTrackSide, rightTrackSide);

        place.append(trackBlock);

        for (let artist of track.artists) {
            let artistSpan = document.createElement('span');
            artistSpan.innerHTML = artist.name + ', ';


            allArtistName.append(artistSpan);
            artistSpans.push(artistSpan);

            artistSpan.onclick = () => {
                location.assign(`/pages/${artist.type}/?id=${artist.id}`)
            }
        }
        if (artistSpans.length > 0) {
            let lastArtistSpan = artistSpans[artistSpans.length - 1];
            lastArtistSpan.innerHTML = lastArtistSpan.innerHTML.replace(', ', '');
        }

        hiddenIconImg.onclick = () => {
            let hidden_icon_all = document.querySelectorAll('#play_img_all')
            let pSongNameAll = document.querySelectorAll('.track_name p')
            let pSongName = hiddenIconImg.parentElement.nextElementSibling.nextElementSibling.firstChild

            hidden_icon_all.forEach(icon => {
                icon.src = '/public/icons/start-audio.svg'
            })

            pSongNameAll.forEach(p => {
                p.style.color = 'white'
            })
            
            if (hidB) {
                hiddenIconImg.src = '/public/icons/pause-audio.svg'
                hidB = false
                pSongName.style.color = '#1ED760';
            } else {
                hiddenIconImg.src = '/public/icons/start-audio.svg'
                hidB = true
                pSongName.style.color = 'white';
            }

            audioPlayPlaylistsFunc(track, hiddenIconImg, pSongName)
        }


        const allTrackBlocks = document.querySelectorAll('.track_block');

        allTrackBlocks.forEach((trackBlock) => {
            trackBlock.onclick = () => {
                allTrackBlocks.forEach((block) => {
                    block.style.backgroundColor = '';
                });

                trackBlock.style.backgroundColor = '#5A5A5A';

            }
        });

        trackBlock.addEventListener('dblclick', () => {
            location.assign(`/pages/${track.type}/?id=${track.id}`)
        });

        trackNameText.onclick = () => {
            location.assign(`/pages/${track.type}/?id=${track.id}`)
        }

        favoriteIcon.onclick = () => {

            if (!favB) {
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
        let allArtistName = document.createElement('div');
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
        albumDiv.classList.add('album_div')
        lastAddDiv.classList.add('last_addDiv')

        function formatDate(dateString) {
            let options = { day: 'numeric', month: 'short', year: 'numeric' };
            let date = new Date(dateString);
            return date.toLocaleDateString('ru-RU', options);
        }

        let durationMs = track.track.duration_ms;
        let totalSeconds = Math.floor(durationMs / 1000);
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;

        trackNumber.id = 'track_number';
        hiddenIconImg.src = '/public/icons/start-audio.svg';
        trackNameText.innerHTML = track.track.name;
        timeDur.id = 'time_dur';
        albumP.innerHTML = track.track.album.name
        lastAddP.innerHTML = formatDate(track.added_at.slice(0, 10))
        timeDur.innerHTML = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        trackNumber.innerHTML = n;
        if (track.track_number > 9) {
            trackBlock.style.padding = '0 10px'
        } else if (track.track_number > 99) {
            trackBlock.style.padding = '0 5px'
        }
        favoriteIcon.src = '/public/icons/favorite-icon.svg';
        dotsIcon.src = '/public/icons/dots_icon.svg';

        hiddenIconBtn.append(hiddenIconImg);

        trackName.append(trackNameText, allArtistName);

        if (track.track.artists) {
            for (let artist of track.track.artists) {
                let artistSpan = document.createElement('span');
                artistSpan.innerHTML = artist.name + ', ';

                allArtistName.append(artistSpan);
                artistSpans.push(artistSpan);

                artistSpan.onclick = () => {
                    location.assign(`/pages/${artist.type}/?id=${artist.id}`)
                }
            }
            if (artistSpans.length > 0) {
                let lastArtistSpan = artistSpans[artistSpans.length - 1];
                lastArtistSpan.innerHTML = lastArtistSpan.innerHTML.replace(', ', '');
            }
        } 


        leftTrackSide.append(hiddenIconBtn, trackNumber, trackName);

        rightTrackSide.append(favoriteIcon, timeDur, dotsIcon);

        trackBlock.append(leftTrackSide, albumDiv, lastAddDiv, rightTrackSide);

        albumDiv.append(albumP)
        lastAddDiv.append(lastAddP)

        place.append(trackBlock);
        n++
        
        hiddenIconImg.onclick = () => {
            let hidden_icon_all = document.querySelectorAll('#play_img_all')
            let pSongNameAll = document.querySelectorAll('.track_name p')
            let pSongName = hiddenIconImg.parentElement.nextElementSibling.nextElementSibling.firstChild

            hidden_icon_all.forEach(icon => {
                icon.src = '/public/icons/start-audio.svg'
            })

            pSongNameAll.forEach(p => {
                p.style.color = 'white'
            })
            

            if (hidB) {
                hiddenIconImg.src = '/public/icons/pause-audio.svg'
                hidB = false
            } else {
                hiddenIconImg.src = '/public/icons/start-audio.svg'
                hidB = true
            }
            let song = track.track

            audioPlayPlaylistsFunc(song, hiddenIconImg, pSongName)
        }

        favoriteIcon.onclick = () => {
            if (!favB) {
                favoriteIcon.src = '/public/icons/favorite-full.svg'
                favB = true
            } else {
                favoriteIcon.src = '/public/icons/favorite-icon.svg';
                favB = false
            }

            // putSong(`/me/tracks?ids=${track.track.id}`)

        }

        trackNameText.onclick = () => {
            location.assign(`/pages/${track.track.type}/?id=${track.track.id}`)
        }

        albumP.onclick = () => {
            location.assign(`/pages/${track.track.album.type}/?id=${track.track.album.id}`)
            console.log(track);
        }
    }
}

export function artist(arr, place) {
    place.innerHTML = ''

    for (const artist of arr) {
        let artistBlock = document.createElement('div');
        let artistImg = document.createElement('div');
        let artistDescr = document.createElement('div');
        let artistName = document.createElement('h3');
        let artistParagraph = document.createElement('p');

        artistBlock.classList.add('artist_block');
        artistImg.classList.add('artist_img');
        artistDescr.classList.add('artist_desrc');
        artistName.innerHTML = 'Исполнитель';
        artistParagraph.innerHTML = artist.name;
        getSong(`/artists/${artist.id}`)
            .then(res => {
                if(res.data.images[0]) {
                    artistImg.style.backgroundImage = `url(${res.data.images[0].url})`
                } else {
                    artistImg.style.backgroundImage = `url(/public/img/no_img.jpg)`
                }
            })

        artistDescr.append(artistName, artistParagraph);
        artistBlock.append(artistImg, artistDescr);

        place.append(artistBlock);

        artistBlock.onclick = () => {
            location.assign(`/pages/${artist.type}/?id=${artist.id}`)
        }
    }
}