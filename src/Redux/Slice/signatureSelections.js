// // src/slices/signatureSelectionsSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getSignatureSelections } from '../../Services/signatureSelections';

// export const fetchSignatureSelections = createAsyncThunk(
//     'signatureSelections/fetchSignatureSelections',
//     async () => {
//         const response = await getSignatureSelections();

//         console.log("RESsssssdasfdsf---------------------------------", response)
//         return response;
//     }
// );

// const signatureSelectionsSlice = createSlice({
//     name: 'getGignatureSelections',
//     initialState: {
//         signatureSelectionsProducts: [],
//         signatureSelectionsStatus: false,
//         signatureSelectionsError: null,
//     },
//     reducers: {},
//     extraReducers: builder => {
//         builder
//             .addCase(fetchSignatureSelections.pending, state => {
//                 console.log("66676t46235764523674567325476234576234576235476235426374523675467235427365472364572635472634523765")
//                 state.signatureSelectionsStatus = true;
//             })
//             .addCase(fetchSignatureSelections.fulfilled, (state, action) => {
//                 state.signatureSelectionsStatus = false;
//                 state.signatureSelectionsProducts = action.payload;
//             })
//             .addCase(fetchSignatureSelections.rejected, (state, action) => {
//                 state.signatureSelectionsStatus = false;
//                 state.signatureSelectionsError = action.error.message;
//             });
//     },
// });

// export default signatureSelectionsSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSignatureSelections } from '../../Services/signatureSelections';

export const getSignatureSelectionsData = createAsyncThunk(
    'signatureSelections/fetchSignatureSelections',
    async () => {
        const response = await getSignatureSelections();
        return response;
    },
);

const getSignatureSelection = createSlice({
    name: 'signatureSelections',
    initialState: {
        signatureSelectionsData: [],
        isSignatureSelections: 'idle',
        signatureSelectionsError: null,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getSignatureSelectionsData.pending, state => {
                state.isSignatureSelections = 'loading';
            })
            .addCase(getSignatureSelectionsData.fulfilled, (state, action) => {
                state.isSignatureSelections = 'succeeded';
                state.signatureSelectionsData = action.payload;
            })
            .addCase(getSignatureSelectionsData.rejected, (state, action) => {
                state.isSignatureSelections = 'failed';
                state.signatureSelectionsError = action.error.message;
            });
    },
});
export default getSignatureSelection.reducer;
