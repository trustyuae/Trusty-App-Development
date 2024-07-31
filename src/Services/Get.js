import axios from 'axios';
import {baseURL} from '../Utils/API';

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const Get = async token => {
  try {
    const headers = token ? {Authorization: `Bearer ${token}`} : {};
    const response = await api.get('/custom/v1/wish/list', {headers});
    return response.data;
  } catch (error) {
    console.log('Get whislist error', error);
    throw error;
  }
};

export const Post = async (data, token) => {
  try {
    const headers = token ? {Authorization: `Bearer ${token}`} : {};
    const response = await api.post(`/custom/v1/wish/list/add`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error('POST whislist failed:', error);
    throw error;
  }
};

export const Remove = async (data, token) => {
  try {
    const headers = token ? {Authorization: `Bearer ${token}`} : {};
    const response = await api.post(`/custom/v1/wish/list/remove`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error('Remove whislist failed:', error);
    throw error;
  }
};
