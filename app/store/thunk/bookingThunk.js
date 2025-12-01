import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { EXPO_BOOKING_BASE_URL } from '@env';

const API_BOOKING_URL = EXPO_BOOKING_BASE_URL;
const selectBookingData = (state) => {
  // Destructure only the necessary fields from the state.booking slice
  const {
    pickupAddress, dropAddress, pickUpDate, pickUpTime,
    vehicleType, seaters, tripType, tripTypeDetail,
    returnDate, comments, distance, duration,
    isTollAvailable, tollDetail, isBookingForOthers,
    OthersPhoneNo, OthersName, isSingleWomen,
  } = state.booking;
  const { phoneNo, userName, emailId } = state.user.userData;

  // Return an object containing all the required booking fields
  return {
    pickupAddress, dropAddress, pickUpDate, pickUpTime,
    vehicleType, seaters, tripType, tripTypeDetail,
    returnDate, comments, distance, duration,
    isTollAvailable, tollDetail, isBookingForOthers,
    OthersPhoneNo, OthersName, isSingleWomen,
    user: { phoneNo, userName, emailId }
  }
};

/**
 * @Get call to fetch toll data based on pickup and drop locations
 */
export const fetchTollDetailsThunk = createAsyncThunk(
  'booking/fetchTollDetailsThunk',
  async ({ fromAddress, toAddress }, thunkAPI) => {
    try {

      const response = await axios.get(`${API_BOOKING_URL}/api/booking/tollRoute`,
        { params: { from: fromAddress, to: toAddress } }
      );

      if (response.status === 404) {
        return {"distance": "Not Available", "duration": "Not Available", "tollAvailable": false}
      }

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error fetching Toll Details');
    }
  }
);

/**
 * @Post Booking confirmation call to create a new booking
 */
export const createBookingThunk = createAsyncThunk(
  'booking/createBookingThunk',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const bookingDetails = selectBookingData(state);
      const response = await axios.post(`${API_BOOKING_URL}/api/booking/newBooking`, { ...bookingDetails });
      // const response = await require(`../../../assets/mockAPI/bookingConfirmationAPI.json`);
      return response;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error fetching Booking Confirmation');
    }
  }
);
