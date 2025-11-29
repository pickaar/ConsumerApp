

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ActiveListScreen from '@screens/ActiveBooking/BookingList/ActiveListScreen';
import ActiveDetailsScreen from '@screens/ActiveBooking/Details/ActiveDetailsScreen';
import { SCREENS } from '@utils/constant';
import ActiveCardList from '@screens/ActiveBooking/Details/ActiveCardList';
import Settings from '@screens/Settings/Settings';
import Location from '@screens/Settings/Location/Locations';
import AddressInputComponent from '@screens/Settings/Location/AddressInputComponent';

const SettingStack = createNativeStackNavigator();

const SettingNavStack = () => {

    return (
        <SettingStack.Navigator initialRouteName={SCREENS.MAIN_SETTINGS}>
            <SettingStack.Screen
                name={SCREENS.MAIN_SETTINGS}
                component={Settings}
                options={{
                    headerShown: false
                }}
            />

            <SettingStack.Screen
                name={SCREENS.LOCATION_SETTINGS}
                component={Location}
                options={{
                    headerShown: false
                }}
            />

            <SettingStack.Screen
                name={SCREENS.LOCATION_SETTINGS_ADD_LOCATION}
                component={AddressInputComponent}
                options={{
                    headerShown: false
                }}
            />

        </SettingStack.Navigator>
    )
}
export default SettingNavStack;