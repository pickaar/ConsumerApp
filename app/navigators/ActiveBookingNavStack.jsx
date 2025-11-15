

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ActiveListScreen from '@screens/ActiveBooking/BookingList/ActiveListScreen';
import ActiveDetailsScreen from '@screens/ActiveBooking/Details/ActiveDetailsScreen';
import { SCREENS } from '@utils/constant';
import ActiveCardList from '@screens/ActiveBooking/Details/ActiveCardList';
import Feedback from '@screens/ActiveBooking/Details/Feedback';

const ActiveBookingStack = createNativeStackNavigator();

const ActiveBookingNavStack = () => {

    return (
        <ActiveBookingStack.Navigator initialRouteName={SCREENS.MAIN}>

            <ActiveBookingStack.Screen
                name={SCREENS.MAIN}
                component={ActiveListScreen}
                options={{
                    headerShown: false
                }}
            />

            <ActiveBookingStack.Screen
                name={SCREENS.BOOKING_LIST}
                component={ActiveCardList}
                options={{
                    headerShown: false
                }}
            />

            <ActiveBookingStack.Screen
                name={SCREENS.BOOKING_DETAIL}
                component={ActiveDetailsScreen}
                options={{
                    headerShown: false
                }}
            />

            <ActiveBookingStack.Screen
                name={SCREENS.FEEDBACK}
                component={Feedback}
                options={{
                    headerShown: false
                }}
            />

        </ActiveBookingStack.Navigator>
    )
}
export default ActiveBookingNavStack;