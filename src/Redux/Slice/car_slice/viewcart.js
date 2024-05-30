import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {ADD_TO_CART, VIEW_TO_CART} from '../../../Constants/UserConstants';
import {
  Consumer_key,
  Consumer_secret,
  baseURL,
  dummyurl,
} from '../../../Utils/API';
import Toast from 'react-native-toast-message';
import {getUsername} from '../../../Utils/localstorage';

export const ViewToCart = createAsyncThunk(
  VIEW_TO_CART,

  async (data, {rejectWithValue}) => {
    try {
      const config = {
        auth: {
          username: Consumer_key,
          password: Consumer_secret,
        },
      };
      let useremail = await getUsername();
      const response = await axios.get(
        `${baseURL}/ade-woocart/v1/cart?username=${useremail}`,
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
  loading: false,
  errors: null,
  viewcartdata: null,
};

const ViewToCartSlice = createSlice({
  name: 'ViewToCart',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(ViewToCart.pending, state => {
        state.loading = true;
        state.errors = null;
      })

      .addCase(ViewToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.viewcartdata = action.payload;
      })

      .addCase(ViewToCart.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.error.message || 'An error occurred';
      });
  },
});

export default ViewToCartSlice.reducer;
