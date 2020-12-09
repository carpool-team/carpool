import axios from 'axios';
import {WEB_API_URL} from '@env';

const instance = axios.create({
  baseURL: WEB_API_URL,
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default instance;
