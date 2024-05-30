// src/redux/wishlistSlice.js

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {baseURL} from '../../Utils/API';

export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async ({productId, tokenData}, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        `${baseURL}/custom/v1/wish/list/add`,
        {
          productId,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenData}`, // Include token in the request headers
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
  async ({productId, tokenData}, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        `${baseURL}/custom/v1/wish/list/remove`,
        {
          productId,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenData}`, // Include token in the request headers
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
      .addCase(addToWishlist.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
        Toast.show({
          type: 'success',
          text1: 'Added to Wishlist',
        });
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error adding to wishlist';
        console.log(state.error);
        Toast.show({
          type: 'error',
          text1: 'Error adding to wishlist',
        });
      })
      .addCase(removeFromWishlist.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload.id);
        Toast.show({
          type: 'success',
          text1: 'Removed from Wishlist',
        });
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error removing from wishlist';
        Toast.show({
          type: 'error',
          text1: 'Error removing from wishlist',
        });
      });
  },
});

export default wishlistSlice.reducer;
