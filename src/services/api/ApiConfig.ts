import axios from 'axios';


//Localhost
export const Api = () => {
  return axios.create({
    baseURL: 'http://192.168.15.124:3333/api',
    headers: {'X-Requested-With': 'XMLHttpRequest'},
  });
};
