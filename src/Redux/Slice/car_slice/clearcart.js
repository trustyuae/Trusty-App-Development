import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {CLEAR_TO_CART} from '../../../Constants/UserConstants';
import {Consumer_key, Consumer_secret, baseURL} from '../../../Utils/API';
import {getUsername} from '../../../Utils/localstorage';

export const clearToCart = createAsyncThunk(
  CLEAR_TO_CART,
  async (data, {rejectWithValue}) => {
    try {
      let useremail = await getUsername();

      const response = await axios.post(
        `${baseURL}/ade-woocart/v1/cart/delete/all?username=${useremail}`,
        data,
        {
          auth: {
            username: Consumer_key,
            password: Consumer_secret,
          },
        },
      );
      console.log(response.data);
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
