import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Consumer_key, Consumer_secret, baseURL } from '../../Utils/API';

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

export const fetchProducts = createAsyncThunk('product', async () => {
  const response = await api.get('/products');
  return response.data;
});

export const fetchCategoryProducts = createAsyncThunk(
  'product/fetchCategoryProducts',
  async ({ categoryId, page }, { getState, rejectWithValue }) => {
    try {
      const response = await api.get(`/products?category=${categoryId}&per_page=10&page=${page}`);
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
    currentPage: 1, // Track current page for pagination
    totalProducts: 0,
  },
  reducers: {
    resetCategoryProducts: (state) => {
      state.categoryProducts = [];
    },
  }, extraReducers: builder => {
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
        state.categoryProducts = [...state.categoryProducts, ...action.payload];
        state.totalProducts += action.payload.length;
      })
      .addCase(fetchCategoryProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});


export const { resetCategoryProducts } = productSlice.actions;

export default productSlice.reducer;
