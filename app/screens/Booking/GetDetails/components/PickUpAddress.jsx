import React from "react";
import { Text, View, TouchableOpacity,StyleSheet } from "react-native";
import { Label, Value } from "@components/brick/text";
import { themeColors } from "@utils/constant";

const PickUpAddress = () => (
     /**
     * @todo hardcoded for google map development & create common function for all dispatches
     */

    <View style={styles.container}>
        <Label>Pickup Address</Label>
        <View style={styles.row}>
            <Value>Tiru Nagar, Vellore</Value>
            <TouchableOpacity style={styles.editButton} onPress={() => { /* TODO: handle edit */ }}>
                <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
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

export default PickUpAddress;