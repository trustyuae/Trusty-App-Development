import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://trustyuae.com/wp-json/product-category-api/v1/categories';
const API_PRODUCTS_URL = 'https://trustyuae.com/wp-json/wc/v3/products';

export const fetchCategories = createAsyncThunk(
    'categorySearch/fetchCategories',
    async () => {
        const response = await axios.get(API_URL);
        return response.data;
    }
);

export const fetchProductsByCategory = createAsyncThunk(
    'categorySearch/fetchProductsByCategory',
    async (categoryId) => {
        const response = await axios.get(`${API_PRODUCTS_URL}?category=${categoryId}`);
        return response.data;
    }
);

const categorySearchSlice = createSlice({
    name: 'categorySearch',
    initialState: {
        categories: [],
        products: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.loading = false;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchProductsByCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
                state.products = action.payload;
                state.loading = false;
            })
            .addCase(fetchProductsByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default categorySearchSlice.reducer;
