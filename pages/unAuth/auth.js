import { asideAuth, audioLoyal } from "../../modules/loyal";
import { audioFunc } from "../../modules/audio";
import axios from 'axios'

let token = location.href.split('access_token=').at(-1)
let login_a = document.querySelector('.login-a')
localStorage.setItem("myId", token);

const myId = localStorage.getItem("myId");
login_a.href = `${import.meta.env.VITE_AUTH_ENDPOINT}?client_id=${import.meta.env.VITE_client_id}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=${import.meta.env.VITE_RESPONSE_TYPE}&score=user-library-read`
console.log(myId);
