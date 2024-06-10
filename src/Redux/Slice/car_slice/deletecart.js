import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {DELETE_TO_CART} from '../../../Constants/UserConstants';
import {
  Consumer_key,
  Consumer_secret,
  baseURL,
  dummyurl,
} from '../../../Utils/API';
import Toast from 'react-native-toast-message';
import {getToken} from '../../../Utils/localstorage';
import {useEffect} from 'react';

export const deleteToCart = createAsyncThunk(
  DELETE_TO_CART,
  async (data, {rejectWithValue}) => {
    try {
      let token = await getToken();
      const response = await axios.delete(
        `${baseURL}/custom-woo-api/v1/cart`,
        {
          headers: {
            'Authorization':`Bearer ${token}`,
          },
        },
        data
      );
    
      return response.data;
    }catch (error) {
      console.log('error-------------------------------->', error);
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
          text1: 'Remove successfully',
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
