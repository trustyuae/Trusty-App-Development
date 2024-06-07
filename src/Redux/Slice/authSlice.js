import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '../../Utils/API';
import { USER_SIGNUP_REQUEST } from '../../Constants/UserConstants';
import Toast from 'react-native-toast-message';

export const signupUser = createAsyncThunk(
  USER_SIGNUP_REQUEST,
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseURL}/custom-woo-api/v1/register`,
        userData,
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        // Customize the error messages based on the response from the server
        if (error.response.data.code === 'email_already_registered') {
          return rejectWithValue('This email is already taken/registered');
        }
        // Add more cases as needed
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue('An unknown error occurred');
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
          visibilityTime: 2000,
        });
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: action.payload || 'An error occurred',
          visibilityTime: 4000,
        });
      });
  },
});

export default authSlice.reducer;
