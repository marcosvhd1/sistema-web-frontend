import axios from 'axios';

export const Api = () => {
  return axios.create({
    baseURL: 'http://127.0.0.1:3333/api',
    headers: {'X-Requested-With': 'XMLHttpRequest'},
  });
};
