// src/Redux/Slice/searchProductSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://wordpress.trustysystem.com/wp-json/wc/v3/products';
const API_URL1 = 'https://wordpress.trustysystem.com/wp-json/custom-woo-api/v1/products';

const CONSUMER_KEY = 'ck_604dffdbe6cb804616978b0b6a04bae3de51db57';
const CONSUMER_SECRET = 'cs_a508308d959ceb307994082b20b01cf9fedc2fef';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const api1 = axios.create({
    baseURL: API_URL1,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchSearchProducts = createAsyncThunk(
    'searchProduct/fetchSearchProducts',
    async () => {
        const response = await api1.get(`/search`, {
            params: {

                consumer_key: CONSUMER_KEY,
                consumer_secret: CONSUMER_SECRET,

            },
        });
        return response.data;
    }
);

export const fetchDefaultProducts = createAsyncThunk(
    'searchProduct/fetchDefaultProducts',
    async ({ page = 1, limit = 10 }) => {
        const response = await api.get('', {
            params: {
                consumer_key: CONSUMER_KEY,
                consumer_secret: CONSUMER_SECRET,
                page,
                per_page: limit,
            },
        });
        return response.data;
    }
);

const searchProductSlice = createSlice({
    name: 'searchProduct',
    initialState: {
        products: [],
        status: 'idle',
        error: null,
        page: 1,
    },
    reducers: {
        resetSearchProducts: state => {
            state.products = [];
            state.page = 1;
            state.status = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSearchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload; // Assuming the payload is an array of products
            })
            .addCase(fetchSearchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(fetchDefaultProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDefaultProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
                state.page += 1;
            })
            .addCase(fetchDefaultProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { resetSearchProducts } = searchProductSlice.actions;

export default searchProductSlice.reducer;
