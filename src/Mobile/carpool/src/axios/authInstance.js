import axios from 'axios';
import {AUTH_API_URL} from '@env';

const authInstance = axios.create({
  baseURL: AUTH_API_URL,
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default authInstance;
