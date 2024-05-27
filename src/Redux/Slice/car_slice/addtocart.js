import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {ADD_TO_CART} from '../../../Constants/UserConstants';
import {baseURL, dummyurl} from '../../../Utils/API';

export const addToCart = createAsyncThunk(
  ADD_TO_CART,
  async (data, {rejectWithValue}) => {
    try {
      const response = await axios.post(`${baseURL}`, data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Network Error:', error);
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  },
);


const initialState = {
  loading: false,
  error: null,
  responseData: null,
};

const AddToCartSlice = createSlice({
  name: 'AddToCart',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addToCart.pending, state => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.responseData = action.payload;
      })

      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default AddToCartSlice.reducer;
