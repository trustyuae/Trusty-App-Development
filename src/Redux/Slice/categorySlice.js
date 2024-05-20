import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getCategories} from '../../Services/categoryApi';

export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async () => {
    const response = await getCategories();
    return response;
  },
);

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    categoryStatus: 'idle',
    categoryError: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.categoryStatus = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoryStatus = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categoryStatus = 'failed';
        state.categoryError = action.error.message;
      });
  },
});
export default categorySlice.reducer;
