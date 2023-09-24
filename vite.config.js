import {
    resolve
 } from 'path'
 import {
    defineConfig
 } from 'vite'
 
 export default defineConfig({
    build: {
       rollupOptions: {
          input: {
             main: resolve(__dirname, 'index.html'),
             unAuth: resolve(__dirname, 'pages/unAuth/index.html'),
             search: resolve(__dirname, 'pages/search/index.html'),
             song: resolve(__dirname, 'pages/song/index.html'),
             track: resolve(__dirname, 'pages/track/index.html'),
             playlist: resolve(__dirname, 'pages/playlist/index.html'),
             artist: resolve(__dirname, 'pages/artist/index.html'),
             album: resolve(__dirname, 'pages/album/index.html'),
             allSong: resolve(__dirname, 'pages/allSong/index.html'),
             profile: resolve(__dirname, 'pages/profile/index.html'),
          },
       },
    },
 })