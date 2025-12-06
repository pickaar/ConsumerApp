import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { EXPO_USER_BASE_URL } from '@env';
const API_USER_URL = EXPO_USER_BASE_URL;

export const fetchFeedback = createAsyncThunk(
  'feedback/fetchFeedback',
  async ({ vendorId }, thunkAPI) => {
    try {
      const response = await axios.get(`${API_USER_URL}/api/vendor/feedback/getFeedbackById/${vendorId}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error fetching Feedback');
    }
  }
);