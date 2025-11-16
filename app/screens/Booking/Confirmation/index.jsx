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
import { loader } from "@store/reducer/bookingSlice"; 
import { useAppDispatch } from "@store/store";
import { useAppSelector } from "@store/hook";
import { createBookingThunk } from "@thunk/bookingThunk";
import { SCREENS } from "../../../utils/constant";

const MAP_IMAGE = require('@assets/sample_gmap.png');
const HEADER_FLEX = 0.24;
const CONTENT_PADDING = DEVICE_WIDTH * 0.03;

export default function Confirmation({ navigation }) {
    const modalRef = useRef(null);
    const dispatch = useAppDispatch();

    const loading = useAppSelector((state) => state.booking.loading);
    const bookingCompletionStatus = useAppSelector((state) => state.booking.bookingCompletionStatus);

    const [termAndCondition, setTermAndCondition] = useState(false);

    const backPressed = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const stageOneSubmit = useCallback(async () => {
        if (!termAndCondition) {
            Toast.show({
                type: 'error',
                text1: 'Please accept Terms & Conditions to proceed.',
                position: 'bottom',
                visibilityTime: 2000,
            });
            return;
        }
        await dispatch(loader({ status: true }));
        dispatch(createBookingThunk());
    }, [termAndCondition, dispatch]);

    const handleCheckboxClick = useCallback(() => {
        setTermAndCondition(prev => !prev);
    }, []);

    useEffect(() => {
        modalRef.current?.handleModal(loading);

        if (bookingCompletionStatus) {
            const timer = setTimeout(() => {
                Alert.alert(
                    "Info",
                    "Your booking order has been placed successfully. Please get more details in Active screen.",
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                navigation.navigate(SCREENS.DASHBOARD, { screen: SCREENS.BOOKING_LIST });
                            }
                        }
                    ]
                );
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [loading, bookingCompletionStatus, navigation]);

    return (
        <View style={styles.rootContainer}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content" />

            <View style={styles.headerContainer}>
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
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.contentContainer}>
                    <View style={styles.reviewTitleContainer}>
                        <Text style={styles.reviewTitle}>Review</Text>
                    </View>

                    <PrintReviewBookingDetails />
                    <PrintReviewExtraDetails />

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
                            onPress={stageOneSubmit}
                        />
                    </View>
                </View>
            </ScrollView>

            <ModalLoader ref={modalRef} msg={'Booking is in process. Please wait...'} />
            <Toast position={'top'} />
        </View>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
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
        marginVertical: 40,
    },
    confirmButton: {
        width: '80%',
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