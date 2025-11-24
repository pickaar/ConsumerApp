import React, { useEffect, useState } from 'react';
import OtpInputContainer from "@screens/PreLogin/components/OtpInputContainer";
import { View, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import { PBtn } from "@components/brick/button";
import * as Animatable from 'react-native-animatable';
import { themeColors, API_CALL_STATUS } from "@utils/constant";
import { useAppDispatch } from '@app/store/store';
import { createUserThunk } from '@thunk/userThunk';
import { PToast } from '@components/brick/PToast';
import { useAppSelector } from '@store/hook';
import { setError, setErrorMessage } from '@reducer/userSlice';

// Define the initial resend timer duration
const RESEND_TIMER_DURATION = 80;

const OTPBlock = () => {
    const dispatch = useAppDispatch();
    const hasError = useAppSelector(state => state.user.error);
    const phoneNo = useAppSelector(state => state.user.userData.phoneNo);
    const errorMessage = useAppSelector(state => state.user.errorMessage);
    const otpInputRef = React.useRef(null);
    const validateOTPLoaderRejected = useAppSelector(state => state.user.loadingStatus.validateOTPLoader === API_CALL_STATUS.REJECTED);

    const [timer, setTimer] = useState(RESEND_TIMER_DURATION);

    const handleOTPSubmit = (otp) => {
        dispatch(createUserThunk({ otp, phoneNo }));
    }

    const resendOTP = () => {
        setTimer(RESEND_TIMER_DURATION);
        // Clear the OTP input fields when resending
        if (otpInputRef.current) {
            otpInputRef.current.clearOTP();
        }
    }

    // Effect for the countdown timer
    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    // Effect for displaying toast message on error
    useEffect(() => {
        if (hasError) {
            PToast({
                message: errorMessage || 'OTP Validation Failed. Please try again.',
                time: 'SHORT',
                type: 'error',
                position: 'top'
            });
            // Clear the error state after showing the toast
            dispatch(setError(false));
            dispatch(setErrorMessage(''));
            if (otpInputRef.current) {
                otpInputRef.current.clearOTP();
            }
        }
    }, [hasError, errorMessage, dispatch]);

    // Format the timer for display (MM:SS, but using 00:SS for 30 seconds)
    const formattedTimer = `${String(Math.floor(timer / 60)).padStart(2, '0')}:${String(timer % 60).padStart(2, '0')}`;

    return (
        <Animatable.View
            animation="bounceInUp"
            duration={1500}
            style={styles.container} // Added style prop to the Animatable.View
        >
            <View>
                <Text style={{ fontSize: 20, color: themeColors.black, fontWeight: 'bold', marginBottom: 20 }}>
                    Enter OTP
                </Text>

                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    minHeight: 50
                }}>
                    <OtpInputContainer ref={otpInputRef} postEnteredOTP={handleOTPSubmit} />
                </View>
                {/* Resend OTP Section */}
                <View style={styles.alignContent}>
                    {timer > 0 ? (
                        // Display the countdown timer
                        <Text style={{ fontSize: 14, color: themeColors.black }}>
                            Resend OTP in <Text style={{ fontWeight: 'bold' }}>{formattedTimer}</Text>
                        </Text>
                    ) : (
                        // Display the Resend OTP button when the timer hits 0
                        <TouchableOpacity style={{ fontSize: 14, color: themeColors.black }} onPress={resendOTP}>
                            <Text style={{ fontWeight: 'bold', color: "#b70e0eff" }}>Re-send OTP</Text>
                        </TouchableOpacity>
                    )}
                </View>


            </View>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: themeColors.yellow,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    alignContent: {
        // Updated style for better alignment and spacing of the resend section
        justifyContent: 'center',
        alignItems: 'center', // Center the button/timer horizontally
        minHeight: 50,
        marginTop: 15,
        marginBottom: 10,
    }
})

export default OTPBlock;