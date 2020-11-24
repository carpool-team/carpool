import axios from 'axios';

const authInstance = axios.create({
  baseURL: 'https://carpool-auth.azurewebsites.net/api/',
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default authInstance;
