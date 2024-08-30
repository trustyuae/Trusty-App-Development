
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Consumer_key, Consumer_secret, baseURL } from '../../Utils/API';
import Toast from 'react-native-toast-message';

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (customer_id, thunkAPI) => {
    try {
      const response = await axios.get(
        `${baseURL}/wc/v3/customers/${customer_id}`,
        {
          auth: {
            username: Consumer_key,
            password: Consumer_secret,
          },
        },
      );


      return response.data;
    } catch (error) {

      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async ({ customer_id, newData }, thunkAPI) => {
    console.log("---customer_id--->", customer_id)
    try {
      const response = await axios.put(
        `${baseURL}/wc/v3/customers/${customer_id}`,
        newData,
        {
          auth: {
            username: Consumer_key,
            password: Consumer_secret,
          },
        },
      );
      Toast.show({
        type: 'success',
        text1: 'updated successfully!',
        position: 'bottom',
        visibilityTime: 3000,
        autoHide: true,
      });
      console.log('----%%%%%%%%%--->', response.data)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetProfile: state => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetProfile } = profileSlice.actions;

export default profileSlice.reducer;
