
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '@screens/PreLogin/SignInScreen';
import MainTab from '@nav/MainTabNav';
import { SCREENS } from '@utils/constant';
import BookingStackNavStack from '@nav/BookingStackNavStack';
import ActiveBookingNavStack from '@nav/ActiveBookingNavStack';

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
                name={SCREENS.BOOKING}
                component={BookingStackNavStack}
                options={{
                    headerShown: false,
                    cardStyle: { backgroundColor: '#fff' }
                }} />
            <RootStack.Screen
                name={SCREENS.DASHBOARD}
                component={MainTab}
                options={{
                    headerShown: false,
                    // @ts-ignore
                    cardStyle: { backgroundColor: '#fff' }
                }} />
            <RootStack.Screen
                name={SCREENS.ACTIVE_BOOKING}
                component={ActiveBookingNavStack}
                options={{
                    headerShown: false,
                    cardStyle: { backgroundColor: '#fff' }
                }} />

        </RootStack.Navigator>
    )
}

export default RootStackNavScreens;