import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GetDetails from '@screens/Booking/GetDetails';
// import StepTwo from '@screens/Bookings/bookingStepTwo';
import { SCREENS } from '@utils/constant';

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

            {/* <BookingStack.Screen
                name={SCREENS.BOOKING_STEP_TWO}
                component={StepTwo}
                options={{
                    headerShown: false
                }}
            /> */}


        </BookingStack.Navigator>
    )
}
export default BookingStackNavScreens;