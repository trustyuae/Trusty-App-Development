import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {ADD_TO_CART} from '../../../Constants/UserConstants';
import {Consumer_key, Consumer_secret, baseURL, dummyurl} from '../../../Utils/API';
import Toast from 'react-native-toast-message';

export const addToCart = createAsyncThunk(
  ADD_TO_CART,
 

  async (data, {rejectWithValue}) => {
    try {
      const config ={
          auth: {
            username: Consumer_key,
            password: Consumer_secret,
          },
        }
      const response = await axios.post(`${baseURL}/ade-woocart/v1/cart?username=<username>`, data,config);
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
          text1:  state.cartdata.message,
          position: 'bottom',
          visibilityTime: 1500,
        });
      })

      .addCase(addToCart.rejected, (state, action) => {
        state.loa = false;
        state.err = action.error.message || 'An error occurred';
      });
  },
});

export default AddToCartSlice.reducer;
