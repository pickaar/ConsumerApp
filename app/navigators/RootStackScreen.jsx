
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

const RootStack = createNativeStackNavigator();

const RootStackNavScreens = ({initialRouteScreen}) => {

    return (
        <RootStack.Navigator initialRouteName={initialRouteScreen} id={undefined}>

            <RootStack.Screen
                name="SignInScreen"
                component={SignInScreen}
                options={{
                    headerShown: false,
                }}
            />

            {/* <RootStack.Screen
                name="setting"
                component={SettingScreenNav}
                options={{

                    headerShown: false,
                    cardStyle: { backgroundColor: '#fff' }
                }} /> */}

            {/* <RootStack.Screen
                name="feedback"
                component={FeedbackComponent}
                options={{
                    headerLayoutPreset: 'center',
                    headerShown: true,
                    title: 'Feedback',
                    cardStyle: { backgroundColor: '#fff' }
                }} /> */}

            {/* <RootStack.Screen
                name="travelBooking"
                component={TravelStackNavScreens}
                options={{
                    headerShown: false,
                    cardStyle: { backgroundColor: '#fff' }
                }} /> */}


        </RootStack.Navigator>
    )
}

export default RootStackNavScreens;