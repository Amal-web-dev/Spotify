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
             unAuthPage: resolve(__dirname, 'pages/unAuthPage/index.html'),
             searchPage: resolve(__dirname, 'pages/searchPage/search.html'),
          },
       },
    },
 })