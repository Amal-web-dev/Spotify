import axios from "axios"

let baseURL = import.meta.env.VITE_API
let myToken = localStorage.getItem('myId')


export let getSong = async (path) => {
    try {
        const res = await axios.get(baseURL + path, {
            headers: {
                Authorization: `Bearer ${myToken}`
            }
        })

        return res
    } catch (e) {
        console.log(res);
    }
}


export let getDetails = async (path) => {
    try {
        const res = await axios.get(baseURL + path, {
            headers: {
                Authorization: `Bearer BQCEMS56OR1_KBuAT2Jr4UMzJd5r-f8wUFOQZQdOi-GxqSxZwDPkVhZqG98jTvSYAFjU1f-FpJt86rl3wIOBvKxl2W7Oit6eIADoNY8AQ2LZUMZzuv2hsa9ufveRGH3LBGNOENqbd3p_QOV1yDTj4njOueuuFQj0ioAjPfRo68dytnQg6gc8d-2wuG6mDGSYZa4&token_type=Bearer&expires_in=3600`
            }
        })

        return res
    } catch (e) {
        console.log(res);
    }
}