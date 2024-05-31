import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {PARTNER_PERFECT} from '../../Constants/UserConstants';
import {Consumer_key, Consumer_secret, baseURL} from '../../Utils/API';
import Toast from 'react-native-toast-message';
import axios from 'axios';

export const PartnerPerfect = createAsyncThunk(
  PARTNER_PERFECT,
  async (id, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `${baseURL}/wc/v3/products?category=${id}`,
        {
          auth: {
            username: Consumer_key,
            password: Consumer_secret,
          },
        },
      );
      console.log('id---------------->', id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

const initialState = {
  load: false,
  errormessage: null,
  partner: null,
};

const PerfectPatnerSlice = createSlice({
  name: 'PatnerGet',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(PartnerPerfect.pending, state => {
        state.load = true;
        state.errormessage = null;
      })
      .addCase(PartnerPerfect.fulfilled, (state, action) => {
        state.load = false;
        state.partner = action.payload;
      })
      .addCase(PartnerPerfect.rejected, (state, action) => {
        state.load = false;
        state.errormessage = action.error.message;
        Toast.show({
          type: 'error',
          text1: action.error.message,
          visibilityTime: 2000,
        });
      });
  },
});

export default PerfectPatnerSlice.reducer;
