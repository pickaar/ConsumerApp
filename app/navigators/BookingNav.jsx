import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREENS } from '@utils/constant';
import GetDetails from '@screens/Booking/GetDetails';
import Confirmation from '@screens/Booking/Confirmation';

const BookingStack = createNativeStackNavigator();

const BookingStackNavScreens = () => {

    return (
        <BookingStack.Navigator>
            <BookingStack.Screen
                name={SCREENS.BOOKING_GET_DETAILS}
                component={GetDetails}
                options={{
                    headerShown: false
                }}
            />

            <BookingStack.Screen
                name={SCREENS.BOOKING_CONFIRMATION}
                component={Confirmation}
                options={{
                    headerShown: false
                }}
            />


        </BookingStack.Navigator>
    )
}
export default BookingStackNavScreens;