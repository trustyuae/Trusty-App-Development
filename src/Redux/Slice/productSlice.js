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
  // const response = await api.get('/custom-category-products/v1/all-category-products');
  return response.data;
});

export const fetchRecentProducts = createAsyncThunk(
  'product/fetchRecentProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/wc/v3/products', {
        params: {
          orderby: 'date',
          order: 'desc',
          per_page: 10,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCategoryProducts = createAsyncThunk(
  'product/fetchCategoryProducts',
  async ({ categoryId, page }, { getState, rejectWithValue }) => {
    try {
      const response = await api.get(`/wc/v3/products?category=${categoryId}&per_page=20&page=${page}`);
      // const response = await axios.get(`${baseURL}/custom-bags-category/v1/bags-category-products`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);



const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    recentProducts: [],
    categoryProducts: [],
    status: 'idle',
    error: null,
    recentStatus: 'idle',
    recentError: null,
    error: null,
    currentPage: 1,
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
      })
      .addCase(fetchRecentProducts.pending, (state) => {
        state.recentStatus = 'loading';
      })
      .addCase(fetchRecentProducts.fulfilled, (state, action) => {
        state.recentStatus = 'succeeded';
        state.recentProducts = action.payload;
      })
      .addCase(fetchRecentProducts.rejected, (state, action) => {
        state.recentStatus = 'failed';
        state.recentError = action.error.message;
      });
  },
});


export const { resetCategoryProducts } = productSlice.actions;

export default productSlice.reducer;
