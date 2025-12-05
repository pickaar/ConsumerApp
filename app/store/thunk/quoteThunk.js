import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { EXPO_BOOKING_BASE_URL } from '@env';
const API_BOOKING_URL = EXPO_BOOKING_BASE_URL;

export const getBookingListThunk = createAsyncThunk(
  'quote/getBookingListThunk',
  async ({ userID }, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BOOKING_URL}/api/booking/getBookingsByUserID`,
        { params: { userID } }
      );
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
  async ( {bookingId} , thunkAPI) => {
    try {
      const response = await axios.get(`${API_BOOKING_URL}/api/quote/getQuotes/${bookingId}`);
      console.log("Fetched quotes response:", response.data.data);
      return response.data.data;

    } catch (error) {
      console.log("Error fetching quotes:", error);
      return thunkAPI.rejectWithValue(error.response?.data || 'Error fetching Booking List');
    }
  }
);