

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ActiveListScreen from '@screens/ActiveBooking/BookingList/ActiveListScreen';
import ActiveDetailsScreen from '@screens/ActiveBooking/Details/ActiveDetailsScreen';
import { SCREENS } from '@utils/constant';
import ActiveCardList from '@screens/ActiveBooking/Details/ActiveCardList';

const BookingStack = createNativeStackNavigator();

const ActiveBookingNavStack = () => {

    return (
        <BookingStack.Navigator>
            <BookingStack.Screen
                name={SCREENS.BOOKING_LIST}
                component={ActiveCardList}
                options={{
                    headerShown: false
                }}
            />

            <BookingStack.Screen
                name={SCREENS.BOOKING_DETAIL}
                component={ActiveDetailsScreen}
                options={{
                    headerShown: false
                }}
            />


        </BookingStack.Navigator>
    )
}
export default ActiveBookingNavStack;