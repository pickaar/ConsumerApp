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
    quoteItemLoader: true,
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
            .addCase(createBookingThunk.fulfilled, (state, action) => {
                const {_id} = action.payload;
                const existingIndex = state.bookingList.findIndex(booking => booking._id === _id);
                if (existingIndex !== -1) {
                    state.bookingList[existingIndex] = action.payload;
                } else {
                    state.bookingList.unshift(action.payload);
                }
            })
            .addCase(getBookingListThunk.fulfilled, (state, action) => {
                state.bookingList = action.payload;
                console.log("Booking List in Reducer:", state.bookingList);
                state.bookingLoader = API_CALL_STATUS.FULFILLED;
            })
            .addCase(getBookingListThunk.pending, (state) => {
                state.bookingLoader = API_CALL_STATUS.PENDING;
            })
            .addCase(getBookingListThunk.rejected, (state, action) => {
                console.log("Error in reducer:", action.payload);
                state.bookingLoader = API_CALL_STATUS.REJECTED;
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

/// BOOKING LIST SAMPLE DATA - 
// {
//   bookingStatus: false,
//   userID: new ObjectId('692f8f43ce9b727c5d9d5b4c'),
//   pickupAddress: {
//     latlng: { type: 'Point', coordinates: [Array] },
//     flatHouseNo: null,
//     buildingStreet: 'Kelambakkam - Vandalur Rd, Rajan Nagar, Chennai, Tamil Nadu 600127, India',
//     locality: 'Chennai',
//     landmark: null,
//     city: 'Chennai',
//     state: 'Tamil Nadu',
//     address: 'VIT Chennai, Kelambakkam - Vandalur Road, Rajan Nagar, Chennai, Tamil Nadu, India',
//     pincode: 600127
//   },
//   dropAddress: {
//     latlng: { type: 'Point', coordinates: [Array] },
//     flatHouseNo: null,
//     buildingStreet: 'Katpadi Jct, KRS Nagar, Katpadi, Vellore, Tamil Nadu 632007, India',
//     locality: 'Katpadi',
//     landmark: null,
//     city: 'Vellore',
//     state: 'Tamil Nadu',
//     address: 'Katpadi Railway Station, Katpadi Junction, KRS Nagar, Katpadi, Vellore, Tamil Nadu, India',
//     pincode: 632007
//   },
//   pickUpDate: 2025-12-02T13:16:16.000Z,
//   vehicleType: 'HATCHBACK',
//   seaters: 5,
//   tripType: 1,
//   returnDate: null,
//   comments: 'Yes',
//   distance: { text: '10.5 km', value: 10500 },
//   duration: { text: '25 mins', value: 1500 },
//   isTollAvailable: true,
//   isBookingForOthers: false,
//   OthersPhoneNo: null,
//   OthersName: null,
//   isSingleWomen: true,
//   pickaarCommission: 2100,
//   _id: new ObjectId('692f947eca0358f041f175e7'),
//   __v: 0
// }