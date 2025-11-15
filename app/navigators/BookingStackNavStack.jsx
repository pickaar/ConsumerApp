import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREENS } from '@utils/constant';
import GetDetails from '@screens/Booking/GetDetails';
import Confirmation from '@screens/Booking/Confirmation';
import Dashboard from '@screens/Dashboard/Dashboard';

const BookingStack = createNativeStackNavigator();

const BookingStackNavStack = () => {

    return (
        <BookingStack.Navigator initialRouteName={SCREENS.MAIN}>
            <BookingStack.Screen
                name={SCREENS.MAIN}
                component={Dashboard}
                options={{
                    headerShown: false
                }}
            />

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
export default BookingStackNavStack;