import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 1. Define the Async Thunk
export const handshake = createAsyncThunk(
  // Action type string
  'user/handshake',
  
  // The payload creator is an async function
  async (userId, { rejectWithValue }) => {
    try {
      return await axios(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(res => res)
      .catch(err => { throw err });
    
    } catch (error) {
      // Return a custom error message to be used as action.payload for 'rejected'
      return rejectWithValue(error.message); 
    }
  }
);
