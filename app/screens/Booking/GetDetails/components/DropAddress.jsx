import React, { useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Label, Value } from "@components/brick/text";
import { themeColors } from "@utils/constant";
import { setAddress } from "@store/reducer/bookingSlice";
import { SCREENS } from "@utils/constant";
import { useAppDispatch } from "@store/store";
import { useAppSelector } from "@store/hook";

const DropAddress = ({ navigation, route }) => {
    const dispatch = useAppDispatch();
    const dropAddress = useAppSelector(state => state.booking.dropAddress);
    const { address } = dropAddress || {};

    const hasAddress = dropAddress?.buildingStreet != null;
    const editText = hasAddress ? 'Edit' : 'Add';

    useEffect(() => {
        const { updatedAddress, type } = route.params ?? {};
        if (updatedAddress && type === 'drop') {
            console.log("Updated Address Drop:", updatedAddress);
            dispatch(setAddress({ addressType: type, address: updatedAddress }));
            navigation.setParams({ updatedAddress: undefined, type: undefined });
        }
    }, [route.params, dispatch, navigation]);

    const handleEditAddress = () => {
        navigation.navigate(SCREENS.ADDRESS_MODAL_SCREEN, {
            initialData: dropAddress,
            redirectTo: 'GET_DETAILS_SCREEN',
            type: 'drop',
            title: `${editText} Drop Address`
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Label>Drop Address</Label>
                <TouchableOpacity style={styles.editButton} onPress={handleEditAddress}>
                    <Text style={styles.editText}>{editText}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
                {hasAddress ? (
                    <Value>
                        <Text numberOfLines={3} ellipsizeMode="tail">
                            {address}
                        </Text>
                    </Value>
                ) : (
                    <Text style={styles.noAddressText}>No drop address added</Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
    },
    row: {
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
    },
    noAddressText: {
        color: themeColors.gray,
    },
});

export default DropAddress;
