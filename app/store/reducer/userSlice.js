import { createSlice } from '@reduxjs/toolkit';
import { handshake, registerUserThunk } from '../thunk/userThunk';
import { ONLOAD_STATUS } from '@utils/constant';
export const userSlice = createSlice({
  name: 'user',


  initialState: {
    userData: null,
    isLoading: ONLOAD_STATUS.IDLE, 
    error: null,
  },


  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(registerUserThunk.pending, state => {
        // state.isLoading = 'pending';
        // state.error = null;
        // alert(`Registration successful: ${action.payload?.successmsg || 'No message provided.'}`);
        //
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        alert(
          // `Registration successful: ${action.payload?.successmsg || 'No message provided.'}`,
        );
        // state.isLoading = 'succeeded';
        // state.userData = action.payload; // Payload is the data returned from the async function
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        alert(`Rejected: ${action.payload || 'No error message provided.'}`);

        // state.isLoading = 'failed';
        // state.error = action.payload || 'Failed to fetch user data.'; // Payload is the value from rejectWithValue
      });
  },
});

const { setIsLoading } = userSlice.actions;
export { setIsLoading };
export default userSlice.reducer;
