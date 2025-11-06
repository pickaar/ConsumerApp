import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {  ONLOAD_STATUS, themeColors } from '@utils/constant';
import pickaarLogo from '@assets/logo.png';
import * as Animatable from 'react-native-animatable';
import PhoneNoBlock from '@screens/PreLogin/components/PhoneNoBlock';
import OTPBlock from '@screens/PreLogin/components/OTPBlock';
import { useAppSelector } from '@app/store/hook';

export default function SignInScreen(props) {
  const registerUserLoader = useAppSelector(state => state.user.loadingStatus.registerUserLoader === ONLOAD_STATUS.SUCCESS);
  const validateOTPLoader = useAppSelector(state => state.user.loadingStatus.validateOTPLoader === ONLOAD_STATUS.SUCCESS);

  if(validateOTPLoader){
    props.navigation.replace('dashboard');
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.topHalf}>
        <StatusBar backgroundColor={themeColors.white} barStyle="dark-content" />
        <View style={styles.header}>
          <Animatable.Image
            animation="bounceIn"
            duration={1500}
            source={pickaarLogo}
            style={styles.image}
          />
        </View>
      </View>
      <KeyboardAvoidingView
        style={styles.bottomHalfContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        {!registerUserLoader? (
          <PhoneNoBlock />
        ) : (
          <OTPBlock ValidateOTP={true} />
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.light,
  },
  topHalf: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeColors.light,
  },
  bottomHalfContainer: {
    flex: 6,
    backgroundColor: themeColors.yellow,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
});
