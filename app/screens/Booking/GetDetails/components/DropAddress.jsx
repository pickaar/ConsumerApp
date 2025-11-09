import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Label, Value } from "@components/brick/text";
import { themeColors } from "@utils/constant";

const DropAddress = () => {
    /**
       * @todo hardcoded for google map development & create common function for all dispatches
       */
    return (
        <View style={styles.container}>
            <Label>Drop Address</Label>
            <View style={styles.row}>
                <Value>Perumbakkam, Vellore</Value>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => {
                        // @todo: handle edit action
                    }}
                >
                    <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "flex-start",
        marginTop: 20,
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
        letterSpacing: 0.5,
    },
});

export default DropAddress;