import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { EXPO_USER_BASE_URL } from '@env';
import { STORAGE_KEY, USER_DATA_SLICE_INITIAL_STATE } from '@utils/constant';
import { storeData } from '@utils/helperfn';

const API_USER_URL = EXPO_USER_BASE_URL;

/**
 * @Get call to fetch user data based on phone number
 */
export const fetchUserThunk = createAsyncThunk(
  'user/fetchUser',
  async (phoneNo, thunkAPI) => {
    try {
      const response = await axios.get(`${API_USER_URL}/api/cust/user/fetchUser/${phoneNo}`);
      if (response.status === 404) {
        return thunkAPI.rejectWithValue(response?.message);
      }
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error fetching user');
    }
  }
);

/**
 * @Patch call to update user data based on phone number
 */
export const updateUserThunk = createAsyncThunk(
  'user/updateUser',
  async ({ phoneNo, userName, emailId, ...rest }, thunkAPI) => {
    try {
      const response = await axios.patch(`${API_USER_URL}/api/cust/user/updateUser`, { phoneNo, userName, emailId, ...rest });
      if (response.status === 404) {
        return thunkAPI.rejectWithValue(response?.message);
      }
      console.log('Update User Response:', response.data);
      
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error fetching user');
    }
  }
);

/**
 * @Post call to register user with phone number
 * Only empty object with user phone number will be created initially
 */
export const sendOTPThunk = createAsyncThunk(
  'user/sendOTP',
  async (phoneNo, thunkAPI) => {
    try {
      const response = await axios.post(`${API_USER_URL}/api/cust/user/sendOTP`, { phoneNo });

      return response.data;
    } catch (error) {
      console.log('Error in registering user :' + error);
      return thunkAPI.rejectWithValue(error.response?.data || 'Error registering user');
    }
  }
);

/**
 * @Post call to register user with phone number
 * Only empty object with user phone number will be created initially
 */
export const createUserThunk = createAsyncThunk(
  'user/createUser',
  async ({ otp, phoneNo }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_USER_URL}/api/cust/user/createUser`, { otp, phoneNo });

      if (response.status === 401)
        return thunkAPI.rejectWithValue(response?.message);

      return response?.data;

    } catch (error) {
      console.log('Error in registering user :' + error);
      return thunkAPI.rejectWithValue(error.response?.data || 'Error registering user');
    }
  }
);

/**
 * @Patch call to update user status after OTP validation
 * Now PhoneNo and status will be updated
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