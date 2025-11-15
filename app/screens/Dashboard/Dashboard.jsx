import { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar, Text } from "react-native";
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
                    <PIcon type={PIconSet.Feather} gradient={false} color={themeColors.primary} name="arrow-right" size={45}></PIcon>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default function Dashboard(props) {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const getOffers = async () => {
            dispatch(fetchOfferThunk());
        }
        getOffers();
    }, [dispatch])

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={themeColors.white} barStyle="dark-content" />
            <View style={{ height: 40 }}>
                <DashboardHeader />
            </View>

            {/* TITLE NAVIGATE TO BOOKING PAGE */}
            <BookNow navigation={props.navigation} />

            <OfferBanners navigation={props.navigation} />
            <Line />

            <LineWithTxt txt={'Tours'} />

            <ModalComponent />

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    titleBlock: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        paddingVertical: 30
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
