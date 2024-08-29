import axios from 'axios';
import { baseUrl } from '../constants/constant';

const api = axios.create({
  baseURL: baseUrl,
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;