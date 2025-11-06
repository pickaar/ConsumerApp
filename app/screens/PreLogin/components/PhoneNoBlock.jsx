import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useRef, useState } from 'react';
import { PBtn } from '@components/brick/button';
import * as Animatable from 'react-native-animatable';
import { themeColors } from '@utils/constant';
import { PInputOutlined } from '@components/brick/inputs';
import { fonts } from '@utils/theme';
import { PToast } from '@components/brick/PToast';
import { useKeyboardStatus } from '@hooks/useKeyboardState';
import { registerUserThunk } from '@thunk/userThunk';
import { useAppDispatch } from '@app/store/store';

const proceeBtnObj = {
  label: 'Proceed',
  icon: 'navigate-next',
};

const PhoneNoBlock = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch = useAppDispatch();
  const phoneNoValueRef = useRef('');
  const { isKeyboardVisible } = useKeyboardStatus();
  const validatePhoneNo = () => {
    /*Validation and sending OTP logic will goes here
            @return true = redirect to OTP block
        */
    const phoneNo = phoneNoValueRef.current;
    if (phoneNo.length > 1 && phoneNo.length < 12) {
      // DO FCM notification here and enable
      // @ts-ignore
      dispatch(registerUserThunk('+91' + phoneNo));
      setIsProcessing(true);
    } else {
      PToast({
        message: 'Please enter valid Phone Number to Proceed.',
        time: 'SHORT',
        type: 'error',
        position: 'top', // or 'top', depending on your UI preference
      });
    }
  };

  return (
    <Animatable.View
      animation="bounceInUp"
      duration={2500}
      style={[styles.container, { flex: 1 }]}
    >
      <View style={{ flex: 1 }}>
        <View>
          {!isKeyboardVisible && (
            <Text style={[styles.title, { fontFamily: fonts.RubikBold }]}>
              Welcome to Pickaar !
            </Text>
          )}
          {!isKeyboardVisible && (
            <Text
              style={{ fontSize: 10, paddingHorizontal: 9, fontFamily: fonts.RubikMedium }}
            >
              Best place to find affordable rides.
            </Text>
          )}
        </View>
      </View>
      <View style={styles.fieldsContainer}>
        <View style={{ marginTop: 40 }}>
          {isKeyboardVisible && (
            <View style={{ marginBottom: 5 }}>
              <Text style={{ fontFamily: fonts.RubikMedium }}>Enter Phone Number</Text>
            </View>
          )}
          <PInputOutlined
            editable={!isProcessing ? true : false}
            keyboardType="phone-pad"
            config={{
              maxLength: 12,
              keyboardType: 'phone-pad',
              styles: {},
            }}
            onTextChange={phoneNo => {
              phoneNoValueRef.current = phoneNo;
            }}
          />
        </View>
        <View>
          <PBtn
            config={{
              label: !isProcessing ? 'Proceed' : 'Processing...',
              outlinedBtn: false,
              icon: {
                isRequired: false,
                name: !isProcessing ? 'navigate-next' : 'cached',
              },
            }}
            onPress={validatePhoneNo}
          />
        </View>
      </View>
    </Animatable.View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: themeColors.yellow,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.RubikBold,
    color: themeColors.primary,
  },
  fieldsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
});
export default PhoneNoBlock;
