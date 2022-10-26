import axios from "axios";


//Localhost
export const Api = () => {
  return axios.create({
    baseURL: 'http://192.168.15.123:3333/api'
  })
}