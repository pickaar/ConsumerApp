
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '@screens/PreLogin/SignInScreen';
import MainTab from '@nav/MainTabNav';
import { SCREENS } from '@utils/constant';
import { GetAddressDetails } from '@components/GetAddressDetails/GetAddressDetails';

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

            <RootStack.Screen
                name={SCREENS.ADDRESS_MODAL_SCREEN}
                component={GetAddressDetails}
                options={{
                    headerShown:false
                }}
            />

        </RootStack.Navigator>
    )
}

export default RootStackNavScreens;