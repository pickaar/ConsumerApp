import { useSelector, useDispatch } from 'react-redux';

// 1. Define the RootState structure once using JSDoc (REQUIRED)
/**
 * @typedef {import('./../store').RootState} RootState 
 * // Note: You'll need to create a 'store.js' file to define RootState 
 * // if you haven't already. See Step 2.
 */

// 2. Define the reusable typed hook
/**
 * A type-safe hook for selecting data from the Redux store.
 * @type {import('react-redux').TypedUseSelectorHook<RootState>}
 */
const useAppSelector = useSelector;
export { useAppSelector };

// export { useAppSelector }; // Use this if you prefer named exports