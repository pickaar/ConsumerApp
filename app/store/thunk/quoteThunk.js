import { createAsyncThunk } from "@reduxjs/toolkit";

export const getBookingListThunk = createAsyncThunk(
  'quote/getBookingListThunk',
  async ( thunkAPI) => {
    try {
      // const state = thunkAPI.getState();
      // const phoneNo = state.quotes?.userDetails?.phoneNo;
      // const response = await axios.get(`/users/${phoneNumber}`);
      const response = await require(`../../../assets/mockAPI/bookingListAPI.json`);
      return response;

    } catch (error) {
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