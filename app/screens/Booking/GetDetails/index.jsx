import React, { useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet, StatusBar, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { PHeadings } from "@components/brick/text";
import { themeColors, DEVICE_WIDTH } from "@utils/constant";
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
import Toast from 'react-native-toast-message';
import { fetchTollDetailsThunk } from '@thunk/bookingThunk';
import { setBookingParam, setTollLoader } from '@store/reducer/bookingSlice';
import { useAppDispatch } from '@store/store';
import { useAppSelector } from '@store/hook';
import { API_CALL_STATUS, SCREENS } from '../../../utils/constant';

const validateField = (param) => param != null && Object.keys(param).length > 0;

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

export default function GetDetails({ navigation, route }) {
    const modalRef = useRef();
    const dispatch = useAppDispatch();
    const pickupAddress = useAppSelector((state) => state.booking.pickupAddress);
    const dropAddress = useAppSelector((state) => state.booking.dropAddress);
    const tollLoader = useAppSelector((state) => state.booking.tollLoader);
    // const tollRouteResponse = useAppSelector((state) => state.booking.tollRouteResponse);

    useEffect(() => {
        console.log("Loading State Changed:", tollLoader,);
        const showModal = tollLoader === API_CALL_STATUS.PENDING ? true : false;
        if (modalRef.current) {
            modalRef.current?.handleModal(showModal);
        }
        if (tollLoader === API_CALL_STATUS.REJECTED) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Unable to fetch route details. Please try again.',
                position: 'top',
                visibilityTime: 2000,
            });
            dispatch(setTollLoader({ status: API_CALL_STATUS.IDLE }));
        }

        if (tollLoader === API_CALL_STATUS.SUCCESS) {
            dispatch(setTollLoader({ status: API_CALL_STATUS.IDLE }));
            setTimeout(() => {
                navigation.navigate(SCREENS.HOME, {
                    screen: SCREENS.DASHBOARD,
                    params: {
                        screen: SCREENS.BOOKING_CONFIRMATION,

                    }
                });
            }, 500);
        }

    }, [tollLoader, dispatch, navigation]);

    const stageOneSubmit = useCallback(async () => {

        if (!validateField(pickupAddress.address) || !validateField(dropAddress.address)) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please enter valid details to proceed',
                position: 'top',
                visibilityTime: 2000,
            });
            return;
        }
        const fromAddress = pickupAddress.coordinates || [];
        const toAddress = dropAddress.coordinates || [];
        dispatch(fetchTollDetailsThunk({ fromAddress, toAddress }));
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

                        <PickUpAddress navigation={navigation} route={route} />
                        <DropAddress navigation={navigation} route={route} />
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

                </ScrollView>
            </KeyboardAvoidingView>
            <Toast position={'top'} />
            <ModalLoader ref={modalRef} msg={'Gathering Information. Please wait...'} />
        </SafeAreaView>
    );
}
