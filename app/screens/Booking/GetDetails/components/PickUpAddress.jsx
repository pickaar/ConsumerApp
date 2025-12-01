import React, { useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Label, Value } from "@components/brick/text";
import { themeColors } from "@utils/constant";
import { setAddress } from "@store/reducer/bookingSlice";
import { SCREENS } from "@utils/constant";
import { useAppDispatch } from "@store/store";
import { useAppSelector } from "@store/hook";

const PickUpAddress = ({ navigation, route }) => {
    const dispatch = useAppDispatch();
    const pickupAddress = useAppSelector(state => state.booking.pickupAddress);
    const { address } = pickupAddress || {};

    const isAddressPresent = pickupAddress?.buildingStreet != null;
    const editText = isAddressPresent ? 'Edit' : 'Add';

    const handlePress = () => {
        navigation.navigate(SCREENS.ADDRESS_MODAL_SCREEN, {
            initialData: pickupAddress,
            redirectTo: 'GET_DETAILS_SCREEN',
            title: `${editText} Pickup Address`,
            type: 'pickup',
        });
    };

    useEffect(() => {
        const { updatedAddress, type } = route.params || {};
        if (updatedAddress) {
            dispatch(setAddress({ addressType: type, address: updatedAddress }));
            navigation.setParams({ updatedAddress: undefined, type: undefined });
        }
    }, [route.params?.updatedAddress, dispatch, navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Label>
                    <Text>Pickup Address</Text>
                </Label>
                <TouchableOpacity style={styles.editButton} onPress={handlePress}>
                    <Text style={styles.editText}>{editText}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
                {isAddressPresent ? (
                    <Value>
                        <Text numberOfLines={3} ellipsizeMode="tail">
                            {address}
                        </Text>
                    </Value>
                ) : (
                    <Text style={styles.placeholderText}>No pickup address added</Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "flex-start",
        marginTop: 15,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
    },
    row: {
        flexDirection: "column",
        alignItems: "flex-start",
        marginTop: 4,
    },
    editButton: {
        backgroundColor: themeColors.yellow,
        marginLeft: 8,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    editText: {
        color: themeColors.primary,
        fontWeight: "bold",
        letterSpacing: 0,
    },
    placeholderText: {
        color: themeColors.gray
    },
});

export default PickUpAddress;
