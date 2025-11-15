import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, StatusBar, Alert, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from "react-native";
import CheckBox from 'react-native-check-box'
import PIcon, { PIcons } from '../../../components/brick/Icon';
import { useNavigation } from '@react-navigation/native';
import { themeColors,DEVICE_WIDTH,DEVICE_HEIGHT } from "../../../utils/constant";
import { fonts } from '../../../utils/theme';
import * as Animatable from 'react-native-animatable';
import StarRating from 'react-native-star-rating-widget';
import Modal from "react-native-modal";
import Constants from 'expo-constants';

import { SelectedBookingJSX } from '@screens/ActiveBooking/Details/component/SingleCustomerCard';
// import ListContainer from '@components/rooms/listContainer/listContainer';
import { BlockTitle, TitleWithBackBtn } from '@components/brick/text';
import { ModalComponent } from '@components/Modal';
import { useAppSelector } from '@store/hook';


const ListWrapper = ({ titleName, titleSize, list, index }) => {
    return (
        <View key={index} style={{ width: DEVICE_WIDTH * 0.9, flexDirection: 'column', justifyContent: 'space-between' }}>
            <BlockTitle name={titleName} size={titleSize} />
            <View style={{ width: '100%', overflow: 'hidden', backgroundColor: themeColors.white, borderRadius: 20, paddingHorizontal: 15, paddingVertical: 5 }}>
                {/* <ListContainer list={list} /> */}
            </View>
        </View>
    )
}

const CheckBoxBlock = () => {
    const [TandCCheckbox, setTandCCheckbox] = useState(true);

    return (
        <View style={{ width: DEVICE_WIDTH * 0.9, flexDirection: 'column', justifyContent: 'space-between', marginTop: 20, marginBottom: 40 }}>
            <View style={{ paddingBottom: 10, width: '100%', overflow: 'hidden', backgroundColor: themeColors.white, borderRadius: 20, paddingHorizontal: 15, paddingVertical: 5 }}>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <CheckBox
                        style={{ padding: 10 }}
                        checkBoxColor={themeColors.primary}
                        onClick={() => {
                            const status = !TandCCheckbox;
                            setTandCCheckbox(status);
                        }}
                        isChecked={TandCCheckbox}
                    // rightText={"Please accpet Team & condition to Proceed"}
                    />
                    <View style={{ flex: 1, flexShrink: 1, flexDirection: 'row' }}>
                        <Text style={{ fontFamily: fonts.RubikLight, fontSize: 12 }}>Please accept Term & condition before Booking</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}


const BookNow = ({ onConfirmThisQuote }) => {


    return (
        <TouchableOpacity activeOpacity={0.9} onPress={onConfirmThisQuote} style={{ width: '100%', position: 'absolute', bottom: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: themeColors.lightGray2, height: 50 }}>
            <View style={{ height: 40, width: '90%', backgroundColor: themeColors.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 5, }}>

                <Text style={{ fontFamily: fonts.RubikMedium, letterSpacing: 1.1, fontSize: 18, color: themeColors.white }}>CONFIRM THIS DRIVER</Text>
            </View>
        </TouchableOpacity >
    )
}

const SingleCard = (WrapperComp) => () => {

    return (
        <View style={styles.headerContainer}>
            <View style={{ width: '80%', marginBottom: 10 }}>
                <WrapperComp item="" from={'DETAIL'} />
            </View>
        </View>
    )
}

const ContentContainer = ({ moreInfo }) => {

    return (
        <View style={styles.contentContainer}>
            <View style={{ backgroundColor: themeColors.yellow }}>
                <View style={{ flex: 1, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: '#ebeaea', paddingVertical: 20, paddingHorizontal: 20 }}>
                    {
                        moreInfo.map((item, index) => <ListWrapper key={index} index={index} titleName={item.title} titleSize={item.titleSize} list={item.list} />)
                    }
                    <CheckBoxBlock />
                </View>
            </View>
        </View>
    )
}

export default function ActiveDetailsScreen({ route, navigation }) {

    const SingleCardBlock = SingleCard(SelectedBookingJSX);
    const detailScreenRedirectTo = useAppSelector((state) => state.quote.detailScreenRedirectTo)

    // Quote Details page = Filtering Seleted quote from Quotelist store
    const { quoteId } = route?.params;

    const quotesList = useAppSelector((state) => state.quote.quotesList);
    const selectedQuote = quotesList.filter(quote => quote.quoteId == 965746773);
    const { moreInfo } = selectedQuote.length > 0 ? selectedQuote[0] : [];


    useEffect(() => {
        if (detailScreenRedirectTo != '' && detailScreenRedirectTo == 'feedback')
            // navigation.navigate('feedback')

        return () => { }
    }, [detailScreenRedirectTo])

    const onConfirmDriverConfirm = () => {
        Alert.alert(
            "Confirmation",
            `Please click Okay to proceed and confirm.`,
            [
                {
                    text: "OK",
                    onPress: () => {
                        /***
                         * @todo: This is final confirmation. Below points need to developed
                         * 1. Push this quote to respective Booking list OBJECT with new Key as FINALIZED
                         * 2. Send Notification to this quote DRIVER for Confirmation
                         * 3. Close this Booking Order
                         * 4. Deduct calcuated amount from this VENDOR Account. 
                         * 
                         */
                    }
                },
                {
                    text: "Cancel",
                    onPress: () => {
                        return
                    }
                }
            ]
        )
    }


    return (
        <>
            <View style={{ flex: 1, paddingBottom: 45 }}>

                <StatusBar backgroundColor={themeColors.yellow} barStyle="dark-content" />

                <TitleWithBackBtn name="DETAIL" />

                <ScrollView>

                    <SingleCardBlock />

                    <ContentContainer moreInfo={moreInfo} />

                </ScrollView>

                <BookNow onConfirmThisQuote={onConfirmDriverConfirm} />

                <ModalComponent />

            </View >

        </>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        // flex: 1.3,
        width: DEVICE_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        backgroundColor: themeColors.yellow,
    },
    contentContainer: {
        // flex: 3,
        justifyContent: "center",
        alignItems: "center",
    },
    infoTitle: {
        fontSize: 13,
        fontFamily: fonts.RubikRegular,

    },
    infoTitleValue: {
        fontSize: 14,
        fontFamily: fonts.RubikMedium,
        color: themeColors.darkGray
    },
    infoContainer: {
        paddingVertical: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    item: {
        height: 150,
        overflow: 'hidden',
        width: DEVICE_WIDTH * 0.9,
        backgroundColor: themeColors.white,
        borderLeftWidth: 10,
        borderRadius: 10,
        // marginTop: 20,
        marginBottom: 15,
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,

    },

})