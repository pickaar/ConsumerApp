import { createAsyncThunk } from "@reduxjs/toolkit";

export const getVendorDetails = createAsyncThunk(
  'feedback/getVendorDetails',
  async (thunkAPI) => {
    try {
      const response = await require(`../../../assets/mockAPI/getVendorDetails.json`);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error fetching Feedback');
    }
  }
);

export const getFeedbackList = createAsyncThunk(
  'feedback/getFeedbackList',
  async (thunkAPI) => {
    try {
      const response = await require(`../../../assets/mockAPI/getFeedbacklistAPI.json`);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error fetching Feedback');
    }
  }
);