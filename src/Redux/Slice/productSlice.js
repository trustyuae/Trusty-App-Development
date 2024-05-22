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

export const fetchCategoryProducts = createAsyncThunk(
  'products/fetchCategoryProducts',
  async ({categoryId, consumerKey, consumerSecret}, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `https://ghostwhite-guanaco-836757.hostingersite.com/wp-json/wc/v3/products?category=${categoryId}&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [], // Ensure products is initialized as an empty array
    categoryProducts: [],
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
      })
      .addCase(fetchCategoryProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categoryProducts = action.payload;
      })
      .addCase(fetchCategoryProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
