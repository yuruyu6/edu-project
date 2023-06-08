import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://eduapp.pp.ua/api',
});
