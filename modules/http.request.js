import axios from "axios"

let baseURL = import.meta.env.VITE_API
let myToken = localStorage.getItem('myId')
let win = false

export let getSong = async (path) => {
    try {
        const res = await axios.get(baseURL + path, {
            headers: {
                Authorization: `Bearer ${myToken}`
            }
        })

        win = false
        return res
    } catch (e) {
        console.log(res);
        if(!win) {
            window.location.reload();

        }
    }
}


export async function putSong(path, data) {
    try {
        const response = await axios.put(`${baseURL}${path}`, data, {
            headers: {
                'Authorization': `Bearer ${myToken}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error making PUT request:', error);
        throw error; 
    }
}


export let getDetails = async (path) => {
    try {
        const res = await axios.get(baseURL + path, {
            headers: {
                Authorization: `Bearer BQBYH5GuF0LSOjCpyOsCo3nUQgS20HbgJdgrsfU5nNW1TseWrQRj1k9dk-gwohAiZ_s_oDjzOiQ2y_j5DCGOrBCFF36ziwEBAXBFJY2W81X-GtYa5OUMVHVhFEpZGZ5j1k_v_qkRbEgpUythKn1U29oympf0PiUVybilM9kkXONpqqkP6Qa3jSkJu9Ovm1q9GCI&token_type=Bearer&expires_in=3600`
            }
        })

        return res
    } catch (e) {
        console.log(e.message);
    }
}