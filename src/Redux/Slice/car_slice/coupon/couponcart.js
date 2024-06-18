import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {Consumer_key, Consumer_secret, baseURL} from '../../../../Utils/API';
import {GET_COUPON} from '../../../../Constants/UserConstants';

export const CouponDetail = createAsyncThunk(
  GET_COUPON,
  async (id, {rejectWithValue}) => {
    try {
      const config = {
        auth: {
          username: Consumer_key,
          password: Consumer_secret,
        },
      };

      const response = await axios.get(`${baseURL}/wc/v3/coupons`, config);

      return response.data;
    } catch (error) {
      console.error('Network Error:', error);
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  },
);

const initialState = {
  isLoading: false,
  iserrors: null,
  coupon: null,
};

const CouponDetailCartSlice = createSlice({
  name: 'CouponDetailCart',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(CouponDetail.pending, state => {
        state.isLoading = true;
        state.iserrors = null;
      })

      .addCase(CouponDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.coupon = action.payload;
      })

      .addCase(CouponDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.iserrors = action.error.message || 'An error occurred';
      });
  },
});

export default CouponDetailCartSlice.reducer;
