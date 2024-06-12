import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

import Toast from 'react-native-toast-message';
import {getToken, getUsername} from '../../../Utils/localstorage';
import { VIEW_TO_CART } from '../../../../Constants/UserConstants';
import { baseURL } from '../../../../Utils/API';

export const ProductViewToCart = createAsyncThunk(
  VIEW_TO_CART,
  async (data, {rejectWithValue}) => {
    try {
      const response = await axios.get(`${baseURL}/custom/v1/cart/view`);

      return response.data;
    } catch (error) {
      console.error('Network Error:', error);
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  },
);

const initialState = {
  loading: false,
  errors: null,
  viewcartdata: null,
};

const ProductViewToCartSlice = createSlice({
  name: 'ViewToCart',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(ProductViewToCart.pending, state => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(ProductViewToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.viewcartdata = action.payload;
      })
      .addCase(ProductViewToCart.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload || 'An error occurred';
      });
  },
});

export default ProductViewToCartSlice.reducer;
