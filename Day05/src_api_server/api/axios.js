import axios from 'axios';

const api = axios.create({
  baseURL: 'http://13.220.93.143:8080',
  params : {userId: 'USER_01'},
});

export default api;