import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducer/userSlice';
import offerSlice from './reducer/offerSlice';
import { useDispatch } from 'react-redux';
import modalSlice from './reducer/modalSlice';
import bookingSlice from './reducer/bookingSlice';
import quoteSlice from './reducer/quoteSlice';
import feedbackSlice from './reducer/feedbackSlice';
import { socketMiddleware } from './middleware/socketMiddleware';


/**
 * @typedef {object} RootState
 * @property {ReturnType<typeof userSlice>} user
 * // Add other slices here:
 * // property {ReturnType<typeof someOtherReducer>} someOtherSlice
 */

// Configure the store. Thunk is automatically added.
export const store = configureStore({
  reducer: {
    user: userSlice, // Add your slice reducers here
    offer: offerSlice,
    modal: modalSlice,
    booking: bookingSlice,
    quote: quoteSlice,
    feedback: feedbackSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),
});

// TypeScript: Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();