import { asideAuth, audioLoyal } from "../../modules/loyal";
import { createSongCont } from "../../modules/function";
import { getDetails } from "../../modules/http.request.js";
import axios from 'axios'

let token = location.href.split('access_token=').at(-1)
let login_a = document.querySelector('.login-a')
let un_auth_song_cont =  document.querySelector('.un_auth_song_cont')
localStorage.setItem("myId", token);

login_a.href = `${import.meta.env.VITE_AUTH_ENDPOINT}?client_id=${import.meta.env.VITE_client_id}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=${import.meta.env.VITE_RESPONSE_TYPE}&score=user-library-read`

const playlistIds = [
    "37i9dQZF1DX4sWSpwq3LiO",
    "37i9dQZF1DWZeKCadgRdKQ",
    "37i9dQZF1DX9sIqqvKsjG8",
    "37i9dQZF1DWZZbwlv3Vmtr",
    "37i9dQZF1DXa2SPUyWl8Y5",
    "37i9dQZF1DWUWUfWSLE7dn",
    "37i9dQZF1DX3DZBe6wPMXo",
    "37i9dQZF1DX7KrTMVQnM02"
];

let playlistData = []

axios.get("https://api.spotify.com/v1/browse/featured-playlists", {
    headers: {
        Authorization: `Bearer BQCEMS56OR1_KBuAT2Jr4UMzJd5r-f8wUFOQZQdOi-GxqSxZwDPkVhZqG98jTvSYAFjU1f-FpJt86rl3wIOBvKxl2W7Oit6eIADoNY8AQ2LZUMZzuv2hsa9ufveRGH3LBGNOENqbd3p_QOV1yDTj4njOueuuFQj0ioAjPfRo68dytnQg6gc8d-2wuG6mDGSYZa4&token_type=Bearer&expires_in=3600`
    }
}).then(res => {
createSongCont(['Плейлисты Spotify'], un_auth_song_cont, res.data.playlists.items.slice(1, 8))
})

const axiosPromises = playlistIds.map(playlistId => getDetails(`/playlists/${playlistId}`)
    .then(res => {
        playlistData.push(res.data); // Добавляем результат в массив
    })
    .catch(error => {
        console.error(`Error fetching playlist ${playlistId}:`, error);
    })
);

Promise.all(axiosPromises)
    .then(() => {
        console.log(playlistData);
        createSongCont(['Фокус'], un_auth_song_cont, playlistData);
    })
    .catch(error => {
        console.error("Error in Promise.all:", error);
    });