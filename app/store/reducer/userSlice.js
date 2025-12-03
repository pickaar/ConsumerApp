import { createSlice } from '@reduxjs/toolkit';
import { fetchUserThunk, createUserThunk, sendOTPThunk, updateUserThunk } from '@thunk/userThunk';
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
        },
        {
          name: "Work",
          address: null,
          isPrimary: false,
          flatHouseNo: '',
          buildingStreet: '',
          locality: '',
          landmark: '',
          city: '',
          state: '',
          pincode: '',
        },
        {
          name: "Other",
          address: null,
          isPrimary: false,
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
      validateOTPLoader: API_CALL_STATUS.IDLE,
      updateUserLoader: API_CALL_STATUS.IDLE,
      updateLocationLoader: API_CALL_STATUS.IDLE,
    },
    error: null,
    errorMessage: ''
  },

  reducers: {
    setIsLoading(state, action) {
      const { key, status } = action.payload;
      state.loadingStatus[key] = status;
    },
    setUserNameAndEmail(state, action) {
      const { userName, emailId } = action.payload;
      state.userData.userName = userName;
      state.userData.emailId = emailId;
    },
    setPhoneNo(state, action) {
      state.userData.phoneNo = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setErrorMessage(state, action) {
      state.errorMessage = action.payload;
    },
    setLocation(_State, action) {
      const { name, address, isPrimary, flatHouseNo, buildingStreet, locality, landmark, city, state, pincode } = action.payload;
      const locationIndex = _State.userData.locations.findIndex(loc => loc.name.trim() === name.trim());
      const newLocation = {
        name,
        address,
        isPrimary,
        flatHouseNo,
        buildingStreet,
        locality,
        landmark,
        city,
        state,
        pincode,
      };
      if (isPrimary) {
        // Set all other locations to isPrimary false
        _State.userData.locations = _State.userData.locations.map(loc => ({
          ...loc,
          isPrimary: false
        }));
      }
      if (locationIndex !== -1) {
        _State.userData.locations[locationIndex] = newLocation;
      } else {
        _State.userData.locations.push(newLocation);
      }
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

      .addCase(updateUserThunk.fulfilled, (state, action) => {
        if (state.loadingStatus.updateUserLoader === API_CALL_STATUS.PENDING)
          state.loadingStatus.updateUserLoader = API_CALL_STATUS.SUCCESS;
        if (state.loadingStatus.updateLocationLoader === API_CALL_STATUS.PENDING)
          state.loadingStatus.updateLocationLoader = API_CALL_STATUS.SUCCESS;

      })
      .addCase(updateUserThunk.rejected, (state, action) => {
         if (state.loadingStatus.updateUserLoader === API_CALL_STATUS.PENDING)
          state.loadingStatus.updateUserLoader = API_CALL_STATUS.REJECTED;
        if (state.loadingStatus.updateLocationLoader === API_CALL_STATUS.PENDING)
          state.loadingStatus.updateLocationLoader = API_CALL_STATUS.REJECTED;
      })

      .addCase(fetchUserThunk.fulfilled, (state, action) => {
        state.loadingStatus.handShakeLoader = API_CALL_STATUS.SUCCESS;
        const { _id, phoneNo, status, userName, emailId, profileImage, emergencyContacts, createdOn,
          locations
        } = action.payload;
        console.log('fetchUserThunk action.payload', action.payload);
        state.userData.userID = _id;
        state.userData.phoneNo = phoneNo;
        state.userData.status = status;
        state.userData.userName = userName;
        state.userData.emailId = emailId;
        state.userData.profileImage = profileImage;
        state.userData.emergencyContacts = emergencyContacts;
        state.userData.createdOn = createdOn;
        if (locations && Array.isArray(locations) && locations.length > 0) {
          state.userData.locations = locations;
        }
        // state.userData.locations = locations;

      })
      .addCase(fetchUserThunk.rejected, (state, action) => {
        state.loadingStatus.handShakeLoader = API_CALL_STATUS.REJECTED;
      });

  },
});

const { setIsLoading, setPhoneNo, setError, setErrorMessage, setUserNameAndEmail, setLocation } = userSlice.actions;
export { setIsLoading, setPhoneNo, setError, setErrorMessage, setUserNameAndEmail, setLocation };
export default userSlice.reducer;
