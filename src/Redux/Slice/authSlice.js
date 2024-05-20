import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        'https://ghostwhite-guanaco-836757.hostingersite.com/wp-json/custom-woo-api/v1/register',
        userData,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(signupUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
