import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import RootStackNavScreens from '@nav/RootStackScreen';
import { API_CALL_STATUS, SCREENS, STORAGE_KEY, themeColors } from '@utils/constant';
import { Provider } from 'react-redux';
import { store } from '@store/store';
import * as SplashScreenObj from 'expo-splash-screen';
import { useEffect, useCallback } from 'react';
import { getData } from '@utils/helperfn';
import { SplashScreen } from '@screens/PreLogin/SplashScreen';
import { useFonts } from 'expo-font';
import Toast from 'react-native-toast-message';
import { setIsLoading } from '@reducer/userSlice';
import { useAppDispatch } from '@store/store';
import { useAppSelector } from '@app/store/hook';
import { fetchUserThunk } from '@thunk/userThunk';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AntDesign, Entypo, Feather, FontAwesome, FontAwesome5, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons } from '@expo/vector-icons';
SplashScreenObj.preventAutoHideAsync();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: themeColors.white,
  },
};

function RootApp({ fontsLoaded }) {

  const dispatch = useAppDispatch();
  const { handShakeLoader } = useAppSelector(state => state.user.loadingStatus);
  const checkLoginStatus = useCallback(async () => {
    try {
      const userData = await getData(STORAGE_KEY);
      const parsedData = JSON.parse(userData);
      // console.log('From Device: ', parsedData);
      if (parsedData?.phoneNo && parsedData?.status) {
        dispatch(fetchUserThunk(parsedData.phoneNo));
      } else {
        dispatch(setIsLoading({ key: 'handShakeLoader', status: API_CALL_STATUS.REJECTED }));
      }
    } catch (e) {
      console.warn('Error checking login status:', e);
      dispatch(setIsLoading({ key: 'handShakeLoader', status: API_CALL_STATUS.REJECTED }));
    }
  }, [dispatch]);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  useEffect(() => {
    SplashScreenObj.hideAsync();
  }, [handShakeLoader]);

  let initialRoute = null;
  if (handShakeLoader === API_CALL_STATUS.REJECTED) {
    initialRoute = SCREENS.SIGN_IN;
  } else if (handShakeLoader === API_CALL_STATUS.SUCCESS) {
    initialRoute = SCREENS.HOME;
  }

  return (
    <>
      {
        initialRoute === null || handShakeLoader === API_CALL_STATUS.IDLE || !fontsLoaded ?
          <SplashScreen /> :

          <NavigationContainer theme={MyTheme}>
            <RootStackNavScreens initialRouteScreen={initialRoute} />
          </NavigationContainer>
      }</>
  );
}

export default function App() {

  const [fontsLoaded] = useFonts({
    ...Feather.font,
    ...MaterialCommunityIcons.font,
    ...MaterialIcons.font,
    ...Ionicons.font,
    ...FontAwesome.font,
    ...AntDesign.font,
    ...Entypo.font,
    ...SimpleLineIcons.font,
    ...Octicons.font,
    ...Foundation.font,

    // @ts-ignore
    'Rubik-Black': require('./assets/fonts/Rubik-Black.ttf'),
    // @ts-ignore
    'Rubik-BlackItalic': require('./assets/fonts/Rubik-BlackItalic.ttf'),
    // @ts-ignore
    'Rubik-Bold': require('./assets/fonts/Rubik-Bold.ttf'),
    // @ts-ignore

    'Rubik-BoldItalic': require('./assets/fonts/Rubik-BoldItalic.ttf'),
    // @ts-ignore
    'Rubik-ExtraBold': require('./assets/fonts/Rubik-ExtraBold.ttf'),
    // @ts-ignore
    'Rubik-ExtraBoldItalic': require('./assets/fonts/Rubik-ExtraBoldItalic.ttf'),
    // @ts-ignore
    'Rubik-Italic': require('./assets/fonts/Rubik-Italic.ttf'),
    // @ts-ignore
    'Rubik-Light': require('./assets/fonts/Rubik-Light.ttf'),
    // @ts-ignore
    'Rubik-LightItalic': require('./assets/fonts/Rubik-LightItalic.ttf'),
    // @ts-ignore
    'Rubik-Medium': require('./assets/fonts/Rubik-Medium.ttf'),
    // @ts-ignore
    'Rubik-MediumItalic': require('./assets/fonts/Rubik-MediumItalic.ttf'),
    // @ts-ignore
    'Rubik-Regular': require('./assets/fonts/Rubik-Regular.ttf'),
    // @ts-ignore
    'Rubik-SemiBold': require('./assets/fonts/Rubik-SemiBold.ttf'),
    // @ts-ignore
    'Rubik-SemiBoldItalic': require('./assets/fonts/Rubik-SemiBoldItalic.ttf'),
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <View style={styles.container}>
          <RootApp fontsLoaded={fontsLoaded} />
          <Toast />
        </View>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.white,
  },
});
