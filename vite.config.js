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
          },
       },
    },
 })