import axios from 'axios';

const api = axios.create({
  baseURL: 'https://barber-busk.herokuapp.com/',
});

export default api;
