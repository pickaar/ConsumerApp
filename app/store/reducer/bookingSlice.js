import { createSlice } from "@reduxjs/toolkit";
import { fetchTollDetailsThunk } from "@thunk/bookingThunk";
import { createBookingThunk } from "@thunk/bookingThunk";
import { API_CALL_STATUS } from "../../utils/constant";

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
    distance: {text: '', value: 0},
    duration: {text: '', value: 0},
    isTollAvailable: false,
    isBookingForOthers: false,
    OthersPhoneNo: null,
    OthersName: null,
    isSingleWomen: false,

    bookingLevelOneResponse: {},
    tollLoader: null,
    confirmationLoader: null,
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
        setTollLoader(state, action) {
            state.tollLoader = action.payload.status;
        },
         setConfirmationLoader(state, action) {
            state.confirmationLoader = action.payload.status;
        },
    }, extraReducers: (builder) => {
        builder
            .addCase(fetchTollDetailsThunk.pending, (state) => {
                state.tollLoader = API_CALL_STATUS.PENDING;
            })
            .addCase(fetchTollDetailsThunk.fulfilled, (state, action) => {
            
                state.distance = action.payload?.distance || "NA";
                state.duration = action.payload?.duration || "NA";
                state.isTollAvailable = action.payload?.tollAvailable || false;
                // state.tollRouteResponse = true;
                state.tollLoader = API_CALL_STATUS.SUCCESS;
            })
            .addCase(fetchTollDetailsThunk.rejected, (state, action) => {
                state.tollLoader = API_CALL_STATUS.REJECTED;

            })
            .addCase(createBookingThunk.pending, (state) => {
                state.confirmationLoader = API_CALL_STATUS.PENDING;
            })
            .addCase(createBookingThunk.fulfilled, (state, action) => {
                state.bookingLevelTwoResponse = action.payload;
                state.confirmationLoader = API_CALL_STATUS.SUCCESS;
            })
            .addCase(createBookingThunk.rejected, (state, action) => {
                state.confirmationLoader = API_CALL_STATUS.REJECTED;
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
    setTollLoader,
    setConfirmationLoader
} = bookingSlice.actions

export default bookingSlice.reducer
