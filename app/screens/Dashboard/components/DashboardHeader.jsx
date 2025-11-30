import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { themeColors,SCREENS } from "@utils/constant";
import { fonts } from '@utils/theme';
import PIcon, { PIcons } from '@components/brick/Icon';
import { useAppSelector } from "@store/hook";
import { useAppDispatch } from "@store/store";

export default function DashboardHeader({ navigation }) {
    const dispatch = useAppDispatch();
    const locations = useAppSelector((state) => state.user.userData?.locations);
    const primaryAddress = locations?.filter(address => address.isPrimary)[0];
    const maxVisibleLimit = 40;
    function openAddressPickerModal() {
        navigation.navigate(SCREENS.SETTINGS,{screen:SCREENS.LOCATION_SETTINGS});
    }

    return (
        <TouchableOpacity onPress={openAddressPickerModal} style={styles.headerContainer} >
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <PIcon type="feather" color={themeColors.yellow} name="map-pin" />
                <Text style={styles.addressTxtName}>{primaryAddress?.name}</Text>
            </View >
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={styles.addressTxtValue}  > {((primaryAddress?.address)?.length > maxVisibleLimit) ?
                    (((primaryAddress?.address).substring(0, maxVisibleLimit - 3)) + '...') :
                    primaryAddress?.address}</Text>
            </View>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        alignItems: 'flex-start',
        // height: 50
    },
    addressTxtName: {
        paddingHorizontal: 5,
        fontFamily: fonts.RubikExtraBold,
        fontSize: 16,
        color: themeColors.primary
    },
    addressTxtValue: {
        paddingHorizontal: 5,
        fontFamily: fonts.RubikLight,
        fontSize: 11,
        color: themeColors.primary
    }
})