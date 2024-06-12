import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {ORDER_TO_CART, UPDATE_CART} from '../../../Constants/UserConstants';
import {
  Consumer_key,
  Consumer_secret,
  baseURL,
  dummyurl,
} from '../../../Utils/API';
import Toast from 'react-native-toast-message';
import {getToken} from '../../../Utils/localstorage';

export const updateToCart = createAsyncThunk(
  UPDATE_CART,
  async (data, {rejectWithValue}) => {
    try {
      let token = await getToken();

      const response = await axios.put(
        `${baseURL}/custom-woo-api/v1/cart/`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
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
  isloading: false,
  iserror: null,
  updatedata: null,
};

const UpdateToCartSlice = createSlice({
  name: 'UpdateToCart',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(updateToCart.pending, state => {
        state.isloading = true;
        state.iserror = null;
      })

      .addCase(updateToCart.fulfilled, (state, action) => {
        state.isloading = false;
        state.updatedata = action.payload;
        // Toast.show({
        //   type: 'success',
        //   text1: 'update',
        //   position: 'bottom',
        //   visibilityTime: 1500,
        // });
      })

      .addCase(updateToCart.rejected, (state, action) => {
        state.isloading = false;
        state.iserror = action.error.message || 'An error occurred';
      });
  },
});

export default UpdateToCartSlice.reducer;
