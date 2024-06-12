import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {baseURL} from '../../Utils/API';

export const fetchOrder = createAsyncThunk(
  'order/fetchOrder',
  async (customer_id, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `${baseURL}/wc/v3/orders?customer=${customer_id}`,
        {
          auth: {
            username: 'ck_604dffdbe6cb804616978b0b6a04bae3de51db57',
            password: 'cs_a508308d959ceb307994082b20b01cf9fedc2fef',
          },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

export const OrderById = createAsyncThunk(
  'order/get', async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/wc/v3/orders/${orderId}`,
        {
          auth: {
            username: 'ck_604dffdbe6cb804616978b0b6a04bae3de51db57',
            password: 'cs_a508308d959ceb307994082b20b01cf9fedc2fef',
          }
        })
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);

    }
  }

)

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchOrder.pending, state => {
        state.loading = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(OrderById.pending, state => {
        state.loading = true;
      })
      .addCase(OrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(OrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default orderSlice.reducer;
