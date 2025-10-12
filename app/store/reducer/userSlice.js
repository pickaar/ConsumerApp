import { createSlice } from '@reduxjs/toolkit';
import { handshake } from '../thunk/userThunk';
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    isLoading: 'idle', // 'idle' | 'pending' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // Standard synchronous reducers go here (e.g., clearUser: ...)
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(handshake.pending, (state) => {
        state.isLoading = 'pending';
        state.error = null;
      })
      .addCase(handshake.fulfilled, (state, action) => {
        state.isLoading = 'succeeded';
        state.userData = action.payload; // Payload is the data returned from the async function
      })
      .addCase(handshake.rejected, (state, action) => {
        state.isLoading = 'failed';
        state.error = action.payload || 'Failed to fetch user data.'; // Payload is the value from rejectWithValue
      });
  },
});

export default userSlice.reducer;