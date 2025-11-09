import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Label, Value } from "@components/brick/text";
import { themeColors } from "@utils/constant";
import AddressModal from "@components/Modal/AddressModal";
import { useAppSelector } from "@store/hook";
import { useAppDispatch } from "@store/store";
import { setAddress } from "@store/reducer/bookingSlice";

const DropAddress = () => {
    const dispatch = useAppDispatch();
    const [isModalVisible, setModalVisible] = useState(false);
    const dropAddress = useAppSelector(state => state.booking.dropAddress);
    const { flatHouseNo, buildingStreet, city, state, pincode } = dropAddress || {};
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const handleAddressSave = (newAddress) => {
        dispatch(setAddress({ addressType: 'drop', address: newAddress }));
    };

    const editText = dropAddress?.buildingStreet == null ? 'Add' : 'Edit';

    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: "row",
            }}>
                <Label>Drop Address</Label>
                <TouchableOpacity style={styles.editButton} onPress={toggleModal}>
                    <Text style={styles.editText}>{editText}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
                {
                    dropAddress?.buildingStreet == null ? (
                        <Text style={{ color: themeColors.gray }}>No drop address added</Text>
                    ) : <>
                        <Value><Text numberOfLines={3}
                            ellipsizeMode="tail">{flatHouseNo}, {buildingStreet}</Text></Value>
                        <Value><Text numberOfLines={3}
                            ellipsizeMode="tail">{city}, {state}</Text></Value>
                        <Value><Text numberOfLines={3}
                            ellipsizeMode="tail">{pincode}</Text></Value>
                    </>
                }

            </View>
            <AddressModal
                isVisible={isModalVisible}
                onClose={toggleModal}
                onSave={handleAddressSave}
                initialData={dropAddress} // Pass current address to pre-fill the form
                title={editText + " Drop Address"}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "flex-start",
        marginTop: 10,
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
});

export default DropAddress;