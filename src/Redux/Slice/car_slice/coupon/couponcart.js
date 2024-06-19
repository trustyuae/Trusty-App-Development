import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {Consumer_key, Consumer_secret, baseURL} from '../../../../Utils/API';
import {GET_COUPON} from '../../../../Constants/UserConstants';
import { getToken } from '../../../../Utils/localstorage';

export const CouponDetail = createAsyncThunk(
  GET_COUPON,
  async (data, {rejectWithValue}) => {
    try {
      
      let token=await getToken()

      const response = await axios.post(`${baseURL}/custom/v1/apply-coupon`,data,
        {
          headers: {
            'Authorization':`Bearer ${token}`,
          },
        }, );

      return response.data;
    } catch (error) {
      console.error('Network Error:', error);
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  },
);

const initialState = {
  load: false,
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
        state.load = true;
        state.iserrors = null;
      })

      .addCase(CouponDetail.fulfilled, (state, action) => {
        state.load = false;
        state.coupon = action.payload;
      })

      .addCase(CouponDetail.rejected, (state, action) => {
        state.load = false;
        state.iserrors = action.error.message || 'An error occurred';
      });
  },
});

export default CouponDetailCartSlice.reducer;
