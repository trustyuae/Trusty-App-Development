import axios from 'axios';
const API_URL =
  'https://ghostwhite-guanaco-836757.hostingersite.com/wp-json/wc/v3';

const CONSUMER_KEY = 'ck_74025587053512828ec315f206d134bc313d97cb';
const CONSUMER_SECRET = 'cs_72ca42854e72b72e3143a14d79fd0a91c649fbeb';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  auth: {
    username: CONSUMER_KEY,
    password: CONSUMER_SECRET,
  },
});

export const getCategories = async () => {
  const response = await api.get('/products/categories');
  return response.data;
};
