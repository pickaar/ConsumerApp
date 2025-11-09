import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pickupAddress: {},
    dropAddress: {},
    pickUpDate: null,
    pickUpTime: null,
    vehicleType: 'HATCHBACK',
    seaters: 5,
    tripType: 1,
    tripTypeDetail: 'ONE WAY',
    returnDate: null,
    comments: '',
    distance: '',
    duration: '',
    isTollAvailable: false,
    tollDetail: {},
    isBookingForOthers: false,
    OthersPhoneNo: null,
    OthersName: null,
    isSingleWomen: false,

    bookingLevelOneResponse: {},
    loading: false,
    bookingErrMSG: '',
    tollRouteResponse: false,
    bookingLevelOneStatus: false,
    bookingLevelOneMsg: '',
    bookingLevelTwoResponse: {},
    bookingCompletionStatus: false,
    bookingLevelTwoMsg: '',
    termAndCondition: false,
    bookingList: [

    ],
    bookingQuotesList: [
    ],
}

export const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setBookingParam(state, action) {
            const { key, value } = action.payload;
            if (key in state) {
                state[key] = value;
            }
        },
        onSuccessfulLevelOneBooking(state, action) {
            state.bookingLevelOneResponse = action.payload;
            state.loading = false;
            state.bookingLevelOneStatus = true;

        },
        onFailureLevelOneBooking(state, action) {
            state.bookingLevelOneStatus = true;
            state.loading = false;
            state.bookingLevelOneMsg = '';

        },
        onSuccessNewBooking(state, action) {
            state.bookingLevelTwoResponse = action.payload;
            state.loading = false;
            state.bookingCompletionStatus = true;
            //Set BookingId 
            const bookingId = action.payload.data._id;
            state.bookingList.push(bookingId)

            console.log(action.payload.data._id)
        },
        onFailureNewBooking(state, action) {
            state.bookingCompletionStatus = true;
            state.loading = false;
            state.bookingLevelTwoMsg = '';
        },
        onSuccessTollRoute(state, action) {
            state.tollDetail = action.payload.data;
            state.distance = action.payload.data?.distance || "NA";
            state.duration = action.payload.data?.duration || "NA";
            state.tollRouteResponse = true;
            state.loading = false;
        },
        onFailureTollRoute(state, action) {
            state.tollDetail = {};
            state.tollRouteResponse = true;
        },
        loader(state, action) {
            state.loading = action.payload.status;
        },

    }
})

// Action creators are generated for each case reducer function
export const {
    setBookingParam,
    onSuccessfulLevelOneBooking,
    onFailureLevelOneBooking,
    onSuccessNewBooking,
    onFailureNewBooking,
    onSuccessTollRoute,
    onFailureTollRoute,
    loader
} = bookingSlice.actions

export default bookingSlice.reducer
