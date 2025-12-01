import { createSlice } from "@reduxjs/toolkit";
import { fetchTollDetailsThunk } from "@thunk/bookingThunk";
import { createBookingThunk } from "@thunk/bookingThunk";

const initialAddress = {
    flatHouseNo: null,
    buildingStreet: null,
    locality: null,
    landmark: null,
    city: null,
    state: null,
    pincode: null,
    address: null,
    coordinates: [],
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
    tollRouteResponse: null,
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
        loader(state, action) {
            state.loading = action.payload.status;
        },
    }, extraReducers: (builder) => {
        builder
            .addCase(fetchTollDetailsThunk.fulfilled, (state, action) => {
                console.log('Toll Details Fetched:', action.payload);
                state.tollDetail = action.payload;
                state.distance = action.payload?.distance || "NA";
                state.duration = action.payload?.duration || "NA";
                state.isTollAvailable = action.payload?.tollAvailable || false;
                state.tollRouteResponse = true;
                state.loading = false;
            })
            .addCase(fetchTollDetailsThunk.rejected, (state, action) => {
                state.tollDetail = {};
                state.tollRouteResponse = false;
            })
            .addCase(createBookingThunk.fulfilled, (state, action) => {
                state.tollRouteResponse = false;
                state.bookingLevelTwoResponse = action.payload;
                state.loading = false;
                state.bookingCompletionStatus = true;
            })
            .addCase(createBookingThunk.rejected, (state, action) => {
                state.loading = false;
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
