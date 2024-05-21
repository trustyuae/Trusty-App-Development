import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {POST_API} from '../../Constants/UserConstants';
import {baseURL} from '../../Utils/API';
import Toast from 'react-native-toast-message';
import axios from 'axios';


export const postApi = createAsyncThunk(
  POST_API,
  async (data, {rejectWithValue}) => {
    try {
      const response = await axios.post(`${baseURL}/custom-woo-api/v1/forgot-password`, data);
  
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
        Toast.show({
          type: 'success',
          text1: action.payload.message,
          position: 'bottom',
          visibilityTime: 2000,
        });
      })
      .addCase(postApi.rejected, (state, action) => {
        state.loading = false;
        state.error =  'Invalid credentials'||action.error.message ;
        Toast.show({
          type: 'error',
          text1: 'Invalid credentials',
          visibilityTime: 2000,
        });
      })
     
  },
});

export default postApiSlice.reducer;
