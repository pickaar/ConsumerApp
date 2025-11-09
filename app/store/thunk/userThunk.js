import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/**
 * @Get call to fetch user data based on phone number
 */
export const fetchUserThunk = createAsyncThunk(
  'user/fetchUser',
  async (phoneNo, thunkAPI) => {
    try {
      // const response = await axios.get(`/users/${phoneNumber}`);
      const response = await require(`../../../assets/mockAPI/existingUserAPI.json`);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error fetching user');
    }
  }
);

/**
 * @Post call to register user with phone number
 * Only empty object with user phone number will be created initially
 */
export const registerUserThunk = createAsyncThunk(
  'user/registerUser',
  async (phoneNo, thunkAPI) => {
    try {
      // const response = await axios.post('/register', { phoneNo});
      const response = await require('../../../assets/mockAPI/registerUserResponse.json');
      return response;
    } catch (error) {
      console.log('Error in registering user :' + error);
      return thunkAPI.rejectWithValue(error.response?.data || 'Error registering user');
    }
  }
);


/**
 * @Patch call to update user status after OTP validation
 * Now PhoneNo and loginState will be updated
*/
export const validateOTPThunk = createAsyncThunk(
  'user/validateOTP',
  async (_, thunkAPI) => {
    try {
      // @ts-ignore
      const state = thunkAPI.getState();
      // @ts-ignore
      // const response = await axios.patch('/update', { phoneNo });
      const response = await require('../../../assets/mockAPI/userAPI.json');

      return response;

    } catch (error) {
      console.log('Error in validating OTP :' + error);
      // @ts-ignore
      return thunkAPI.rejectWithValue(error.response?.data || 'Error validating OTP');
    }
  }
);