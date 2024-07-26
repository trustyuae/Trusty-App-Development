import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getRedytoGo} from '../../Services/readytogoApi';

export const fetchRedyToGo = createAsyncThunk(
  'redytogo/fetchRedyToGo',
  async () => {
    const response = await getRedytoGo();
    return response;
  },
);

const ready_to_go = createSlice({
  name: 'redytogo',
  initialState: {
    redytogoProducts: [],
    redytogoStatus: 'idle',
    redytogoError: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchRedyToGo.pending, state => {
        state.redytogoStatus = 'loading';
      })
      .addCase(fetchRedyToGo.fulfilled, (state, action) => {
        state.redytogoStatus = 'succeeded';
        state.redytogoProducts = action.payload;
      })
      .addCase(fetchRedyToGo.rejected, (state, action) => {
        state.redytogoStatus = 'failed';
        state.redytogoError = action.error.message;
      });
  },
});
export default ready_to_go.reducer;
