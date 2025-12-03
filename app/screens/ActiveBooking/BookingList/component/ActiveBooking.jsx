import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { StyleSheet, View, Dimensions, Text } from "react-native";
import Carousel from 'react-native-reanimated-carousel';
// Import only necessary constants/types
import { themeColors } from '@utils/constant';
import LottieView from 'lottie-react-native';
import { fonts } from '@utils/theme';
import { setQuoteParam } from '@store/reducer/quoteSlice';
import { useAppDispatch } from '@store/store';
import { useAppSelector } from '@store/hook';
import { getBookingListThunk } from "@thunk/quoteThunk";
import Card from '@components/Card';
import { fetchQuotesByBookingId } from '@thunk/quoteThunk';
import { API_CALL_STATUS } from '../../../../utils/constant';

const windowWidth = Dimensions.get('window').width;
const loaderImg = require('../../../../../assets/lottie/activeCardLoader.json');
const PEEK_PERCENTAGE = 0.25;
const ITEM_WIDTH_FOR_CARD = windowWidth * (1 - PEEK_PERCENTAGE);
const CENTERING_OFFSET = (windowWidth * PEEK_PERCENTAGE) / 2;
const MemoizedCard = memo(Card);

/**
 * @todo: Booking Item Driver JSX Component for Active Driver booking
 */
const BookingItemDriverJSX = memo(({ item }) => {
    return (
        <View style={{ width: ITEM_WIDTH_FOR_CARD, marginLeft: CENTERING_OFFSET }}>
            <Text>Driver Card Content</Text>
        </View>
    );
});

const useBookingListJSX = () => {
    return useCallback(({ item, index }) => {
        if (item.type === 'VEHICLE_BOOKING') {
            return (
                <MemoizedCard
                    item={item}
                    from={''}
                    cardWidth={ITEM_WIDTH_FOR_CARD}
                    centeringOffset={CENTERING_OFFSET}
                />
            );
        }

        if (item.vehicleType === 'ACTING_DRIVER_BOOKING') {
            return <BookingItemDriverJSX item={item} />;
        }

        return null;

    }, []);
};

export default memo(function ActiveBooking() {
    const dispatch = useAppDispatch();
    const carouselRef = useRef(null);
    const userID = useAppSelector((state) => state.user?.userData?.userID);
    const bookingList = useAppSelector((state) => state.quote?.bookingList);
    const bookingLoader = useAppSelector((state) => state.quote?.bookingLoader);
    const bookingListJSX = useBookingListJSX();

    /**
     * @description : onLoad of Active booking List in Top Carousal
     */
    useEffect(() => {
        if (!userID) return;
        dispatch(getBookingListThunk({ userID }));
    }, [userID, dispatch]);

    const onSnapToItem = useCallback((index) => {
        if (bookingList && bookingList.length > 0) {
            const bookingId = bookingList[index]?.bookingId;
            console.log("Snapped to bookingId:", bookingId);
            if (bookingId) {
                dispatch(setQuoteParam({ bookingId }));
                dispatch(fetchQuotesByBookingId(bookingId));
            }
        }
    }, [bookingList, dispatch]);

    /**
     * @description : Onload of booking list, fetch quotes for the first booking
     */
    useEffect(() => {
        if (bookingList && bookingList.length > 0) {
            const firstBookingId = bookingList[0]?.bookingId;
            if (firstBookingId) {
                // dispatch(setQuoteParam({ bookingId: firstBookingId }));
                // dispatch(fetchQuotesByBookingId(firstBookingId));
            }
        }
    }, [bookingList, dispatch]);

    const renderContent = () => {
        switch (bookingLoader) {
            case API_CALL_STATUS.PENDING:
                return (
                    <View style={styles.loaderContainer}>
                        <LottieView
                            style={styles.loader}
                            source={loaderImg}
                            autoPlay
                        />
                    </View>
                );
            case API_CALL_STATUS.REJECTED:
                return (
                    <View style={styles.loaderContainer}>
                        <Text style={{ fontFamily: fonts.RubikRegular, fontSize: 14, color: 'red' }}>
                            Unable to fetch bookings at the moment. Please try again later.
                        </Text>
                    </View>
                );
            case API_CALL_STATUS.FULFILLED:
                return (
                    <View style={styles.carouselWrapper}>
                        <Carousel
                            ref={carouselRef}
                            data={bookingList || []}
                            width={windowWidth}
                            height={170}
                            loop={false}
                            autoPlay={false}
                            renderItem={bookingListJSX}
                            onSnapToItem={onSnapToItem}
                            scrollAnimationDuration={1000}
                            mode="stack"
                            modeConfig={{
                                snapOffset: CENTERING_OFFSET,
                                stackInterval: 25,
                                scaleInterval: 0.95,
                                opacityInterval: 0.1,
                            }}
                        />
                    </View>
                );
            default:
                return null;
        }
    };

    return <View style={styles.container}>{renderContent()}</View>;
});

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: themeColors.yellow,
    },
    headerContainer: {
        backgroundColor: themeColors.yellow,
        height: 250,
        width: '100%',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        paddingTop: 10,
        alignItems: 'center',
        zIndex: 1,
    },
    container: {


    },
    loaderContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 170,
    },
    loader: {
        height: 100,
        width: 150
    },
    carouselWrapper: {
        width: windowWidth,
        alignItems: 'center',
    },
});