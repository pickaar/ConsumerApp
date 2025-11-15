
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '@screens/PreLogin/SignInScreen';
import MainTab from '@nav/MainTabNav';
import { SCREENS } from '@utils/constant';
// import BookingStackNavStack from '@nav/BookingStackNavStack';
// import ActiveBookingNavStack from '@nav/ActiveBookingNavStack';
// import Feedback from '@screens/ActiveBooking/Details/Feedback';
// import DirectBooking from '@screens/DirectBooking/DirectBooking';

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
                name={SCREENS.HOME}
                component={MainTab}
                options={{
                    headerShown: false,
                    // @ts-ignore
                    cardStyle: { backgroundColor: '#fff' }
                }} />

            
        </RootStack.Navigator>
    )
}

export default RootStackNavScreens;