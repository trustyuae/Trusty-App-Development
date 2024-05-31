import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {ORDER_DETAIL} from '../../../Constants/UserConstants';
import {Consumer_key, Consumer_secret, baseURL} from '../../../Utils/API';

export const OrderDetail = createAsyncThunk(
  ORDER_DETAIL,

  async (id, {rejectWithValue}) => {
    try {
      const config = {
        auth: {
          username: Consumer_key,
          password: Consumer_secret,
        },
      };

      const response = await axios.get(
        `${baseURL}/wc/v3/orders?customer=${id}`,
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
  isLoading: false,
  iserrors: null,
  ordedetaildata: null,
};

const OrderDetailCartSlice = createSlice({
  name: 'OrderDetailCart',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(OrderDetail.pending, state => {
        state.isLoading = true;
        state.iserrors = null;
      })

      .addCase(OrderDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ordedetaildata = action.payload;
      })

      .addCase(OrderDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.iserrors = action.error.message || 'An error occurred';
      });
  },
});

export default OrderDetailCartSlice.reducer;
