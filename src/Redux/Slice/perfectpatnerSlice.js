import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {PARTNER_PERFECT} from '../../Constants/UserConstants';
import {baseURL} from '../../Utils/API';
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
            username: 'ck_74025587053512828ec315f206d134bc313d97cb',
            password: 'cs_72ca42854e72b72e3143a14d79fd0a91c649fbeb',
          },
        },
      );

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
