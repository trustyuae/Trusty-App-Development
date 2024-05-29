// profileSlice.js

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {baseURL} from '../../Utils/API';

// Async thunk to fetch profile data
export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (customer_id, thunkAPI) => {
    try {
      const response = await axios.get(
        `${baseURL}/wc/v3/customers/${customer_id}`,
        {
          auth: {
            username: 'ck_604dffdbe6cb804616978b0b6a04bae3de51db57',
            password: 'cs_a508308d959ceb307994082b20b01cf9fedc2fef',
          },
        },
      );

      // Return profile data
      return response.data;
    } catch (error) {
      // Handle errors
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async ({customer_id, newData}, thunkAPI) => {
    try {
      const response = await axios.put(
        `${baseURL}/wc/v3/customers/${customer_id}`,
        newData,
        {
          auth: {
            username: 'ck_604dffdbe6cb804616978b0b6a04bae3de51db57',
            password: 'cs_a508308d959ceb307994082b20b01cf9fedc2fef',
          },
        },
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);


const initialState = {
  data: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetProfile: state => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {resetProfile} = profileSlice.actions;

export default profileSlice.reducer;
