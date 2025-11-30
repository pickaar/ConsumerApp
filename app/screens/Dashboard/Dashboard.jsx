import { useCallback, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar, Text, Alert } from "react-native";
import { themeColors } from '@utils/constant';
import { fonts } from '@utils/theme';
import { PIconSet } from '@components/brick/PIcon';
import PIcon from '@components/brick/Icon';
import DashboardHeader from '@screens/Dashboard/components/DashboardHeader';
import { OfferBanners } from '@screens/Dashboard/components/offerBanners';
import { useAppDispatch } from '@store/store';
import { fetchOfferThunk } from '@thunk/offerThunk';
import { Line, LineWithTxt } from '@components/brick/hr';
import { ModalComponent } from '@components/Modal';
import { SCREENS } from '@utils/constant';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getData } from '../../utils/helperfn';
import { useAppSelector } from '@store/hook';

const BookNow = (props) => {

    const gotoBookNow = () => {
        props.navigation.navigate(SCREENS.DASHBOARD, { screen: SCREENS.BOOKING_GET_DETAILS })
    }

    return (
        <View style={styles.titleBlock}>
            <View style={{ width: '85%' }}>
                <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={[styles.mainTitle, { color: themeColors.primary }]}>Book confortable     </Text>
                    </View>
                    <View>
                        <Text style={[styles.mainTitle, { color: themeColors.yellow }]}>rides in affordable price  </Text>
                    </View>
                </View>
            </View>
            <View style={{ width: '15%', flexDirection: 'row', justifyContent: 'flex-end' }}>
                <TouchableOpacity onPress={gotoBookNow}>
                    <PIcon type="feather" gradient={false} color={themeColors.primary} name="arrow-right" size={45}></PIcon>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default function Dashboard(props) {
    const dispatch = useAppDispatch();
    const userData = useAppSelector(state => state.user.userData)
    const locations = useAppSelector(state => state.user.userData.locations);
    const primaryLocation = locations.find(location => location.isPrimary);

    useEffect(() => {
        const getOffers = async () => {
            dispatch(fetchOfferThunk());
        }
        getOffers();
    }, [dispatch])

    useEffect(() => {
        const isProfileIncomplete = !userData.userName || !userData.emailId;

        if (isProfileIncomplete) {
            Alert.alert(
                "Complete Your Profile",
                "Please set your name and primary location to continue using the app.",
                [
                    {
                        text: "OK",
                        onPress: () => props.navigation.navigate(SCREENS.SETTINGS)
                    },
                    { text: "Cancel", style: "cancel" }
                ]
            );
        }
    }, [userData, primaryLocation, props.navigation]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.white }}>
            <View style={styles.container}>
                <StatusBar backgroundColor={themeColors.white} barStyle="dark-content" />
                <View style={{ height: 40 }}>
                    <DashboardHeader navigation={props.navigation} />
                </View>

                {/* TITLE NAVIGATE TO BOOKING PAGE */}
                <BookNow navigation={props.navigation} />

                <OfferBanners navigation={props.navigation} />
                <Line />

                <LineWithTxt txt={'Tours'} />

                <ModalComponent />

            </View >
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    titleBlock: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        paddingVertical: 10
    },
    mainTitle: {
        fontSize: 23,
        fontFamily: fonts.RubikBold
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    }
})
