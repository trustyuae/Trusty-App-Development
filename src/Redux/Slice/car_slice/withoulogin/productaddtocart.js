import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {ADD_TO_CART} from '../../../../Constants/UserConstants';
import { baseURL } from '../../../../Utils/API';

export const productaddToCart = createAsyncThunk(
  ADD_TO_CART,
  async (data, {rejectWithValue}) => {
    try {
      const response = await axios.post(`${baseURL}/custom/v1/cart/add`, data);
      return response.data;
    } catch (error) {
      console.error('Network Error:', error);
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  },
);

const initialState = {
  loa: false,
  err: null,
  productcartdata: null,
};

const ProductAddToCartSlice = createSlice({
  name: 'ProductAddTocart',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(productaddToCart.pending, state => {
        state.loa = true;
        state.err = null;
      })

      .addCase(productaddToCart.fulfilled, (state, action) => {
        state.loa = false;
        state.productcartdata = action.payload;
        Toast.show({
          type: 'success',
          text1: 'Item Added',
          position: 'bottom',
          visibilityTime: 3000,
        });
      })

      .addCase(productaddToCart.rejected, (state, action) => {
        state.loa = false;
        state.err = action.error.message || 'An error occurred';
      });
  },
});

export default ProductAddToCartSlice.reducer;
