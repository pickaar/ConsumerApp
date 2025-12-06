import { createSlice } from '@reduxjs/toolkit';
import { getFeedbackList, getVendorDetails } from '@thunk/feebackThunk';
import { API_CALL_STATUS } from '../../utils/constant';
import { fetchFeedback, getFeedbackThunk } from '../thunk/feebackThunk';

const initialState = {
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
    scoredBadgesWithTotal: [],
    feedbackList: [],
    feedbackLoader: API_CALL_STATUS.IDLE,
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
        builder
            .addCase(fetchFeedback.fulfilled, (state, action) => {
                const { userInfo, ratings, scoredBadgesWithTotal, feedbacks } = action.payload;
                state.userInfo = userInfo;
                state.ratings = ratings;
                state.scoredBadgesWithTotal = scoredBadgesWithTotal;
                state.feedbackList = feedbacks;
                state.feedbackLoader = API_CALL_STATUS.FULFILLED;
            })
            .addCase(fetchFeedback.pending, (state) => {
                state.feedbackLoader = API_CALL_STATUS.PENDING;
            })
            .addCase(fetchFeedback.rejected, (state) => {
                state.feedbackLoader = API_CALL_STATUS.REJECTED;
            });
    }
});

export const { addFeedback } = feedbackSlice.actions;

export default feedbackSlice.reducer;