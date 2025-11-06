import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Sample thunk to fetch user data
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (phoneNumber, thunkAPI) => {
    try {
      // const response = await axios.get(`/users/${phoneNumber}`);
      const response = await axios.get(`/assets/users.json`);
      return response.data.login;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error fetching user');
    }
  }
);

export const registerUserThunk = createAsyncThunk(
  'user/registerUser',
  async (phoneNo,thunkAPI) => {
    try {
      console.log('Registering User with Phone No :' + phoneNo);
      // const response = await axios.post('/register', { phoneNo});
      const response = await require('../../../assets/mockAPI/registerUserResponse.json');
      return response;
    } catch (error) {
      console.log('Error in registering user :' + error);
      return thunkAPI.rejectWithValue(error.response?.data || 'Error registering user');
    }
  }
);

export const validateOTPThunk = createAsyncThunk(
  'user/validateOTP',
  async (OTP, thunkAPI) => {
    try {
      // const response = await axios.post('/validate-otp', { OTP });
      const response = await require('../../../assets/mockAPI/validateOTP.json');
      if (response.status === false) {
        return thunkAPI.rejectWithValue('OTP validation failed');
      }
      return response;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error validating OTP');
    }
  }
);