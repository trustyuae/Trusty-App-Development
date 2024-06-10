import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {CLEAR_TO_CART} from '../../../Constants/UserConstants';
import {Consumer_key, Consumer_secret, baseURL} from '../../../Utils/API';
import {getToken, getUsername} from '../../../Utils/localstorage';

export const clearToCart = createAsyncThunk(
  CLEAR_TO_CART,
  async (data, {rejectWithValue}) => {
    try {
      let token = await getToken();
      const response = await axios.delete(`${baseURL}/custom-woo-api/v1/cart/clear`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: data,
      });

      return response.data;
    } catch (error) {
      console.log('error-------------------------------->', error);
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  },
);

const initialState = {
  loa: false,
  err: null,
  cartdata: null,
};

const clearToCartSlice = createSlice({
  name: 'ClearToCarted',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(clearToCart.pending, state => {
        state.loa = true;
        state.err = null;
      })

      .addCase(clearToCart.fulfilled, (state, action) => {
        state.loa = false;
        state.cartdata = action.payload;
      })

      .addCase(clearToCart.rejected, (state, action) => {
        state.loa = false;
        state.err = action.error.message || 'An error occurred';
      });
  },
});

export default clearToCartSlice.reducer;
