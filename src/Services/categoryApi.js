import axios from 'axios';
import {CONSUMER_KEY, CONSUMER_SECRET, baseURL} from '../Utils/API';
const API_URL = `${baseURL}/wc/v3`;

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
