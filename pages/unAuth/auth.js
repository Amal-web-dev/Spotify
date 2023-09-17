import { footer } from "../../modules/loyal";
import { createSongCont } from "../../modules/function";
import { getDetails } from "../../modules/http.request.js";

let token = location.href.split('access_token=').at(-1)
let login_a = document.querySelector('.login-a')
let un_auth_song_cont =  document.querySelector('.un_auth_song_cont')
const myToken = localStorage.getItem("myId");
let main = document.querySelector('main')

    localStorage.setItem("myId", token);
footer(main)

login_a.href = `${import.meta.env.VITE_AUTH_ENDPOINT}?client_id=${import.meta.env.VITE_client_id}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=${import.meta.env.VITE_RESPONSE_TYPE}&score=user-library-read`

// axios.get("https://api.spotify.com/v1/browse/featured-playlists", {
//     headers: {
//         Authorization: `Bearer BQAzSbtA04x0XPEYfSHz66ihq4d98w75Ryg-3q_e0yxPsjpZdJDdyyV3pEp-ZyysYn00QTA51RXKjW_rN_mPShKrUiarn7sBwjRV_QQKAZ50a5QKwdiPDR4sQJyIMxx7k26AIfRqDHrGXM3vP6F-9JF4N7iMPtl9h7lhBtjr6lVMApYwQQHhnz4KKhde5lEm2Ek&token_type=Bearer&expires_in=3600`
//     }
// }).then(res => {
//     try {
// createSongCont(['Плейлисты Spotify'], un_auth_song_cont, res.data.playlists.items.slice(1, 8))
//     } catch (error) {
//         console.log('CreateSong' + error);
//     }
// })