import { createSlice } from '@reduxjs/toolkit';
import { fetchOfferThunk } from '@thunk/offerThunk';

const initialState = {
    promotionBanners: [],
    loading: false,
    error: null,
};

const offerSlice = createSlice({
    name: 'offer',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // You can add async thunks here if needed in the future
        builder.addCase(fetchOfferThunk.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchOfferThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.promotionBanners = action.payload;
        })
        .addCase(fetchOfferThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});


export default offerSlice.reducer;