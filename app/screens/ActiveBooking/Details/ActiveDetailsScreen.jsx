import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Alert,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import CheckBox from 'react-native-check-box';
import * as Animatable from 'react-native-animatable';

import PIcon, { PIcons } from '@components/brick/Icon';
import { BlockTitle, TitleWithBackBtn } from '@components/brick/text';
import { ModalComponent } from '@components/Modal';
import SingleCustomerCard from '@screens/ActiveBooking/Details/component/SingleCustomerCard';

import { themeColors, DEVICE_WIDTH } from "@utils/constant";
import { fonts, pStyles } from '@utils/theme';
import { setQuoteParam } from '@reducer/quoteSlice';
import { useAppDispatch } from '@store/store';
import { useAppSelector } from '@store/hook';
import { SafeAreaView } from 'react-native-safe-area-context';
import { setConfig } from '@reducer/modalSlice';
import { SCREENS } from '@utils/constant';

// --- Helper Components ---

const TxtWrapper = ({ txt }) =>
    txt.length > 25 ? (
        <Animatable.View animation="fadeIn" duration={500}>
            <Text style={styles.wrappedText}>{txt}</Text>
        </Animatable.View>
    ) : (
        <Text style={styles.infoTitleValue}>{txt}</Text>
    );

const SingleLine = React.memo(({ item, index }) => {
    const dispatch = useAppDispatch();

    const navigateTo = useCallback((route) => {
        dispatch(setQuoteParam({ key: 'detailScreenRedirectTo', value: route }));
    }, [dispatch]);

    const renderValue = () => {
        if (item.valueType === 'redirect') {
            return (
                <TouchableOpacity onPress={() => navigateTo(item.navigateTo)} style={styles.redirectContainer}>
                    <PIcon style={styles.redirectIcon} type="feather" name="arrow-right" size={15} />
                </TouchableOpacity>
            );
        }
        return <TxtWrapper txt={item.value} />;
    };

    return (
        <View style={[styles.infoContainer, index !== 0 && styles.borderTop]}>
            <View style={styles.rowBetween}>
                <Text style={styles.infoTitle}>{item?.key || ''}</Text>
                {renderValue()}
            </View>
        </View>
    );
});

const MultiLine = React.memo(({ item }) => (
    <View style={[styles.infoContainer, item?.style]}>
        <View style={styles.multiLineContainer}>
            <View style={styles.multiLineHeader}>
                <Text style={styles.infoTitle}> {item.key} </Text>
            </View>
            <View style={styles.multiLineContent}>
                <Text style={styles.multiLineValue}>{item.value}</Text>
            </View>
        </View>
    </View>
));

const MultiLineWithInfo = React.memo(({ item }) => {
    const dispatch = useAppDispatch();

    const openModal = useCallback((modalType, modalContent) => {
        const config = modalType === 'CAR_DETAIL_MODAL'
            ? { modal: modalType, swipeDirection: 'down', animationType: 'slide', modalContent: {} }
            : { msg: modalContent, modal: modalType };

        dispatch(setConfig({ visible: true, ...config }));
    }, [dispatch]);

    return (
        <View style={[styles.infoContainer, styles.borderTop]}>
            <View style={styles.column}>
                <View style={styles.rowBetween}>
                    <Text style={styles.infoTitle}>{item.key}</Text>
                    <TouchableOpacity onPress={() => openModal(item.modalType, item.modalContent)} style={styles.infoIconContainer}>
                        <Text style={styles.infoTitleValue}>{item.value}</Text>
                        <PIcon style={styles.infoIcon} type="feather" name="info" size={15} />
                    </TouchableOpacity>
                </View>
                <View>
                    {/* <Text style={styles.infoSubText}>{item.info}</Text> */}
                </View>
            </View>
        </View>
    );
});

const ListContainer = ({ list }) => {
    return list.map((item, index) => {
        if (item) {
            switch (item.type) {
                case 'singleLine':
                    return <SingleLine key={index} item={item} index={index} />;
                case 'multiLine':
                    return <MultiLine key={index} item={item} />;
                case 'multiLineWithInfo':
                    return <MultiLineWithInfo key={index} item={item} />;
                default:
                    return null;
            }
        }
    });
};

const ListWrapper = ({ titleName, titleSize, list, index }) => (
    <View key={index} style={styles.listWrapperContainer}>
        <BlockTitle name={titleName} size={titleSize} />
        <View style={styles.listContentWrapper}>
            <ListContainer list={list} />
        </View>
    </View>
);

const CheckBoxBlock = () => {
    const [isChecked, setIsChecked] = useState(true);

    return (
        <View style={styles.checkboxBlockContainer}>
            <View style={styles.listContentWrapper}>
                <View style={styles.checkboxInnerContainer}>
                    <CheckBox
                        style={styles.checkbox}
                        checkBoxColor={themeColors.primary}
                        onClick={() => setIsChecked(prev => !prev)}
                        isChecked={isChecked}
                    />
                    <View style={styles.checkboxTextContainer}>
                        <Text style={styles.checkboxText}>Please accept Term & condition before Booking</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const BookNowButton = ({ onConfirm }) => (
    <TouchableOpacity activeOpacity={0.9} onPress={onConfirm} style={styles.bookNowContainer}>
        <View style={styles.bookNowButton}>
            <Text style={styles.bookNowButtonText}>CONFIRM THIS DRIVER</Text></View>
    </TouchableOpacity>
);

const HeaderCard = () => (
    <View style={styles.headerContainer}>
        <View style={styles.headerCard}>
            <SingleCustomerCard item="" from={'DETAIL'} />
        </View>
    </View>
);

const ContentContainer = ({ moreInfo }) => (
    <View style={styles.contentContainer}>
        <View style={styles.contentInnerWrapper}>
            {moreInfo.map((item, index) => (
                <ListWrapper key={index} index={index} titleName={item.title} titleSize={item.titleSize} list={item.list} />
            ))}
            <CheckBoxBlock />
        </View>
    </View>
);


export default function ActiveDetailsScreen({ route, navigation }) {
    const { quoteId } = route.params;
    const detailScreenRedirectTo = useAppSelector((state) => state.quote.detailScreenRedirectTo);
    const selectedQuote = useAppSelector((state) =>
        state.quote.quotesList.find(quote => quote.quoteId === quoteId)
    );
    useEffect(() => {
        if (detailScreenRedirectTo === 'feedback') {
            navigation.navigate(SCREENS.ACTIVE_BOOKING, { screen: SCREENS.FEEDBACK ,
                params: { vendorId: selectedQuote?.vendorId } });
        }
    }, [detailScreenRedirectTo, navigation]);

    const onConfirmDriver = useCallback(() => {
        Alert.alert(
            "Confirmation",
            "Please click Okay to proceed and confirm.",
            [
                {
                    text: "OK",
                    onPress: () => {
                        /**
                         * @todo: This is final confirmation. Below points need to be developed
                         * 1. Push this quote to respective Booking list OBJECT with new Key as FINALIZED
                         * 2. Send Notification to this quote DRIVER for Confirmation
                         * 3. Close this Booking Order
                         * 4. Deduct calculated amount from this VENDOR Account.
                         */
                        console.log("Driver Confirmed");
                    }
                },
                { text: "Cancel", style: "cancel" }
            ]
        );
    }, []);

    if (!selectedQuote) {
        // Optional: Render a loading or not found state
        return (
            <>
                <TitleWithBackBtn name="DETAIL" />
                <View style={styles.centered}>
                    <Text>Quote not found.</Text>
                </View>
            </>
        );
    }

    return (
        <>
            <StatusBar backgroundColor={themeColors.yellow} barStyle="dark-content" />
            <SafeAreaView style={styles.safeAreaContainer}>
                <View style={styles.flexContainer}>
                    <TitleWithBackBtn name="DETAIL" />
                    <ScrollView>
                        <HeaderCard />
                        <ContentContainer moreInfo={selectedQuote.moreInfo || []} />
                    </ScrollView>
                    <BookNowButton onConfirm={onConfirmDriver} />
                    <ModalComponent />
                </View>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: themeColors.white,
    },
    flexContainer: {
        flex: 1,
        paddingBottom: 50, // Height of the confirmation button
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContainer: {
        width: DEVICE_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themeColors.yellow,
        paddingVertical: 10,
    },
    headerCard: {
        width: '90%',
    },
    contentContainer: {
        backgroundColor: themeColors.yellow,
    },
    contentInnerWrapper: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: '#ebeaea',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    infoContainer: {
        paddingVertical: 10,
    },
    borderTop: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: pStyles.gray,
    },
    rowBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    column: {
        flexDirection: 'column',
        width: '100%',
    },
    infoTitle: {
        fontSize: 13,
        fontFamily: pStyles.fontStyleR,
    },
    infoTitleValue: {
        fontSize: 14,
        fontFamily: pStyles.fontStyleM,
        color: pStyles.lightBlack,
    },
    wrappedText: {
        fontSize: 14,
        fontFamily: pStyles.fontStyleM,
        color: pStyles.black,
        textAlign: 'right',
    },
    redirectContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    redirectIcon: {
        paddingLeft: 5,
        color: pStyles.gray,
        opacity: 0.9,
    },
    multiLineContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
    },
    multiLineHeader: {
        width: '100%',
        paddingBottom: 3,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: pStyles.lightGray,
    },
    multiLineContent: {
        paddingTop: 5,
    },
    multiLineValue: {
        fontSize: 14,
        fontFamily: pStyles.fontStyleM,
        color: pStyles.lightBlack,
    },
    infoIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoIcon: {
        paddingLeft: 5,
        color: pStyles.infoHighlightColor,
        opacity: 0.9,
    },
    infoSubText: {
        fontFamily: pStyles.fontStyleLI,
        fontSize: 10,
        paddingTop: 1,
    },
    listWrapperContainer: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    listContentWrapper: {
        width: '100%',
        overflow: 'hidden',
        backgroundColor: themeColors.white,
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    checkboxBlockContainer: {
        width: '100%',
        marginTop: 20,
        marginBottom: 40,
    },
    checkboxInnerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        padding: 10,
    },
    checkboxTextContainer: {
        flex: 1,
    },
    checkboxText: {
        fontFamily: fonts.RubikLight,
        fontSize: 12,
    },
    bookNowContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themeColors.lightGray2,
        height: 50,
        paddingBottom: 5, // Adjust if needed for safe area
    },
    bookNowButton: {
        height: 40,
        width: '90%',
        backgroundColor: themeColors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    bookNowButtonText: {
        fontFamily: fonts.RubikMedium,
        letterSpacing: 1.1,
        fontSize: 18,
        color: themeColors.white,
    },
});