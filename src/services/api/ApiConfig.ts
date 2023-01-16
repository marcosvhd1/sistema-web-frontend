import axios from 'axios';


//Localhost
export const Api = () => {
  return axios.create({
    baseURL: 'http://localhost:3333/api',
    headers: {'X-Requested-With': 'XMLHttpRequest'},
  });
};
