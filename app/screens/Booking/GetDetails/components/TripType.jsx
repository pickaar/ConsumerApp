import React, { useState, useCallback, useMemo } from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { Label } from "@components/brick/text"; 
import { fonts } from "@utils/theme"; 
import { DEVICE_WIDTH, themeColors } from "@utils/constant";
import ReturnDatePicker from "@screens/Booking/GetDetails/components/ReturnDatePicker";

const TRIP_TYPES = {
    ONE_WAY: 1,
    ROUND: 2,
};

const TripTypeButton = ({ type, tripType, handlePress, label, style }) => {
    const isActive = tripType === type;
    
    const buttonStyles = [
        styles.button,
        style,
        isActive ? styles.activeContainer : styles.inActiveContainer,
    ];

    const textStyles = isActive ? styles.activeText : styles.inActiveText;

    return (
        <TouchableOpacity
            onPress={() => handlePress(type)}
            style={buttonStyles}
        >
            <Text style={textStyles}>{label}</Text>
        </TouchableOpacity>
    );
};


const TripType = ({ dispatch, setBookingParam }) => {
    const [tripType, setTripType] = useState(TRIP_TYPES.ONE_WAY);

    const handlePress = useCallback((type) => {
        setTripType(type);
        if (dispatch && setBookingParam) {
            dispatch(setBookingParam({ key: "tripType", value: type }));
        }
    }, [dispatch, setBookingParam]);


    return (
        <View style={styles.container}>
            <Label>Select Trip Type</Label>
            
            <View style={styles.tripTypeRow}>
                <View style={styles.buttonRow}>
                    
                    {/* ONE WAY Button */}
                    <TripTypeButton
                        type={TRIP_TYPES.ONE_WAY}
                        tripType={tripType}
                        handlePress={handlePress}
                        label="ONE WAY"
                        style={styles.leftButton}
                    />
                    
                    {/* ROUND Button */}
                    <TripTypeButton
                        type={TRIP_TYPES.ROUND}
                        tripType={tripType}
                        handlePress={handlePress}
                        label="ROUND"
                        style={styles.rightButton}
                    />

                </View>
            </View>
            
            {/* --- Info Row --- */}
            {/* <View style={styles.infoRow}>
                <View style={styles.infoCol}>
                    <Text style={styles.infoText}></Text>
                </View>
                <View style={styles.infoCol}>
                    <Text style={styles.infoText}>TO {'<===>'} FROM</Text>
                </View>
            </View> */}
         {tripType === 2 && <ReturnDatePicker />} 
            
        </View>
    );
};

export default TripType;

const styles = StyleSheet.create({
    container: {
        width: DEVICE_WIDTH * 0.9,
        marginTop: 10,
        flexDirection: "column",
        alignItems: "flex-start",
    },
    tripTypeRow: {
        marginTop: 5,
    },
    buttonRow: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        height: 40,
    },
    button: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: themeColors.gray,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    leftButton: {
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    rightButton: {
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    activeContainer: {
        backgroundColor: themeColors.primary,
        height: "100%",
    },
    inActiveContainer: {
        backgroundColor: themeColors.white,
        height: "100%",
    },
    activeText: {
        color: themeColors.white,
        fontFamily: fonts.RubikBold,
    },
    inActiveText: {
        color: themeColors.darkGray,
        fontFamily: fonts.RubikBold,
    },
    infoRow: {
        flexDirection: "row",
        paddingTop: 2,
    },
    infoText: {
        fontFamily: fonts.RubikLight,
        fontSize: 10,
        textAlign: "center",
    },
    infoCol: {
        flex: 1,
        alignItems: "center",
    },
});