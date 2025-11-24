import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { themeColors } from '@utils/constant';

const OtpInputContainer = forwardRef(({ postEnteredOTP }, ref) => {
    
    const [pins, setPin] = useState(
        {
            pin1: '', pin2: '', pin3: '',
            pin4: '', pin5: '', pin6: ''
        }
    );
    // 💡 FIX 1: Add a state to track if the current OTP has been submitted
    const [isSubmitted, setIsSubmitted] = useState(false); 

    const pinRefs = Array.from({ length: 6 }, () => useRef(null));

    useImperativeHandle(ref, () => ({
        clearOTP,
    }));

    // Method to clear the OTP input fields (and reset submission status)
    const clearOTP = useCallback(() => {
        setPin({
            pin1: '', pin2: '', pin3: '',
            pin4: '', pin5: '', pin6: ''
        });
        // 💡 FIX 2: Reset the submission flag when clearing the OTP
        setIsSubmitted(false); 
        pinRefs[0].current.focus();
    }, [pinRefs]);

    // Helper to send the completed OTP to the parent
    // Memoize the submission function
    const setOTPToParent = useCallback((pin) => postEnteredOTP(pin), [postEnteredOTP]);

    // Effect to check for completion and submit the OTP
    useEffect(() => {
        const allPinsEntered = Object.values(pins).every(x => x !== '');
        
        // 💡 FIX 3: Only submit if all pins are entered AND it hasn't been submitted yet
        if (allPinsEntered && !isSubmitted) {
            let pin = Object.values(pins).join('');
            setIsSubmitted(true); // Set the flag to true to prevent resubmission
            setOTPToParent(pin);
            // Optionally blur the last input after submission
            pinRefs[5].current.blur();
        } 
        
        // If the OTP is incomplete, reset the submission flag
        if (!allPinsEntered && isSubmitted) {
            setIsSubmitted(false);
        }
    }, [pins, isSubmitted, setOTPToParent, pinRefs]);

    const handleChange = (index, value) => {
        const newPin = value.replace(/[^0-9]/g, ''); // Ensure only one digit is processed
        
        setPin(prev => ({
            ...prev,
            [`pin${index + 1}`]: newPin
        }));

        if (newPin !== '') {
            // Move focus to the next input field
            if (index < 5) {
                pinRefs[index + 1].current.focus();
            }
        } else if (value === '' && index > 0) {
            // Backspace/Clear logic: Move focus to the previous input field
            pinRefs[index - 1].current.focus();
        }
        
        // 💡 FIX 4: If user starts typing again, reset the submitted state
        if (isSubmitted) {
            setIsSubmitted(false);
        }
    };

    const handleKeyPress = (index, key) => {
        if (key === 'Backspace' && pins[`pin${index + 1}`] === '' && index > 0) {
            pinRefs[index - 1].current.focus();
        }
    };

    return (
        <View style={styles.inputContainer}>
            {[...Array(6)].map((_, i) => (
                <TextInput
                    key={i}
                    autoFocus={i === 0}
                    placeholder=''
                    style={styles.inputBox}
                    ref={pinRefs[i]}
                    maxLength={1}
                    keyboardType="number-pad"
                    value={pins[`pin${i + 1}`]}
                    onChangeText={pin => handleChange(i, pin)}
                    onKeyPress={({ nativeEvent }) => handleKeyPress(i, nativeEvent.key)}
                />
            ))}
        </View>
    );
});

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    inputBox: {
        borderWidth: 2, 
        borderColor: themeColors.secondary, 
        borderRadius: 10, 
        height: 40, 
        width: 40, 
        textAlign: 'center',
        fontSize: 18,
        marginHorizontal: 5, 
    }
});

export default OtpInputContainer;