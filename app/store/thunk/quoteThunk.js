import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { EXPO_BOOKING_BASE_URL } from '@env';
const API_BOOKING_URL = EXPO_BOOKING_BASE_URL;

export const getBookingListThunk = createAsyncThunk(
  'quote/getBookingListThunk',
  async ({ userID }, thunkAPI) => {
    try {
      console.log("USER ID IN THUNK:", userID);
      const response = await axios.get(`${API_BOOKING_URL}/api/booking/getBookingsByUserID`,
        { params: { userID } }
      );
      console.log("Response in Thunk:", response);

      return response.data.data;

    } catch (error) {
      if (error.status === 404) {
        return thunkAPI.rejectWithValue('No bookings found.');
      }
      return thunkAPI.rejectWithValue(error.response?.data || 'Error fetching Booking List');
    }
  }
);

export const fetchQuotesByBookingId = createAsyncThunk(
  'quote/fetchQuotesByBookingId',
  async (bookingId, thunkAPI) => {
    try {
      // const state = thunkAPI.getState();
      // const phoneNo = state.quotes?.userDetails?.phoneNo;
      // const response = await axios.get(`/users/${phoneNumber}`);
      const response = await require(`../../../assets/mockAPI/quotesAPI.json`);
      return response;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error fetching Booking List');
    }
  }
);