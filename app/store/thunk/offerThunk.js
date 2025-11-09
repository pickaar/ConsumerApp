import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/**
 * @Get call to fetch user data based on phone number
 */
export const fetchOfferThunk = createAsyncThunk(
  'offers/fetchOffers',
  async (phoneNo, thunkAPI) => {
    try {
      // const response = await axios.get(`/users/${phoneNumber}`);
      const response = await require(`../../../assets/mockAPI/offerAPI.json`);
      return response;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error fetching Offers');
    }
  }
);