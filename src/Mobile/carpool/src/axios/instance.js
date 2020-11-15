import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://carpool-rest-api.azurewebsites.net/api/',
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default instance;
