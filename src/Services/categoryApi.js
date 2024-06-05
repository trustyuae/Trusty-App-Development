import axios from 'axios';
const API_URL = 'https://wordpress.trustysystem.com/wp-json/wc/v3';

const CONSUMER_KEY = 'ck_604dffdbe6cb804616978b0b6a04bae3de51db57';
const CONSUMER_SECRET = 'cs_a508308d959ceb307994082b20b01cf9fedc2fef';

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
