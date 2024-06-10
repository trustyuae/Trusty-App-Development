import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { VIEW_TO_CART } from '../../../Constants/UserConstants';
import { Consumer_key, Consumer_secret, baseURL, dummyurl } from '../../../Utils/API';
import Toast from 'react-native-toast-message';
import { getToken, getUsername } from '../../../Utils/localstorage';

export const ViewToCart = createAsyncThunk(
  VIEW_TO_CART,
  async (data, { rejectWithValue }) => {
    try {
      let token = await getToken();
      const response = await axios.get(
        `${baseURL}/custom-woo-api/v1/view-cart`,
        {
          headers: {
            'Authorization':`Bearer ${token}`,
          },
        },
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
        state.errors = action.payload || 'An error occurred';
      });
  },
});

export default ViewToCartSlice.reducer;
