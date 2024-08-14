import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {POST_API, POST_API_change} from '../../Constants/UserConstants';
import {baseURL} from '../../Utils/API';
import Toast from 'react-native-toast-message';
import axios from 'axios';

export const postApi = createAsyncThunk(
  POST_API,
  async (data, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        `${baseURL}/custom-auth/v1/forgot-password`,
        data,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);
export const postApiChangePassword = createAsyncThunk(
  POST_API_change,
  async (data, {rejectWithValue}) => {
    console.log('data', data.password);
    try {
      const response = await axios.post(
        `${baseURL}/custom-auth/v1/change-password`,
        {
          password: data.password,
          token: data.token,
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

const initialState = {
  loading: false,
  error: null,
  postData: null,
  nav: false,
};

const postApiSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postApi.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postApi.fulfilled, (state, action) => {
        state.loading = false;
        state.postData = action.payload;
        state.nav = true;
        Toast.show({
          type: 'success',
          text1: state.postData.message,
          visibilityTime: 2000,
        });
      })
      .addCase(postApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Invalid Credentials' || state.error,
          visibilityTime: 2000,
        });
      })
      .addCase(postApiChangePassword.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postApiChangePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.postData = action.payload;
        state.nav = true;
        Toast.show({
          type: 'success',
          text1: 'Password reset successfully.',
          visibilityTime: 2000,
        });
      })
      .addCase(postApiChangePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Invalid Credentials' || state.error,
          visibilityTime: 2000,
        });
      });
  },
});

export default postApiSlice.reducer;
