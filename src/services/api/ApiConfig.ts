import axios from 'axios';

export const Api = () => {
  return axios.create({
    baseURL: 'http://192.168.15.136:3333/api',
    headers: {'X-Requested-With': 'XMLHttpRequest'},
  });
};
