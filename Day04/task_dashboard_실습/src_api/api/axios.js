import axios from 'axios';

const api = axios.create({
  baseURL: 'http://13.220.93.143:8080',
});

export default api;