
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '@screens/PreLogin/SignInScreen';
// import FeedbackComponent from '../screens/ActiveBooking/StepTwo/Feedback';
// import ActiveBookingStackNavScreens from './activeBookingNav';
// import BookingStackNavScreens from './bookingNav';
import MainTab from '@nav/MainTabNav';
// import TravelStackNavScreens from './travelBooking';
// import { getData } from '../utils/helpersFn';
// import { localStorageKeys } from '../utils/constant';
import { SplashScreen } from '../screens/PreLogin/SplashScreen';
import { Text, View } from 'react-native';
import { SCREENS } from '@utils/constant';
import BookingStackNavScreens from '@nav/BookingNav';

const RootStack = createNativeStackNavigator();

const RootStackNavScreens = ({ initialRouteScreen }) => {

    return (
        <RootStack.Navigator initialRouteName={initialRouteScreen} id={undefined}>

            <RootStack.Screen
                name={SCREENS.SIGN_IN}
                component={SignInScreen}
                options={{
                    headerShown: false,
                }}
            />

            <RootStack.Screen
                name={SCREENS.DASHBOARD}
                component={MainTab}
                options={{
                    headerShown: false,
                    // @ts-ignore
                    cardStyle: { backgroundColor: '#fff' }
                }} />

            <RootStack.Screen
                name={SCREENS.BOOKING}
                component={BookingStackNavScreens}
                options={{
                    headerShown: false,
                    cardStyle: { backgroundColor: '#fff' }
                }} />



        </RootStack.Navigator>
    )
}

export default RootStackNavScreens;