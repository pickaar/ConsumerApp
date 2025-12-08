import { View, Text, StyleSheet, StatusBar, ScrollView } from "react-native";
import { SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context";
import LottieView from 'lottie-react-native';
import { useAppSelector } from "@store/hook";
import { themeColors, DEVICE_WIDTH } from '@utils/constant';
import { fonts } from '@utils/theme';
import ActiveBooking from "@screens/ActiveBooking/BookingList/component/ActiveBooking";
import ActiveQuotes from "@screens/ActiveBooking/BookingList/component/ActiveQuotes";
import { API_CALL_STATUS } from "../../../utils/constant";
import { wsConnect, wsDisconnect, wsJoinRoom } from "store/middleware/socketMiddleware";
import { useAppDispatch } from '@store/store';
import { useEffect, useRef } from "react";
const LoadingIndicator = () => (
    <View style={styles.loaderContainer}>
        <LottieView
            style={styles.lottie}
            source={require('../../../../assets/lottie/activeLoader.json')}
            autoPlay
            loop
        />
        <Text style={styles.loaderText}>Fetching Detail. Please wait..</Text>
    </View>
);

export default function ActiveListScreen({ navigation }) {
    const dispatch = useAppDispatch();
    const oldQuotesCount = useRef(0);
    const quoteItemLoader = useAppSelector((state) => state.quote?.quoteItemLoader);
    const quoteList = useAppSelector((state) => state.quote?.quotesList.length || 0);
    const { height: screenHeight } = useSafeAreaFrame();
    const contentHeight = screenHeight - 50;
    const bookingList = useAppSelector((state) => state.quote?.bookingList);

    const renderQuoteContent = () => {
        const isLoading = quoteItemLoader === API_CALL_STATUS.PENDING || quoteItemLoader === API_CALL_STATUS.IDLE;

        if (isLoading) {
            return <LoadingIndicator />;
        }

        if (quoteList === 0) {
            return <Text style={{ alignSelf: 'center', marginTop: 20, fontFamily: fonts.RubikRegular }}>No Quotes Available</Text>;
        }

        return <ActiveQuotes navigation={navigation} />;
    };

    useEffect(() => {
        dispatch(wsConnect());

        if (bookingList && bookingList.length > 0) {
            bookingList.forEach(booking => {
                dispatch(wsJoinRoom({
                    id: booking._id,
                    type: booking.type
                }));
            });
        }

        return () => {
            dispatch(wsDisconnect());
        };
    }, [dispatch, bookingList.length]);

    useEffect(() => {
        if (quoteList.length > oldQuotesCount.current && oldQuotesCount.current !== 0) {
            PToast({
                message: 'New Quote Received!',
                type: 'error',
            });
        }
        oldQuotesCount.current = quoteList.length;
    }, [quoteList.length]);


    return (
        <>
            <StatusBar backgroundColor={themeColors.yellow} barStyle="dark-content" />
            <SafeAreaView style={styles.safeAreaContainer}>
                <ScrollView>
                    <View style={[styles.headerContainer, { height: contentHeight * 0.25 }]}>
                        <Text style={styles.headerText}>Hunt a Ride</Text>
                        <View style={styles.contentWrapper}>
                            <ActiveBooking navigation={navigation} />
                        </View>
                    </View>

                    <View style={[styles.bottomContainer, { minHeight: contentHeight * 0.75 }]}>
                        {renderQuoteContent()}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: themeColors.yellow,

    },
    headerContainer: {
        fontSize: 12,
        alignItems: 'center',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    headerText: {
        fontSize: 18,
        fontFamily: fonts.RubikRegular,
        marginBottom: 15,
        marginTop: 10,
    },
    contentWrapper: {
        width: DEVICE_WIDTH,
        alignItems: 'center',
    },
    bottomContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    loaderContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lottie: {
        height: 200,
        width: 200,
    },
    loaderText: {
        fontFamily: fonts.RubikLight,
        marginTop: 20,
    },
});
