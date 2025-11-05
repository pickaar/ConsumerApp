// import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, StatusBar, Text} from 'react-native';
// import {localStorageKeys} from '../../utils/constant';
// import {getData} from '../../utils/helperfn';
import LottieView from 'lottie-react-native';
// import PAlert from '../../utils/Alert';
// import {useDispatch, useSelector} from 'react-redux';
// import CALL_SAGA from '../../store/sagas/types/types';
// import { useDispatch, useSelector } from 'react-redux';
import loadingAnimation from '@assets/lottie/splashscreen-loader.json';

import { SafeAreaView } from 'react-native-safe-area-context';

export const SplashScreen = () => {
  const animationRef = useRef(null);

  return (
    // <SafeAreaView style={styles.appContaine</View>r}>
      <View style={styles.container}>
          <Text style={{color:"white"}}>Splach Screen</Text>
        {/* <LottieView
          ref={animationRef}
          source={loadingAnimation}
          style={{height: 200}}
        //   source={require('../../../assets/lottie/splashscreen-loader.json')}
          autoPlay={true}
          onAnimationFinish={onAnimationFinish}
        ></LottieView> */}
        {/* <Text style={styles.loaderTxt}>{loaderText}</Text> */}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loaderTxt: {
    fontSize: 10,
  },
});
