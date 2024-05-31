import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {ORDER_TO_CART} from '../../../Constants/UserConstants';
import {
  Consumer_key,
  Consumer_secret,
  baseURL,
  dummyurl,
} from '../../../Utils/API';
import Toast from 'react-native-toast-message';

export const orderToCart = createAsyncThunk(
  ORDER_TO_CART,
  async (data, {rejectWithValue}) => {
    try {
      const config = {
        auth: {
          username: Consumer_key,
          password: Consumer_secret,
        },
      };

      const response = await axios.post(
        `${baseURL}/wc/v3/orders/`,
        data,
        config,
      );
      return response.data;
    } catch (error) {
      console.error('Network Error:', error);
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  },
);

const initialState = {
  isloading: false,
  iserror: null,
  orderData: null,
};

const OrderToCartSlice = createSlice({
  name: 'OrderToCart',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(orderToCart.pending, state => {
        state.isloading = true;
        state.iserror = null;
      })

      .addCase(orderToCart.fulfilled, (state, action) => {
        state.isloading = false;
        state.cartdata = action.payload;
        Toast.show({
          type: 'success',
          text1: 'your order is placed',
          position: 'bottom',
          visibilityTime: 1500,
        });
      })

      .addCase(orderToCart.rejected, (state, action) => {
        state.isloading = false;
        state.iserror = action.error.message || 'An error occurred';
      });
  },
});

export default OrderToCartSlice.reducer;
