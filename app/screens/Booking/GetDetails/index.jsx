import React, { useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet, StatusBar, ScrollView, Text, KeyboardAvoidingView, Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { PHeadings } from "@components/brick/text";
import { themeColors, DEVICE_WIDTH } from "@utils/constant";
import { loader, setBookingParam } from "@store/reducer/bookingSlice";
import { ModalLoader } from "@components/brick/loader";
import { SafeAreaView } from 'react-native-safe-area-context';
import PickUpAddress from '@screens/Booking/GetDetails/components/PickUpAddress';
import DropAddress from '@screens/Booking/GetDetails/components/DropAddress';
import PickupDateAndTime from '@screens/Booking/GetDetails/components/PickupDateAndTime';
import TripType from '@screens/Booking/GetDetails/components/TripType';
import VehicleType from '@screens/Booking/GetDetails/components/VehicleType';
import Comments from '@screens/Booking/GetDetails/components/Comments';
import SingleWomen from '@screens/Booking/GetDetails/components/SingleWomen';
import BookingForOthers from '@screens/Booking/GetDetails/components/BookingForOther';
import { PBtn } from '@components/brick/button';


const validateField = (param) => param != null && param !== '';

const styles = StyleSheet.create({
    container: {
        width: DEVICE_WIDTH,
        paddingLeft: DEVICE_WIDTH * 0.05,
        paddingRight: DEVICE_WIDTH * 0.05,
        alignItems: 'flex-start',
        flex: 1
    },
    vehicleConatiner: {
        justifyContent: "flex-end",
        paddingBottom: 8,
        alignItems: "center",
        height: 70,
        margin: 5,
        borderRadius: 10,
        width: DEVICE_WIDTH * 0.15
    },
    vehicleTypeActive: {
        borderColor: themeColors.yellow,
        borderWidth: 2
    },
    vehicleTypeInactive: {
        borderColor: themeColors.primary,
        borderWidth: StyleSheet.hairlineWidth
    },
    commentsTxt: {
        width: 200,
        borderBottomColor: 'red',
        borderBottomWidth: 1,
    },
});

export default function GetDetails({ navigation }) {
    const toastRef = useRef();
    const modalRef = useRef();
    const dispatch = useDispatch();
    const pickupAddress = useSelector((state) => state.booking.pickupAddress);
    const dropAddress = useSelector((state) => state.booking.dropAddress);
    const loading = useSelector((state) => state.booking.loading);
    const tollRouteResponse = useSelector((state) => state.booking.tollRouteResponse);

    useEffect(() => {
        if (modalRef.current) {
            modalRef.current.handleModal(loading);
        }
        if (tollRouteResponse) {
            dispatch(setBookingParam({ key: "tollRouteResponse", value: false }));
            setTimeout(() => {
                navigation.navigate('booking', { screen: 'StepTwo' });
            }, 500);
        }
    }, [loading, tollRouteResponse, dispatch, navigation]);

    const stageOneSubmit = useCallback(async () => {
        if (!validateField(pickupAddress) || !validateField(dropAddress)) {
            toastRef.current?.show('Please enter valid details to proceed');
            return;
        }
        await dispatch(loader({ status: true }));
        dispatch({ type: types.TOLL_ROUTE_DATA });
    }, [pickupAddress, dropAddress, dispatch]);

    const backPressed = useCallback(() => navigation.goBack(), [navigation]);

    const btnConfig = React.useMemo(() => ({
        label: 'Proceed',
        icon: { isRequired: false }
    }), []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.white }}>
            <KeyboardAvoidingView
                style={styles.bottomHalfContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={0}
            >
                <ScrollView keyboardShouldPersistTaps="always">
                    <StatusBar backgroundColor={themeColors.white} barStyle="dark-content" />
                    <PHeadings title="On Boarding" backBtnPressed={backPressed} />
                    <View style={styles.container}>

                        <PickUpAddress />
                        <DropAddress />
                        <PickupDateAndTime />
                        <TripType />
                        <VehicleType />
                        <Comments />
                        <SingleWomen />
                        <BookingForOthers />
                        <View style={{ flex: 1, width: '100%', marginTop: 50, marginBottom: 50 }}>
                            <PBtn config={btnConfig} onPress={stageOneSubmit} />
                        </View>
                    </View>
                    {/* <Toast ref={toastRef} position={'bottom'} /> */}
                    {/* <ModalLoader ref={modalRef} msg={'Gathering Information. Please wait...'} /> */}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
