import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {ADD_TO_CART} from '../../../Constants/UserConstants';
import {
  Consumer_key,
  Consumer_secret,
  baseURL,
  dummyurl,
} from '../../../Utils/API';
import Toast from 'react-native-toast-message';
import {getToken} from '../../../Utils/localstorage';

export const addToCart = createAsyncThunk(
  ADD_TO_CART,
  async (data, {rejectWithValue}) => {
    try {

      let token=await getToken()
      const response = await axios.post(
        `${baseURL}/custom-woo-api/v1/add-to-cart`,
        data,
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
  loa: false,
  err: null,
  cartdata: null,
};

const AddToCartSlice = createSlice({
  name: 'AddToCart',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addToCart.pending, state => {
        state.loa = true;
        state.err = null;
      })

      .addCase(addToCart.fulfilled, (state, action) => {
        state.loa = false;
        state.cartdata = action.payload;
        Toast.show({
          type: 'success',
          text1: "Item Added",
          position: 'bottom',
          visibilityTime: 3000,
        });
      })

      .addCase(addToCart.rejected, (state, action) => {
        state.loa = false;
        state.err = action.error.message || 'An error occurred';
      });
  },
});

export default AddToCartSlice.reducer;
