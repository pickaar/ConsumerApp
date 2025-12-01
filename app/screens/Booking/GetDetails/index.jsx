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
import { setBookingParam, loader } from '@store/reducer/bookingSlice';
import { useAppDispatch } from '@store/store';
import { useAppSelector } from '@store/hook';

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
    const loading = useAppSelector((state) => state.booking.loading);
    const tollRouteResponse = useAppSelector((state) => state.booking.tollRouteResponse);

    useEffect(() => {
        if (tollRouteResponse) {
            dispatch(setBookingParam({ key: "tollRouteResponse", value: false }));
        }
        if (tollRouteResponse === false) {
            dispatch(setBookingParam({ key: "tollRouteResponse", value: null }));
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Unable to fetch route details. Please try again.',
                position: 'top',
                visibilityTime: 2000,
            });
        }
    }, [loading, tollRouteResponse, dispatch, navigation]);

    const stageOneSubmit = useCallback(async () => {
        if (!validateField(pickupAddress.buildingStreet) || !validateField(dropAddress.buildingStreet)) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please enter valid details to proceed',
                position: 'top',
                visibilityTime: 2000,
            });
            return;
        }
        dispatch(loader({ status: true }));
        const fromAddress = pickupAddress.address || '';
        const toAddress = dropAddress.address || '';
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
