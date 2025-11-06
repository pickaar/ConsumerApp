import { createSlice } from '@reduxjs/toolkit';
import { registerUserThunk, validateOTPThunk } from '@thunk/userThunk';
import { API_CALL_STATUS, ONLOAD_STATUS } from '@utils/constant';
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    loadingStatus:{
      handShakeLoader: ONLOAD_STATUS.IDLE, 
      registerUserLoader: API_CALL_STATUS.IDLE,
      validateOTPLoader: API_CALL_STATUS.IDLE
    },
    error: null,
  },

  reducers: {
    setIsLoading(state, action) {
      state.loadingStatus.handShakeLoader = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.loadingStatus.registerUserLoader = API_CALL_STATUS.SUCCESS;
        state.userData = action.payload;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loadingStatus.registerUserLoader = API_CALL_STATUS.REJECTED;
      })


      .addCase(validateOTPThunk.fulfilled, (state, action) => {
        state.loadingStatus.validateOTPLoader = API_CALL_STATUS.SUCCESS;
        state.userData = action.payload;
      })
      .addCase(validateOTPThunk.rejected, (state, action) => {
        state.loadingStatus.validateOTPLoader = API_CALL_STATUS.REJECTED;
      });
  },
});

const { setIsLoading } = userSlice.actions;
export { setIsLoading };
export default userSlice.reducer;
