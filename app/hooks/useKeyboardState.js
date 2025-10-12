import { useEffect, useState } from 'react';
import {  Keyboard, Platform } from 'react-native';

/**
 * Custom hook to track the visibility and height of the software keyboard.
 * * @returns {object} An object containing:
 * - isKeyboardVisible: boolean indicating if the keyboard is open.
 * - keyboardHeight: number representing the height of the visible keyboard.
 */
export const useKeyboardStatus = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    // Determine the appropriate events for the current platform
    // 'Will' events are often used for animated transitions on iOS,
    // but 'Did' events are more reliable for confirming the final state.
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    // 1. Subscribe to the 'show' event
    const keyboardShowListener = Keyboard.addListener(
      showEvent,
      (e) => {
        setKeyboardVisible(true);
        // The height is found in endCoordinates
        setKeyboardHeight(e.endCoordinates.height); 
      },
    );

    // 2. Subscribe to the 'hide' event
    const keyboardHideListener = Keyboard.addListener(
      hideEvent,
      () => {
        setKeyboardVisible(false);
        setKeyboardHeight(0);
      },
    );

    // 3. Cleanup: Remove listeners when the component unmounts
    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
    
  }, []); // Empty dependency array ensures subscriptions are set up once

  // Return the status variables
  return {
    isKeyboardVisible,
    keyboardHeight,
  };
};