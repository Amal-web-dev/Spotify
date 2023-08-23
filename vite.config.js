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
             unAuth: resolve(__dirname, 'pages/unAuthPage/index.html'),
             search: resolve(__dirname, 'pages/searchPage/index.html'),
          },
       },
    },
 })