import {
    View,
    TouchableOpacity,
    ScrollView,
    Text,
    StyleSheet,
    StatusBar,
    Alert,
    Platform,
    Image
} from "react-native";
import React, { useEffect, useRef, useState, useCallback } from 'react';

import * as Animatable from 'react-native-animatable';
import CheckBox from 'react-native-check-box';
import Toast from "react-native-toast-message";

import { PBtn } from "@components/brick/button";
import PIcon, { PIcons } from "@components/brick/Icon";
import { ModalLoader } from "@components/brick/loader";
import PrintReviewBookingDetails from "@screens/Booking/Confirmation/components/PrintReviewBookingDetails";
import PrintReviewExtraDetails from "@screens/Booking/Confirmation/components/PrintReviewExtraDetails";
import { DEVICE_HEIGHT, DEVICE_WIDTH, themeColors } from "@utils/constant";
import { fonts } from "@utils/theme";
import { setConfirmationLoader } from "@store/reducer/bookingSlice";
import { useAppDispatch } from "@store/store";
import { useAppSelector } from "@store/hook";
import { createBookingThunk } from "@thunk/bookingThunk";
import { API_CALL_STATUS, SCREENS } from "../../../utils/constant";
import { SafeAreaView } from "react-native-safe-area-context";
import { PHeadings } from "../../../components/brick/text";

// const MAP_IMAGE = require('@assets/sample_gmap.png');
const HEADER_FLEX = 0.24;
const CONTENT_PADDING = DEVICE_WIDTH * 0.03;

export default function Confirmation({ navigation }) {
    const modalRefconf = useRef(null);
    const dispatch = useAppDispatch();

    const confirmationLoader = useAppSelector((state) => state.booking.confirmationLoader);
    const bookingCompletionStatus = useAppSelector((state) => state.booking.bookingCompletionStatus);

    const [termAndCondition, setTermAndCondition] = useState(false);

    const backPressed = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const stageTwoSubmit = useCallback(async () => {
        if (!termAndCondition) {
            Toast.show({
                type: 'error',
                text1: 'Please accept Terms & Conditions.',
                position: 'top',
                visibilityTime: 2000,
                topOffset: Platform.OS === 'ios' ? 90 : 60,
                text1Style: { 
                fontSize: 14, // Increase the size for the main text (text1)
                fontWeight: 'bold' 
            },
            });
            return;
        }
        dispatch(createBookingThunk());
    }, [termAndCondition, dispatch]);

    const handleCheckboxClick = useCallback(() => {
        setTermAndCondition(prev => !prev);
    }, []);

    useEffect(() => {
        const loading = confirmationLoader === API_CALL_STATUS.PENDING ? true : false;
        if (modalRefconf.current) {
            modalRefconf.current?.handleModal(loading);
        }

        if (confirmationLoader === API_CALL_STATUS.REJECTED) {
            dispatch(setConfirmationLoader({ status: API_CALL_STATUS.IDLE }));
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Unable to process your booking at the moment. Please try calling the customer care directly from Direct screen.',
                position: 'top',
                visibilityTime: 3000,
            });

        }
        if (confirmationLoader === API_CALL_STATUS.SUCCESS) {
            console.log("Booking Completed, navigating to Dashboard.");
           
            // const timer = setTimeout(() => {
                Alert.alert(
                    "Info",
                    "Your booking order has been placed successfully. Please get more details in Active screen.",
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                console.log("Navigating to Dashboard after booking completion.");
                                navigation.navigate(SCREENS.HOME, {
                                    screen: SCREENS.ACTIVE_BOOKING,
                                    params: {
                                        screen: SCREENS.MAIN,

                                    }
                                });
                                // navigation.navigate(SCREENS.DASHBOARD, { screen: SCREENS.BOOKING_LIST });
                            }
                        }
                    ]
                );
            // }, 500);
             dispatch(setConfirmationLoader({ status: API_CALL_STATUS.IDLE }));
            // return () => clearTimeout(timer);
        }
    }, [confirmationLoader, navigation]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.white }}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.rootContainer}>
                    <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content" />

                    {/* <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={backPressed} style={styles.backButton}>
                        <PIcon type="feather" name="arrow-left" size={25} />
                    </TouchableOpacity>
                    <View style={styles.headerMapContainer}>
                        <Animatable.Image
                            animation="bounceIn"
                            duration={1500}
                            style={styles.headerImg}
                            source={MAP_IMAGE}
                        />
                    </View>
                </View> */}

                    <View style={styles.contentContainer}>
                        <PHeadings title="Review" backBtnPressed={backPressed} />


                        <PrintReviewBookingDetails />
                        <PrintReviewExtraDetails />
                        <View style={{ paddingLeft: 40, paddingRight: 20, marginTop: 5, marginBottom: 10 }}>
                            <Text style={{ fontSize: 12, color: 'gray', paddingBottom: 5 }}>* Parking should be arranged by the customer.</Text>
                            <Text style={{ fontSize: 12, color: 'gray', paddingBottom: 5 }}>* Toll charges are excluded.</Text>
                            <Text style={{ fontSize: 12, color: 'gray', paddingBottom: 5 }}>* Driver night stay is charged separately.</Text>
                        </View>
                        <CheckBox
                            style={styles.checkbox}
                            onClick={handleCheckboxClick}
                            isChecked={termAndCondition}
                            rightText={"Please accept Terms and Condition"}
                            rightTextStyle={styles.checkboxText}
                        />

                        <View style={styles.buttonContainer}>
                            <PBtn
                                config={{
                                    icon: {
                                        isRequired: false
                                    },
                                    label: 'Confirm',
                                    customStyles: {
                                        container: styles.confirmButton
                                    }
                                }}
                                onPress={stageTwoSubmit}
                            />
                        </View>
                    </View>

                    <ModalLoader ref={modalRefconf} msg={'Booking is in process. Please wait...'} />
                </View>
            </ScrollView>
            <Toast position={'top'} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: themeColors.white,
    },
    headerContainer: {
        flex: HEADER_FLEX,
    },
    backButton: {
        position: 'absolute',
        paddingLeft: 10,
        paddingTop: Platform.OS === 'ios' ? 40 : 30,
        zIndex: 2,
    },
    headerMapContainer: {
        flex: 1,
        zIndex: 1,
    },
    headerImg: {
        width: '100%',
        height: DEVICE_HEIGHT * 0.2,
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    contentContainer: {
        paddingLeft: CONTENT_PADDING,
    },
    reviewTitleContainer: {
        marginTop: 20,
    },
    reviewTitle: {
        fontSize: 25,
        fontFamily: fonts.RubikMedium,
    },
    checkbox: {
        paddingTop: 10,
        marginLeft: 20,
    },
    checkboxText: {
        color: themeColors.primary,
    },
    buttonContainer: {
        width: DEVICE_WIDTH,
        justifyContent: "center",
        alignItems: 'center',
        marginVertical: 10,
    },
    confirmButton: {
        width: '90%',
    },
    // Keeping original styles in case they are used by imported components
    container: {
        width: DEVICE_WIDTH,
        paddingHorizontal: DEVICE_WIDTH * 0.05,
        alignItems: 'flex-start',
    },
    tollBlock: {
        marginTop: 20,
        borderRadius: 30,
        width: DEVICE_WIDTH * 0.9,
        marginLeft: DEVICE_WIDTH * 0.05,
        alignItems: 'flex-start',
        justifyContent: "flex-start",
        height: 'auto',
        backgroundColor: themeColors.light,
        padding: 20,
        marginBottom: 30
    },
    items: {
        paddingLeft: 10,
        flexDirection: "column",
        justifyContent: "flex-start",
        marginTop: 10
    },
    blocks: {
        borderLeftWidth: 5,
        borderLeftColor: themeColors.yellow,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        marginVertical: 20,
    }
});