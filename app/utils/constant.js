export const STORAGE_KEY = '@userData';

export const themeColors = {
  // primary: '#2A2A2A',
  primary: '#000',
  secondary: 'rgb(59, 59, 59)',
  light: 'rgb(247, 247, 247)',
  yellow: '#FFCC57',
  gray: '#aeaaaa',
  white: '#ffffff',
  lightGray: '#ebeaeaa6',
  lightGray2: '#ebeaead6',
  darkGray: '#484f59',
  lightYellow: '#fcb5122e',
  recommendedBgColor: '#099a7dfc',
  chepestBgColor: '#5188f9',
  infoHighlightColor: '#2667c5'
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
 * @typedef {'DASHBOARD' |'SIGN_IN' } stackscreens
 */

/** @type {{[key in stackscreens]: stackscreens}} */

export const SCREENS = Object.freeze({
  DASHBOARD: 'DASHBOARD',
  SIGN_IN: 'SIGN_IN',
});
