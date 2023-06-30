import {checkResponse} from './api';
import {getCookie, setCookie} from "./cookie";
import {BASE_URL} from './constants';

export const fetchWithRefresh = (url, options) => {
  const headers = {
    headers: {
      Authorization: getCookie('accessToken'),
      "Content-type": 'application/json'
    },
  }

  return sender(url, {...options, ...headers})
};

const sender = async (url, options) => {
  try {
    const res = await fetch(url, options);
    if (res.ok) {
      return await res.json()
    }
    const data = await res.json();
    if (data.message === 'jwt expired') {
      await refreshToken();
      options.headers.Authorization = getCookie('accessToken');
      return fetch(url, options).then(checkResponse);
    } else {
      console.log(data);
      return Promise.reject(data);
    }
  } catch (error) {
    console.log(error);
  }
};

const refreshToken = () => {
  return fetch(`${BASE_URL}/auth/token`, {
    method: 'POST',
    headers: {
      "Content-type": 'application/json'
    },
    body: JSON.stringify({token: localStorage.getItem('refreshToken')})
  })
    .then(checkResponse)
    .then(refreshData => {
      if (!refreshData.success) {
        Promise.reject(refreshData)
      }

      localStorage.setItem('refreshToken', refreshData.refreshToken);
      setCookie('accessToken', refreshData.accessToken)
    })
};
