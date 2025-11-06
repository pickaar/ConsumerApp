import React from 'react';
import OtpInputContainer from "@screens/PreLogin/components/OtpInputContainer";
import { View, Text, StyleSheet } from 'react-native';
import { PBtn } from "@components/brick/button";
import * as Animatable from 'react-native-animatable';
import { themeColors } from "@utils/constant";
import { useAppDispatch } from '@app/store/store';
import { validateOTPThunk } from '@thunk/userThunk';
// import CALL_SAGA from '../../../store/sagas/types/types';
// import { useDispatch } from 'react-redux';

const OTPBlock = () => {

    const dispatch = useAppDispatch();

    const getOTP = (OTP) => {
       dispatch(validateOTPThunk(OTP));
    }

    const ValidateOTP1 = (OTP) => {
        // dispatch({
        //     type: CALL_SAGA.REQUEST_CREATE_NEW_ACCOUNT,
        //     serviceId: 101,
        //     deviceId: '987-23423-234-234-234',
        //     phoneNo: phoneNo,
        //     serviceName: 'ValidateOTP'
        // });
        // dispatch({
        //     type: CALL_SAGA.REQUEST_VALIDATE_OTP,
        //     serviceId: 100,
        //     serviceName: 'OTPValidate',
        //     OTP: OTP,
        //     deviceID: '2354234-2345-2345-234'
        // })
    }

    return (
        <Animatable.View
            animation="bounceInUp"
            duration={1500}
            style={[styles.container, { flex: 0.8 }]}>
            <View style={{ flex: 1, width: '100%', flexDirection: 'column', justifyContent: 'flex-end' }}>

                <View style={[styles.alignContent]}>
                    <OtpInputContainer
                        postEnteredOTP={getOTP} />
                </View>
                <View style={[styles.alignContent, { alignItems: 'center' }]}>
                    <Text style={{ fontSize: 14 }}>OTP sent to your mobile number.</Text>
                </View>

                {/* <View >
                    <PBtn
                        config={{
                            label: 'Continue',
                            icon: {
                                isRequired: false,
                            }
                        }}
                        onPress={ValidateOTP} />
                </View> */}
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
        flex: 1,
        justifyContent: 'center',
        minHeight: 50
    }
})
export default OTPBlock;