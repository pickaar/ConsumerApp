import { StyleSheet, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import RootStackNavScreens from './app/navigators/RootStackScreen';
import { localStorageKeys, themeColors } from './app/utils/constant';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './app/store/store';
import * as SplashScreenObj from 'expo-splash-screen';
import { useEffect, useState, useCallback } from 'react';
import { getData } from './app/utils/helperfn';
import { SplashScreen } from './app/screens/PreLogin/SplashScreen';
import { useFonts } from 'expo-font';
import Toast from 'react-native-toast-message';
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
  const [isLoading, setIsLoading] = useState('Idle');
  const dispatch = useDispatch();
  const userLoadingStatus = useSelector(state => state.user.isLoading);

  const checkLoginStatus = useCallback(async () => {
    try {
      const phoneNumber = await getData(localStorageKeys.uniquePhoneNo);
      const status = await getData(localStorageKeys.loginStatus);

      if (status === 'Y' && phoneNumber) {
        dispatch({
          type: 'user/FETCH_USER_DETAILS',
          payload: { phoneNo: phoneNumber },
        });
      } else {
        setIsLoading('failed');
      }
    } catch (e) {
      console.log('Async Store Error :' + e);
      setIsLoading('failed');
    }
  }, [dispatch]);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  useEffect(() => {
    SplashScreenObj.hideAsync();
    if (userLoadingStatus === 'succeeded') setIsLoading('Succeeded');
    else if (userLoadingStatus === 'failed') setIsLoading('failed');
  }, [userLoadingStatus]);

  if (isLoading === 'Idle' || !fontsLoaded) return <SplashScreen />;

  return (
    <NavigationContainer theme={MyTheme}>
      <RootStackNavScreens
        initialRouteScreen={
          isLoading === 'Succeeded' ? 'dashboard' : 'SignInScreen'
        }
      />
    </NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    'Rubik-Black': require('./assets/fonts/Rubik-Black.ttf'),
    'Rubik-BlackItalic': require('./assets/fonts/Rubik-BlackItalic.ttf'),
    'Rubik-Bold': require('./assets/fonts/Rubik-Bold.ttf'),
    'Rubik-BoldItalic': require('./assets/fonts/Rubik-BoldItalic.ttf'),
    'Rubik-ExtraBold': require('./assets/fonts/Rubik-ExtraBold.ttf'),
    'Rubik-ExtraBoldItalic': require('./assets/fonts/Rubik-ExtraBoldItalic.ttf'),
    'Rubik-Italic': require('./assets/fonts/Rubik-Italic.ttf'),
    'Rubik-Light': require('./assets/fonts/Rubik-Light.ttf'),
    'Rubik-LightItalic': require('./assets/fonts/Rubik-LightItalic.ttf'),
    'Rubik-Medium': require('./assets/fonts/Rubik-Medium.ttf'),
    'Rubik-MediumItalic': require('./assets/fonts/Rubik-MediumItalic.ttf'),
    'Rubik-Regular': require('./assets/fonts/Rubik-Regular.ttf'),
    'Rubik-SemiBold': require('./assets/fonts/Rubik-SemiBold.ttf'),
    'Rubik-SemiBoldItalic': require('./assets/fonts/Rubik-SemiBoldItalic.ttf'),
  });

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <RootApp fontsLoaded={fontsLoaded} />
        <Toast/>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.white,
  },
});
