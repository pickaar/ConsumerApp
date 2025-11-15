import { createSlice } from "@reduxjs/toolkit";
import { getBookingListThunk } from "@thunk/quoteThunk";
import { fetchQuotesByBookingId } from "@thunk/quoteThunk";

const initialState = {
    bookingList: [],
    bookingLoader: true,
    quoteItemLoader: true,
    selectedIndex: 0,
    quotesList: [
        // {
        //     bookingId: null,
        //     bookingType: null,
        //     quotesList: []
        // }   
    ],
    detailScreenRedirectTo: ''
}

export const quoteSlice = createSlice({
    name: 'quote',
    initialState,
    reducers: {
        setQuoteParam(state, action) {
            state[action.payload.key] = action.payload.value
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBookingListThunk.fulfilled, (state, action) => {
                state.bookingList = action.payload;
                state.bookingLoader = false;
            })
            .addCase(getBookingListThunk.pending, (state) => {
                state.bookingLoader = true;
            })
            .addCase(getBookingListThunk.rejected, (state, action) => {
                state.bookingLoader = false;
            })

            .addCase(fetchQuotesByBookingId.fulfilled, (state, action) => {
                state.quotesList = action.payload.quotesList || [];
                state.quoteItemLoader = false;
            })
            .addCase(fetchQuotesByBookingId.pending, (state) => {
                state.quoteItemLoader = true;
            })
            .addCase(fetchQuotesByBookingId.rejected, (state, action) => {
                state.quoteItemLoader = false;
            })
    }
})

export const {
    setQuoteParam
} = quoteSlice.actions

export default quoteSlice.reducer
