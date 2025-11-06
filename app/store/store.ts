import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducer/userSlice';
import { useDispatch ,useSelector} from 'react-redux';
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
  },
});

// TypeScript: Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();