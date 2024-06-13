// src/redux/wishlistSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { baseURL } from '../../Utils/API';

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (tokenData, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/custom/v1/wish/list`, {
        headers: {
          Authorization: `Bearer ${tokenData}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async ({ product_id, tokenData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseURL}/custom/v1/wish/list/add`,
        {
          product_id: product_id,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenData}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const removeFromWishlist = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async ({ product_id, tokenData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseURL}/custom/v1/wish/list/remove`,
        {
          product_id: product_id,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenData}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWishlist.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error fetching wishlist';
      })
      .addCase(addToWishlist.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error adding to wishlist';
      })
      .addCase(removeFromWishlist.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload.id);
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error removing from wishlist';
      });
  },
});

export default wishlistSlice.reducer;
