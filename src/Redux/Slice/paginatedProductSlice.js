import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Consumer_key, Consumer_secret, baseURL } from '../../Utils/API';


export const fetchPaginatedProducts = createAsyncThunk(
    'paginatedProducts/fetchPaginatedProducts',
    async ({ page }, { getState }) => {
        const response = await axios.get(`${baseURL}/wc/v3/products`, {
            params: {
                per_page: 10,
                page,
                consumer_key: Consumer_key,
                consumer_secret: Consumer_secret,
            },

        });
        return response.data;
    }
);

const paginatedProductSlice = createSlice({
    name: 'paginatedProducts',
    initialState: {
        products: [],
        page: 1,
        status: 'idle',
        error: null,
    },
    reducers: {
        resetProducts: state => {
            state.products = [];
            state.page = 1;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchPaginatedProducts.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchPaginatedProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = [...state.products, ...action.payload];
                state.page += 1;
            })
            .addCase(fetchPaginatedProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { resetProducts } = paginatedProductSlice.actions;

export default paginatedProductSlice.reducer;
