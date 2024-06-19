import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Consumer_key, Consumer_secret, baseURL } from '../../Utils/API';

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  auth: {
    username: Consumer_key,
    password: Consumer_secret,
  },
});

export const fetchProducts = createAsyncThunk('product', async () => {
  const response = await api.get('/wc/v3/products');
  return response.data;
});

export const fetchCategoryProducts = createAsyncThunk(
  'product/fetchCategoryProducts',
  async ({ categoryId, page }, { getState, rejectWithValue }) => {
    try {
      const response = await api.get(`/wc/v3/products?category=${categoryId}&per_page=10&page=${page}`);
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
