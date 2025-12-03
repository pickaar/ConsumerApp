import { View, Text, StyleSheet, StatusBar, ScrollView } from "react-native";
import { SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context";
import LottieView from 'lottie-react-native';
import { useAppSelector } from "@store/hook";
import { themeColors, DEVICE_WIDTH } from '@utils/constant';
import { fonts } from '@utils/theme';
import ActiveBooking from "@screens/ActiveBooking/BookingList/component/ActiveBooking";
import ActiveQuotes from "@screens/ActiveBooking/BookingList/component/ActiveQuotes";

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
    const isLoading = useAppSelector((state) => state.quote?.quoteItemLoader);
    const { height: screenHeight } = useSafeAreaFrame();
    const contentHeight = screenHeight - 50;

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

                    <View style={[styles.bottomContainer, { height: contentHeight * 0.75 }]}>
                        {/* {isLoading ? <LoadingIndicator /> : <ActiveQuotes navigation={navigation} />} */}
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
        marginTop: 20, // Adjust as needed to position text relative to Lottie animation
    },
});
