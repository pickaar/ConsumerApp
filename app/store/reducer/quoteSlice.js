import { createSlice } from "@reduxjs/toolkit";
import { getBookingListThunk } from "@thunk/quoteThunk";
import { fetchQuotesByBookingId } from "@thunk/quoteThunk";
import { createBookingThunk } from "../thunk/bookingThunk";
import { API_CALL_STATUS } from "../../utils/constant";

const initialState = {
    bookingList: [],
    selectedIndex: 0,
    quotesList: [
    ],
    detailScreenRedirectTo: '',

    
    bookingLoader: null,
    quoteItemLoader: API_CALL_STATUS.IDLE,
}

export const quoteSlice = createSlice({
    name: 'quote',
    initialState,
    reducers: {
        setQuoteParam(state, action) {
            state[action.payload.key] = action.payload.value
        },
        setQuotesList(state, action) {
            console.log("Updating quotes list in store with payload:", action.payload);
            // The action.payload is the entire quotes list from the server response
            state.quotesList = action.payload || [];
            // state.quoteItemLoader = API_CALL_STATUS.FULFILLED;
        },
        setToastMsg(state, action) {
            state.toastMsg = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createBookingThunk.fulfilled, (state, action) => {
                state.bookingList.unshift(action.payload);
            })
            .addCase(getBookingListThunk.fulfilled, (state, action) => {
                state.bookingList = action.payload;
                state.bookingLoader = API_CALL_STATUS.FULFILLED;
            })
            .addCase(getBookingListThunk.pending, (state) => {
                state.bookingLoader = API_CALL_STATUS.PENDING;
            })
            .addCase(getBookingListThunk.rejected, (state, action) => {
                state.bookingLoader = API_CALL_STATUS.REJECTED;
            })
            
            .addCase(fetchQuotesByBookingId.fulfilled, (state, action) => {
                state.quotesList = action.payload || [];
                state.quoteItemLoader = API_CALL_STATUS.FULFILLED;
            })
            .addCase(fetchQuotesByBookingId.pending, (state) => {
                state.quoteItemLoader = API_CALL_STATUS.PENDING;
            })
            .addCase(fetchQuotesByBookingId.rejected, (state, action) => {
                state.quoteItemLoader = API_CALL_STATUS.REJECTED;
            })
    }
})

export const {
    setQuoteParam,
    setQuotesList
} = quoteSlice.actions

export default quoteSlice.reducer

