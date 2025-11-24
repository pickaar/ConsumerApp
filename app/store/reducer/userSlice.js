import { createSlice } from '@reduxjs/toolkit';
import { fetchUserThunk, createUserThunk, validateOTPThunk, sendOTPThunk } from '@thunk/userThunk';
import { API_CALL_STATUS, ONLOAD_STATUS } from '@utils/constant';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: {
      userID: null,
      phoneNo: null,
      userName: null,
      profileImage: null,
      loginState: false,
      locations: [
        {
          name: "Home",
          address: null,
          isPrimary: true
        }
      ]
    },
    loadingStatus: {
      handShakeLoader: ONLOAD_STATUS.IDLE,
      registerUserLoader: API_CALL_STATUS.IDLE,
      validateOTPLoader: API_CALL_STATUS.IDLE
    },
    error: null,
    errorMessage: ''
  },

  reducers: {
    setIsLoading(state, action) {
      const { key, status } = action.payload;
      state.loadingStatus[key] = status;
    },
    setPhoneNo(state, action) {
      state.userData.phoneNo = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setErrorMessage(state, action) {
      state.errorMessage = action.payload;
    }
  },

  extraReducers: builder => {
    builder

      .addCase(sendOTPThunk.fulfilled, (state, action) => {
        state.loadingStatus.registerUserLoader = API_CALL_STATUS.SUCCESS;
      })
      .addCase(sendOTPThunk.rejected, (state, action) => {
        state.loadingStatus.registerUserLoader = API_CALL_STATUS.REJECTED;
      })


      .addCase(createUserThunk.fulfilled, (state, action) => {
        state.loadingStatus.validateOTPLoader = API_CALL_STATUS.SUCCESS;
        state.userData.loginState = true;
      })
      .addCase(createUserThunk.rejected, (state, action) => {
        state.userData.loginState = false;
        state.error = true;
        state.errorMessage = action.payload.message || 'Error with OTP validation';
        state.loadingStatus.validateOTPLoader = API_CALL_STATUS.REJECTED;
      })

      .addCase(fetchUserThunk.fulfilled, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(fetchUserThunk.rejected, (state, action) => {
        state.error = action.payload;
      });

  },
});

const { setIsLoading, setPhoneNo, setError, setErrorMessage } = userSlice.actions;
export { setIsLoading, setPhoneNo, setError, setErrorMessage };
export default userSlice.reducer;
