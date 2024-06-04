import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {Consumer_key, Consumer_secret, baseURL} from '../../Utils/API';

const API_URL = `${baseURL}/wc/v3`;
const CONSUMER_KEY = Consumer_key;
const CONSUMER_SECRET = Consumer_secret;

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
  'product/fetchCategoryProducts',
  async ({categoryId}, {rejectWithValue}) => {
    try {
      const response = await api.get(`/products?category=${categoryId}`);
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
