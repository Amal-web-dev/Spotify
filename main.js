import axios from 'axios'
import { ReloadMediatekaSong } from "./modules/function";


let login_a = document.querySelector('.login-a')
const client_id = '48294f2378014a3d9d49e49477694d79';
const REDIRECT_URI = 'http://localhost:5173/';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token'
let token = location.href.split('=').at(-3)
let mediate_song_block = document.querySelector('.mediate_song_block')

login_a.href = `${AUTH_ENDPOINT}?client_id=${client_id}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&score=user-library-read`
    
    



axios.get("https://api.spotify.com/v1/albums?ids=382ObEPsp2rxGrnsizN5TX%2C1A2GTWGtFfWp7KSQTwWOyo%2C2noRn2Aes5aoNVsU6iWThc", {
    headers: {
        Authorization: `Bearer ${token}`
    }
}).then(res => {
    console.log(res.data.albums);
    ReloadMediatekaSong(res.data.albums, mediate_song_block)
})