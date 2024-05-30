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
import {getUsername} from '../../../Utils/localstorage';
import {useEffect} from 'react';

export const deleteToCart = createAsyncThunk(
  ADD_TO_CART,
  async (id, {rejectWithValue}) => {
    try {
      const config = {
        auth: {
          username: Consumer_key,
          password: Consumer_secret,
        },
      };

      let useremail = await getUsername();

      const response = await axios.post(
        `${baseURL}/ade-woocart/v1/cart/delete?username=${useremail}`,
        id,
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
  erros: null,
  deteltedData: null,
};

const DeleteToCartSlice = createSlice({
  name: 'DeleteToCart',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(deleteToCart.pending, state => {
        state.loading = true;
        state.erros = null;
      })

      .addCase(deleteToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.deteltedData = action.payload;
        Toast.show({
          type: 'success',
          text1: state.deteltedData.message,
          position: 'bottom',
          visibilityTime: 1500,
        });
      })

      .addCase(deleteToCart.rejected, (state, action) => {
        state.loading = false;
        state.erros = action.error.message || 'An error occurred';
      });
  },
});

export default DeleteToCartSlice.reducer;
