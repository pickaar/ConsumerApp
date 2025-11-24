import { createSlice } from '@reduxjs/toolkit';
import { fetchUserThunk, createUserThunk,  sendOTPThunk } from '@thunk/userThunk';
import { API_CALL_STATUS, ONLOAD_STATUS } from '@utils/constant';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: {
      userID: null,
      phoneNo: null,
      userName: null,
      profileImage: null,
      status: false,
      emailId: null,
      emergencyContacts: [],
      createdOn: null,
      locations: [
        {
          name: "Home",
          address: null,
          isPrimary: true,
          flatHouseNo: '',
          buildingStreet: '',
          locality: '',
          landmark: '',
          city: '',
          state: '',
          pincode: '',
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
        state.userData.status = true;
      })
      .addCase(createUserThunk.rejected, (state, action) => {
        state.userData.status = false;
        state.error = true;
        state.errorMessage = action.payload.message || 'Error with OTP validation';
        state.loadingStatus.validateOTPLoader = API_CALL_STATUS.REJECTED;
      })

      .addCase(fetchUserThunk.fulfilled, (state, action) => {
        state.loadingStatus.handShakeLoader = API_CALL_STATUS.SUCCESS;
        const { phoneNo, status, userName, emailId, profileImage, emergencyContacts, createdOn,
          locations
        } = action.payload;
        state.userData.phoneNo = phoneNo;
        state.userData.status = status;
        state.userData.userName = userName;
        state.userData.emailId = emailId;
        state.userData.profileImage = profileImage;
        state.userData.emergencyContacts = emergencyContacts;
        state.userData.createdOn = createdOn;
        state.userData.locations = locations;

      })
      .addCase(fetchUserThunk.rejected, (state, action) => {
        state.loadingStatus.handShakeLoader = API_CALL_STATUS.REJECTED;
      });

  },
});

const { setIsLoading, setPhoneNo, setError, setErrorMessage } = userSlice.actions;
export { setIsLoading, setPhoneNo, setError, setErrorMessage };
export default userSlice.reducer;
