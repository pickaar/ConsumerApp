import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/**
 * @Get call to fetch toll data based on pickup and drop locations
 */
export const fetchTollDetailsThunk = createAsyncThunk(
  'booking/fetchTollDetailsThunk',
  async (thunkAPI) => {
    try {
      // const response = await axios.get(`/users/${phoneNumber}`);
      const response = await require(`../../../assets/mockAPI/tollAPI.json`);
      return response;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error fetching Toll Details');
    }
  }
);