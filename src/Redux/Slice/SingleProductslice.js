import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { GET_SINGLE_PRODUCT } from '../../Constants/UserConstants';
import { Consumer_key, Consumer_secret, baseURL } from '../../Utils/API';

export const fetchById = createAsyncThunk(
  GET_SINGLE_PRODUCT,
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/wc/v3/products/${id}`, {
        auth: {
          username: Consumer_key,
          password: Consumer_secret,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const initialState = {
  loading: false,
  error: null,
  responseData: null,
};

const getByIdSlice = createSlice({
  name: 'getById',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchById.pending, state => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchById.fulfilled, (state, action) => {
        state.loading = false;
        state.responseData = action.payload;
      })

      .addCase(fetchById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default getByIdSlice.reducer;
