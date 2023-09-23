import axios from 'axios'

let baseURL = import.meta.env.VITE_API
let myToken = localStorage.getItem('myId')
let errorCount = parseInt(localStorage.getItem('errorCount')) || 0;

export let getSong = async (path) => {
    try {
        const res = await axios.get(baseURL + path, {
            headers: {
                Authorization: `Bearer ${myToken}`
            }
        });

        return res;
    } catch (e) {
        // if (errorCount <= 4) {
        //     errorCount++;
        //     localStorage.setItem('errorCount', errorCount.toString());
        //     window.location.reload();
        // } else {
        //     if(e.message.includes('401')) {
        //    location.assign('/pages/unAuth/');
        //     }
        //     errorCount = 0;
        //     localStorage.removeItem('errorCount');
        // }

        console.log(e);
    }
};
const BASE_URL = 'https://api.spotify.com/v1';

export const subscribeToArtist = async (artistId) => {
    const url = `${BASE_URL}/me/following?type=artist&ids=${artistId}`;
  
    const headers = {
      'Authorization': `Bearer ${myToken}`,
      'Content-Type': 'application/json',
    };
  
    try {
      const response = await axios.put(url, null, { headers });
        console.log('Подписка успешно оформлена на исполнителя!');
    } catch (error) {
      console.error('Произошла ошибка при выполнении запроса:', error.message);
      console.log(error);
    }
  };

  export const unsubscribeFromArtist = async (artistId) => {
    const url = `${BASE_URL}/me/following?type=artist&ids=${artistId}`;
  
    const headers = {
      'Authorization': `Bearer ${myToken}`,
      'Content-Type': 'application/json',
    };
  
    try {
      const response = await axios.delete(url, { headers });
      console.log(`Вы успешно отписались от артиста`);
      return response;
    } catch (error) {
      console.error('Произошла ошибка при выполнении запроса:', error.message);
      console.log(error);
    }
};


  export const likeSong = async (typeId, type) => {
    const url = `${BASE_URL}/me/${type}?ids=${typeId}`;
  
    const headers = {
      'Authorization': `Bearer ${myToken}`,
      'Content-Type': 'application/json',
    };
  
    try {
        const response = await axios.put(url, {}, { headers });
        console.log(`Вы успешно поставили лайк песне`);
        return response;
      } catch (error) {
        console.error('Произошла ошибка при выполнении запроса:', error.message);
        console.log(error);
      }
  };

  export const unLikeSong = async (typeId, type) => {
    const url = `${BASE_URL}/me/${type}?ids=${typeId}`;
  
    const headers = {
      'Authorization': `Bearer ${myToken}`,
      'Content-Type': 'application/json',
    };
  
    try {
      const response = await axios.delete(url, { headers });
      return response;
    } catch (error) {
      console.error('Произошла ошибка при выполнении запроса:', error.message);
      console.log(error);
    }
};


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