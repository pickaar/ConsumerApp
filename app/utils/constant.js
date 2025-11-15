import { Dimensions } from 'react-native';

export const DEVICE_WIDTH = Dimensions.get('window').width;
export const DEVICE_HEIGHT = Dimensions.get('window').height;
export const TAB_BAR_HEIGHT = 50;
export const STORAGE_KEY = '@userData';

export const themeColors = {
  // primary: '#2A2A2A',
  primary: '#000',
  secondary: 'rgb(59, 59, 59)',
  light: 'rgb(247, 247, 247)',
  yellow: '#FFCC57',
  gray: '#aeaaaa',
  white: '#ffffff',
  lightGray: '#b0aeaea6',
  lightGray2: '#ebeaead6',
  darkGray: '#e7e9ecff',
  lightYellow: '#fcb5122e',
  recommendedBgColor: '#099a7dfc',
  chepestBgColor: '#5188f9',
  infoHighlightColor: '#2667c5',
  black: '#000000',
  lightBlack: '#2a2a2aff',
}


// src/constants/FileStatus.js

/**
 * @typedef {'IDLE' | 'SUCCESS' | 'FAILED' } FileStatus
 */

/** @type {{[key in FileStatus]: FileStatus}} */
export const ONLOAD_STATUS = Object.freeze({
  IDLE: 'IDLE',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
});


/**
 * @typedef {'IDLE' | 'SUCCESS' | 'REJECTED' } ApiCallStatus
 */

/** @type {{[key in ApiCallStatus]: ApiCallStatus}} */

export const API_CALL_STATUS = Object.freeze({
  IDLE: 'IDLE',
  SUCCESS: 'SUCCESS',
  PENDING: 'PENDING',
  REJECTED: 'REJECTED',
});


/**
 * @typedef {'DASHBOARD' |'SIGN_IN' | 'BOOKING'} stackscreens
 */

/** @type {{[key in stackscreens]: stackscreens}} */

export const SCREENS = Object.freeze({
  HOME: 'HOME',
  MAIN: 'MAIN',
  DASHBOARD: 'DASHBOARD',
  SIGN_IN: 'SIGN_IN',
  BOOKING: 'BOOKING',
  BOOKING_GET_DETAILS: 'BOOKING_GET_DETAILS',
  BOOKING_CONFIRMATION: 'BOOKING_CONFIRMATION',
  ACTIVE_BOOKING: 'ACTIVE_BOOKING',
  BOOKING_LIST: 'BOOKING_LIST',
  BOOKING_DETAIL: 'BOOKING_DETAIL',
  FEEDBACK: 'FEEDBACK',
  DIRECT_BOOKING: 'DIRECT_BOOKING',
  SETTINGS: 'SETTINGS',
  MAIN_SETTINGS: 'MAIN_SETTINGS',
  LOCATION_SETTINGS: 'LOCATION_SETTINGS',
  RIDES_SETTINGS: 'RIDES_SETTINGS',
});
