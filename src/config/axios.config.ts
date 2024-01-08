import axios, { type InternalAxiosRequestConfig } from 'axios';

const http = axios.create({
  headers: {
    'Content-Type': 'application/json',
    // 'X-Api-Key':
    //   'HaCTk%sayoimnCZYj3bQFlUiBWUsXPquRn!UZEG1DRg-LoAzsz!Q!sYip2R@tycM',
  },
});

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const newConfig = config;

    // const token = localStorage.getItem('auth_token');

    // if (token) {
    //   newConfig.headers.Authorization = `Token ${token}`;
    // }

    if (newConfig.data) {
      newConfig.data = JSON.stringify(config.data);
    }

    return newConfig;
  },
  (error) => {
    // eslint-disable-next-line no-console
    console.log('HTTP-REQUEST-ERROR:', error);
    Promise.reject(error);
  },
);

export default http;
