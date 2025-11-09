import { View, TouchableOpacity, ScrollView, Text, StyleSheet, StatusBar, Linking, Platform, Alert } from "react-native";

import * as Animatable from 'react-native-animatable';
import { themeColors, DEVICE_HEIGHT, DEVICE_WIDTH } from "@utils/constant";
import PIcon, { PIcons } from "@components/brick/Icon";
import { fonts } from "@utils/theme";
import React, { useEffect, useState, useRef } from 'react';
import CheckBox from 'react-native-check-box';
import { ModalLoader } from "@components/brick/loader";
import { useAppDispatch } from "@store/store";
import { useAppSelector } from "@store/hook";
import { PBtn } from "@components/brick/button";
import PrintReviewBookingDetails from "@screens/Booking/Confirmation/components/PrintReviewBookingDetails";
import PrintReviewExtraDetails from "@screens/Booking/Confirmation/components/PrintReviewExtraDetails";

export default function Confirmation({ navigation }) {
    const modalRef = useRef();
    const loading = useAppSelector((state) => state.booking.loading);
    const bookingCompletionStatus = useAppSelector((state) => state.booking.bookingCompletionStatus);
    const dispatch = useAppDispatch();
    const [termAndCondition, setTermAndCondition] = useState(false)
    let tandC;
    useEffect(() => {
        modalRef.current.handleModal(loading);
        if (bookingCompletionStatus) {
            // dispatch(setBookingParam({ key: "tollRouteResponse", value: false }));

            setTimeout(() => {
                Alert.alert(
                    "Info",
                    "Your Booking order has been placed sucessfully. Please get updates in Active section",
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                navigation.navigate('dashboard', { screen: 'Active' })
                            }
                        }
                    ]
                )
            }, 500)
        }
    }, [loading, bookingCompletionStatus])

    useEffect(() => {
        tandC = termAndCondition;
    }, [termAndCondition])

    const backPressed = () => {
        navigation.goBack();
    }

    const stageOneSubmit = async () => {

        if (!termAndCondition) {
            // Toast({ message: "Please select Term & condition to proceed." })
            return
        }

        // await dispatch(loader({ status: true }));
        // dispatch({ type: types.NEW_BOOKING_CONFIRMATION });

    }
    const mapImg = require('@assets/sample_gmap.png');
    return (
        <View style={{ flex: 1 }}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content" />

            <View style={{ flex: 0.24 }}>

                <TouchableOpacity onPress={backPressed} style={{
                    position: 'absolute', paddingLeft: 10, paddingTop: 30, zIndex: 2,
                }} >
                    <PIcon type={PIcons.Feather} name="arrow-left" size={25}></PIcon>
                </TouchableOpacity>

                <View style={styles.headerMapContainer}>
                    <Animatable.Image animation="bounceIn"
                        duration={1500} style={styles.headerImg} source={mapImg} />
                </View>
            </View>

            <ScrollView style={{ flex: 2 }} contentContainerStyle={{ flexGrow: 1 }}>

                <View style={{ marginLeft: 0, paddingLeft: 0, paddingLeft: DEVICE_WIDTH * 0.03, }}>

                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontSize: 25, fontFamily: fonts.RubikMedium }}> Review</Text>
                    </View>
                </View>

                <PrintReviewBookingDetails />

                <PrintReviewExtraDetails /> 

                <CheckBox
                    style={{ paddingTop: 10, marginLeft: 20 }}
                    onClick={() => {
                        // dispatch(setBookingParam({ key: "termAndCondition", value: true }));
                        setTermAndCondition(cur => cur = !cur)
                    }}
                    isChecked={termAndCondition}
                    rightText={"Please accept Terms and Condition"}
                    rightTextStyle={{ color: themeColors.primary }} />

                <View style={{
                    width: DEVICE_WIDTH,
                    // flexDirection: 'row',
                    justifyContent: "center",
                    marginBottom: 40,
                    marginTop: 40,
                    alignItems: 'center'
                }}>
                    <PBtn
                        config={{
                            label: 'Confirm',
                            icon: {
                                isRequired: false
                            },
                            customStyles: {
                                container: {
                                    width: '80%',
                                }
                            }
                        }}
                        onPress={stageOneSubmit} />
                </View>

            </ScrollView>
            <ModalLoader ref={modalRef} msg={'Booking is in process. Please wait...'} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: DEVICE_WIDTH,
        paddingLeft: DEVICE_WIDTH * 0.05,
        paddingRight: DEVICE_WIDTH * 0.05,
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
    headerMapContainer: {
        flex: 1,
        zIndex: 1,
        top: 0,

    },
    headerImg: {
        height: DEVICE_HEIGHT * 0.2,
    },
    blocks: {
        borderLeftWidth: 5,
        borderLeftColor: themeColors.yellow,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        marginBottom: 20,
        marginTop: 20
    }
})