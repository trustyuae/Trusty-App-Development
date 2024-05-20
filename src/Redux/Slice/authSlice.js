import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {baseURL} from '../../Utils/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  USER_LOGIN_REQUEST,
  USER_LOGOUT_REQUEST,
} from '../../Constants/UserConstants';
import Toast from 'react-native-toast-message';


export const logoutUser = createAsyncThunk(
  USER_LOGOUT_REQUEST,
  async (_, {rejectWithValue}) => {
    try {
      await AsyncStorage.removeItem('token');
      return true; 
    } catch (error) {
      return rejectWithValue(
        error.message || 'An error occurred during logout',
      );
    }
  },
);

export const loginUser = createAsyncThunk(
  USER_LOGIN_REQUEST,
  async (data, {rejectWithValue}) => {
    try {
      const response = await axios.post(`${baseURL}/custom/v1/login`, data);
      await AsyncStorage.setItem(
        'token',
        JSON.stringify(response?.data?.jwt_token),
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

const initialState = {
  loading: false,
  error: null,
  userData: null,
};


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
     // Handling login actions
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          position: 'bottom',
          visibilityTime: 1000,
        });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
        Toast.show({
          type: 'error',
          text1: action.error.message,
          visibilityTime: 2000,
        });
      })
      // Handling logout actions
      .addCase(logoutUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.loading = false;
        state.userData = null; 
        Toast.show({
          type: 'success',
          text1: 'Logout Successful',
          position: 'bottom',
          visibilityTime: 1000,
        });
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred during logout';
        Toast.show({
          type: 'error',
          text1: action.error.message,
          visibilityTime: 2000,
        });
      });
  },
});

export default userSlice.reducer;
