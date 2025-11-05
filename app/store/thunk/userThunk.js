import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// 1. Define the Async Thunk
export const handshake = createAsyncThunk(
  // Action type string
  'user/handshake',

  // The payload creator is an async function
  async (userId, {rejectWithValue}) => {
    try {
      return await axios
        .post(
          'https://localhost:8080/users/register',
          {userId}, // Pass userId in the request body as JSON
        )
        .then(res => res)
        .catch(err => {
          throw err;
        });
    } catch (error) {
      // Return a custom error message to be used as action.payload for 'rejected'
      return rejectWithValue(error.message);
    }
  },
);

export const registerUserThunk = createAsyncThunk(
  // Action type string
  'user/registerUserThunk',

  // The payload creator is an async function
  async (phoneNumber, {rejectWithValue}) => {
    try {
      return await axios
        .post(
          'http://127.0.0.1:65072/users/register',
          { phoneNumber}, // Pass userId in the request body as JSON
        )
        .then(res => res)
        .catch(err => {
          alert(`Error: ${err.message || 'Unknown error occurred.'}`);
          throw err;
        });
    } catch (error) {
      // Return a custom error message to be used as action.payload for 'rejected'
      return rejectWithValue(error.message);
    }
  },
);
