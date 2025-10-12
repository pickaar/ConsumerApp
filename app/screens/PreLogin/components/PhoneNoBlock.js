import {View, StyleSheet, Text} from 'react-native';
import {useRef, useState} from 'react';
import {PBtn} from '../../../components/brick/button';
import * as Animatable from 'react-native-animatable';
import {themeColors} from '../../../utils/constant';
import {PInputFilled, PInputOutlined} from '../../../components/brick/inputs';
import {fonts} from '../../../utils/theme';
import {useDispatch} from 'react-redux';
// import CALL_SAGA from '../../../store/sagas/types/types'
import {PToast} from '../../../components/brick/PToast';
import {useKeyboardStatus} from '../../../hooks/useKeyboardState';
// import { setParam } from '../../../store/reducers/userReducer';

const proceeBtnObj = {
  label: 'Proceed',
  icon: 'navigate-next',
};

const PhoneNoBlock = () => {
  // const dispatch = useDispatch();
  const phoneNoValueRef = useRef('');
  const {isKeyboardVisible} = useKeyboardStatus();
  const validatePhoneNo = () => {
    /*Validation and sending OTP logic will goes here
            @return true = redirect to OTP block
        */
    const phoneNo = phoneNoValueRef.current;
    if (phoneNo.length > 8 && phoneNo.length < 12) {
      // DO FCM notification here and enable
      // dispatch(setParam({ key: "isPhoneNoValidateStatus", value: true }))
      // dispatch(setParam({ key: "phoneNo", value: phoneNo }))

      
    } else {
      PToast({
        message: 'Please enter valid Phone Number to Proceed.',
        time: 'SHORT',
        type:'error'
      });
    }
  };

  return (
    <Animatable.View
      animation="bounceInUp"
      duraton="2500"
      style={[styles.container, {flex: 1}]}
    >
      <View style={{flex: 1}}>
        <View>
          {!isKeyboardVisible && (
            <Text fontFamily={fonts.RubikBold} style={[styles.title]}>
              Welcome to Pickaar !
            </Text>
          )}
          {!isKeyboardVisible && (
            <Text
              fontFamily={fonts.RubikMedium}
              style={{fontSize: 10, paddingHorizontal: 9}}
            >
              Best place to find affordable rides.
            </Text>
          )}
        </View>
      </View>
      <View style={styles.fieldsContainer}>
        <View style={{marginTop: 40}}>
          {isKeyboardVisible && (
            <View style={{marginBottom: 5}}>
              <Text>Enter Phone Number</Text>
            </View>
          )}
          <PInputOutlined
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
              label: 'Proceed',
              outlinedBtn: false,
              icon: {
                isRequired: false,
                name: 'navigate-next',
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
