// profileSlice.js

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {UPDATE_CHECKOUT} from '../../../Constants/UserConstants';
import {Consumer_key, Consumer_secret, baseURL} from '../../../Utils/API';

// Async thunk to fetch profile data

export const updatechekout = createAsyncThunk(
  UPDATE_CHECKOUT,
  async (data, thunkAPI) => {
    try {
      const config = {
        auth: {
          username: Consumer_key,
          password: Consumer_secret,
        },
      };
      const response = await axios.post(
        `${baseURL}/custom-woo-api/v1/update`,
        data,
        config,
      );
      console.log("data------------------------------>",data)

      return response.data;
    } catch (error) {
      console.log('error---------------------->', error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const updateChekoutslice = createSlice({
  name: 'checkoutupdate',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(updatechekout.pending, state => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updatechekout.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        Toast.show({
          type: 'success',
          text1: 'your order is placed',
          position: 'bottom',
          visibilityTime: 1500,
        });
      })

      .addCase(updatechekout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default updateChekoutslice.reducer;
