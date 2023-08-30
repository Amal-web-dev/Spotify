import axios from 'axios'
import { asideLoyal, audioLoyal, footer, headerMainSearch } from "../../modules/loyal";
import { categoriesFunc } from "../../modules/function";
import { audioFunc } from "../../modules/audio";
import { getSong } from "../../modules/http.request.js";
import { ReloadMediatekaSong } from "../../modules/function";

let aside = document.querySelector('aside')
let main = document.querySelector('main')
let searchCont =  document.querySelector('.search-cont')

headerMainSearch(main)
asideLoyal(aside)
footer(searchCont)


let token = location.href.split('access_token=').at(-1)
let login_a = document.querySelector('.login-a')
let mediate_song_block = document.querySelector('.mediate_song_block')
let all_categories = document.querySelector('.all_categories')
getSong('/browse/categories')
.then(res => {
    console.log(res.data.categories.items);

    categoriesFunc(res.data.categories.items, all_categories)

    getSong(`/browse/categories/${res.data.categories.items[0].id}`)
    .then(categ => {
      console.log(categ);
    })
    // getSong(`/browse/categories`)
    // .then(categ => {
    // console.log(categ);
    // })

})
// loyal

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


// loyal