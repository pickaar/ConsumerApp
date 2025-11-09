

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AboutUs } from '../screens/settings/AboutUs/aboutUs';
import { Location } from '../screens/settings/Location/locations';
import { Rides } from '../screens/settings/Rides/rides';
import SettingScreen from '../screens/settings/settings';
import {
    CardStyleInterpolators,
    createStackNavigator,
} from '@react-navigation/stack';
const BookingStack = createStackNavigator();
const SettingScreenNav = () => {

    return (
        <BookingStack.Navigator
            initialRouteName='SettingScreen'
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}>

            <BookingStack.Screen
                name='SettingScreen'
                component={SettingScreen}
                options={{
                    headerShown: false
                }}
            />

            <BookingStack.Screen
                name='location'
                component={Location}
                options={{
                    headerShown: false
                }}
            />

            <BookingStack.Screen
                name='rides'
                component={Rides}
                options={{
                    headerShown: false
                }}
            />

            <BookingStack.Screen
                name='aboutUs'
                component={AboutUs}
                options={{
                    headerShown: false
                }}
            />


        </BookingStack.Navigator>
    )
}
export default SettingScreenNav;