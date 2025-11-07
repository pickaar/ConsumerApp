import { createSlice } from '@reduxjs/toolkit';
import { fetchUserThunk, registerUserThunk, validateOTPThunk } from '@thunk/userThunk';
import { API_CALL_STATUS, ONLOAD_STATUS } from '@utils/constant';
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: {
      userID: null,
      phoneNo: null,
      userName: null,
      profileImage: null,
      loginState: true,
      locations: [
        {
          name: "Home",
          address: null
        }
      ]
    },
    loadingStatus: {
      handShakeLoader: ONLOAD_STATUS.IDLE,
      registerUserLoader: API_CALL_STATUS.IDLE,
      validateOTPLoader: API_CALL_STATUS.IDLE
    },
    error: null,
  },

  reducers: {
    setIsLoading(state, action) {
      const { key, status } = action.payload;
      state.loadingStatus[key] = status;
    },
    setPhoneNo(state, action) {
      state.userData.phoneNo = action.payload;
    }
  },

  extraReducers: builder => {
    builder
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.loadingStatus.registerUserLoader = API_CALL_STATUS.SUCCESS;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loadingStatus.registerUserLoader = API_CALL_STATUS.REJECTED;
      })


      .addCase(validateOTPThunk.fulfilled, (state, action) => {
        state.loadingStatus.validateOTPLoader = API_CALL_STATUS.SUCCESS;
        state.userData.loginState = true;
      })
      .addCase(validateOTPThunk.rejected, (state, action) => {
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

const { setIsLoading,setPhoneNo } = userSlice.actions;
export { setIsLoading,setPhoneNo };
export default userSlice.reducer;
