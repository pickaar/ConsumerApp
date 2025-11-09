import { createSlice } from "@reduxjs/toolkit";
import { fetchTollDetailsThunk } from "@thunk/bookingThunk";
const initialAddress = {
    flatHouseNo: null,
    buildingStreet: null,
    locality: null,
    landmark: null,
    city: null,
    state: null,
    pincode: null,
}
const initialState = {
    pickupAddress: initialAddress,
    dropAddress: initialAddress,
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
        setAddress(state, action) {
            const { addressType, address } = action.payload;
            if (addressType === 'pickup') {
                state.pickupAddress = address;
            } else if (addressType === 'drop') {
                state.dropAddress = address;
            }
        },
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
        loader(state, action) {
            state.loading = action.payload.status;
        },
    }, extraReducers: (builder) => {
        builder
            .addCase(fetchTollDetailsThunk.fulfilled, (state, action) => {
                debugger
                state.tollDetail = action.payload;
                state.distance = action.payload?.distance || "NA";
                state.duration = action.payload?.duration || "NA";
                state.tollRouteResponse = true;
                state.loading = false;
            })
            .addCase(fetchTollDetailsThunk.rejected, (state, action) => {
                state.tollDetail = {};
                state.tollRouteResponse = true;
            });
    }
})

// Action creators are generated for each case reducer function
export const {
    setAddress,
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
