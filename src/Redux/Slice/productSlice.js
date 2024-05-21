import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
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

export const fetchProducts = createAsyncThunk('product', async () => {
  const response = await api.get('/products');
  return response.data;
});

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [], // Ensure products is initialized as an empty array
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
