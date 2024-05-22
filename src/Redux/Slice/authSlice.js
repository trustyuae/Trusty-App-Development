import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {baseURL} from '../../Utils/API';
import {USER_SIGNUP_REQUEST} from '../../Constants/UserConstants';
import Toast from 'react-native-toast-message';

export const signupUser = createAsyncThunk(
  USER_SIGNUP_REQUEST,
  async (userData, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        `${baseURL}/custom-woo-api/v1/register`,
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
        Toast.show({
          type: 'success',
          text1: 'Signup Successful',
          position: 'bottom',
          visibilityTime: 1000,
        });
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
        Toast.show({
          type: 'error',
          text1: action.error.message,
          visibilityTime: 2000,
        });
      });
  },
});

export default authSlice.reducer;
