import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREENS } from '@utils/constant';
import GetDetails from '@screens/Booking/GetDetails';
import Confirmation from '@screens/Booking/Confirmation';
import Dashboard from '@screens/Dashboard/Dashboard';

const BookingStack = createNativeStackNavigator();

const BookingStackNavStack = () => {

    return (
        <BookingStack.Navigator initialRouteName={SCREENS.MAIN} screenOptions={{ headerShown: false }}>
            <BookingStack.Screen
                name={SCREENS.MAIN}
                component={Dashboard}
              
            />

            <BookingStack.Screen
                name={SCREENS.BOOKING_GET_DETAILS}
                component={GetDetails}
               
            />

            <BookingStack.Screen
                name={SCREENS.BOOKING_CONFIRMATION}
                component={Confirmation}
              
            />


        </BookingStack.Navigator>
    )
}
export default BookingStackNavStack;