import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Platform, Dimensions } from "react-native";
import CheckBox from "react-native-check-box";
import { TextField } from "rn-material-ui-textfield";
import { useAppDispatch } from "@store/store";
import { setBookingParam } from "@store/reducer/bookingSlice";
import { themeColors } from "@utils/constant";
import PIcon, { PIcons } from "@components/brick/Icon";

const { width } = Dimensions.get('window');

const BookingForOthers = () => {
    const [forOther, setForOther] = useState(false);
    const dispatch = useAppDispatch();

    const handleCheckBox = () => {
        setForOther((prev) => {
            const newValue = !prev;
            dispatch(setBookingParam({ key: "isBookingForOthers", value: newValue }));
            // Reset input values when toggling off
            if (!newValue) {
                dispatch(setBookingParam({ key: "OthersPhoneNo", value: "" }));
                dispatch(setBookingParam({ key: "OthersName", value: "" }));
            }
            return newValue;
        });
    };

    const handlePhoneChange = (e) => {
        // Optional: Add phone number validation/formatting logic here before dispatching
        dispatch(setBookingParam({ key: "OthersPhoneNo", value: e }));
    };

    const handleNameChange = (e) => {
        dispatch(setBookingParam({ key: "OthersName", value: e }));
    };

    // Placeholder for contact picker
    const getContact = () => { /* Logic to open contact picker */ };

    return (
        <>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    style={styles.checkbox}
                    onClick={handleCheckBox}
                    isChecked={forOther}
                    rightText="Booking for close one"
                    rightTextStyle={styles.checkboxText}
                />
            </View>

            {forOther && (
                <View style={styles.formContainer}>
                    {/* Phone Number Input Row */}
                    <View style={styles.inputRow}>
                        <View style={styles.inputField}>
                            <TextField
                                baseColor={themeColors.secondary}
                                tintColor={themeColors.secondary}
                                textColor={themeColors.primary}
                                label="Enter his/her Phone Number"
                                labelTextStyle={styles.labelText}
                                
                                keyboardType="number-pad"
                                maxLength={12}
                                lineWidth={1}
                                onChangeText={handlePhoneChange}
                                returnKeyType={Platform.OS === 'ios' ? 'done' : 'default'}
                                containerStyle={styles.textfield}
                            />
                        </View>
                        {/* Contact Picker Button */}
                        <TouchableOpacity onPress={getContact} style={styles.iconButton}>
                            <PIcon
                                style={styles.icon}
                                type="fontAwesome"
                                name="address-book"
                                size={24} // Increased size for better tap area
                            />
                        </TouchableOpacity>
                    </View>
                    
                    {/* Name Input Field */}
                    <View style={[styles.inputField, { flex: 0, width: '100%', paddingHorizontal: 5 }]}>
                        <TextField
                            baseColor={themeColors.secondary}
                            tintColor={themeColors.secondary}
                            textColor={themeColors.primary}
                            label="Enter his/her Name"
                            labelTextStyle={[styles.labelText, { paddingLeft: 0 }]}
                            keyboardType="default"
                            maxLength={50} // Increased max length for name
                            onChangeText={handleNameChange}
                        />
                    </View>
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    checkboxContainer: {
        width: "100%",
        paddingTop: 10,
    },
    checkbox: {
        // Adjust padding/margin here if needed
    },
    checkboxText: {
        // color: themeColors.primary,
    },
    formContainer: {
        borderRadius: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: themeColors.gray,
        width: "100%",
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 5,
        // No need for flex: 1 here unless the parent container is also flexible
    },
    inputRow: {
        flexDirection: "row",
        paddingHorizontal: 5,
        // Align items to the bottom to ensure the icon lines up with the text field base line
        alignItems: "flex-end", 
    },
    // 🔥 FIX: Use flex: 1 to make the input take remaining space
    inputField: {
        flex: 1, 
        paddingRight: 5, // Space between text field and icon
    },
    iconButton: {
        // Use a fixed width for the icon area
        width: 40, 
        justifyContent: "center",
        alignItems: "center",
        // Align icon button to visually match the bottom of the TextField
        marginBottom: 10, 
        height: 50, // Give it a fixed height or align vertically
    },
    icon: {
        color: themeColors.primary,
        opacity: 0.9,
    },
    labelText: {
        width: '100%',
        paddingLeft:80,
        textAlign: 'center',
        fontSize: 14,
        color: themeColors.yellow,
        margin:0,

    },
    textfield: {
        // Any custom styling for the TextField container
        
    }
});

export default BookingForOthers;