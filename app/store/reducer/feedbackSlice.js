import { createSlice } from '@reduxjs/toolkit';
import { getFeedbackList, getVendorDetails } from '@thunk/feebackThunk';

const initialState = {
    user: {
        userInfo: {
            name: '',
            exp: '',
            language: '',
            completedTrip: 0,
            badgesScored: 0,
            aboutMe: '',
            profileImgSrc: '../../../../assets/driver_avatar.png'
        },
        ratings: {
            rating: 0,
            completedTrip: 0,
            ratingForEach: []
        },
        scoredBadgesWithTotal: []
    },
    feedbackList: [],
    vendorDetailsLoader: true,
    feedbackLoader: true
};

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {
        addFeedback: (state, action) => {
            // state.feebackList.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getVendorDetails.fulfilled, (state, action) => {
            state.user = action.payload;
            state.vendorDetailsLoader = false;
        })
        .addCase(getVendorDetails.pending, (state) => {
            state.vendorDetailsLoader = true;
        })
        .addCase(getFeedbackList.fulfilled, (state, action) => {
            console.log("Feedback List:", action.payload);
            state.feedbackList = action.payload;
            state.feedbackLoader = false;
        })
        .addCase(getFeedbackList.pending, (state) => {
            state.feedbackLoader = true;
        });
    }
});

export const { addFeedback } = feedbackSlice.actions;

export default feedbackSlice.reducer;