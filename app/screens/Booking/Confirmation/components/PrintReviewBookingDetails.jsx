import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Label, Value } from "@components/brick/text";
import { useAppSelector } from "@store/hook";
import { DEVICE_WIDTH, themeColors } from "@utils/constant";

const PrintReviewBookingDetails = () => {
    const {
        tripType,
        pickupAddress,
        dropAddress,
        pickUpDate,
        pickUpTime,
        vehicleType,
        seaters,
        isSingleWomen,
        comments,
        OthersName,
        OthersPhoneNo,
        isBookingForOthers,
    } = useAppSelector((state) => state.booking);
    const reviewData = useMemo(() => {
        const data = [
            {
                label: "Pickup Address",
                value: pickupAddress?.flatHouseNo + pickupAddress?.buildingStreet || "" + pickupAddress?.locality || "" + pickupAddress?.landmark || "" + pickupAddress?.city || "" + pickupAddress?.landmark || "" + pickupAddress?.city || ""

            },
            {
                label: "Drop Address",
                value: dropAddress?.flatHouseNo + dropAddress?.buildingStreet || "" + dropAddress?.locality || "" + dropAddress?.landmark || "" + dropAddress?.city || "" + dropAddress?.landmark || "" + dropAddress?.city || ""

            },
            {
                label: "Pickup Date",
                value: pickUpDate || "",
            },
            {
                label: "Pickup Time",
                value: pickUpTime || "",
            },
            {
                label: "Vehicle Type / Seating Capacity",
                value: `${vehicleType || ""} / ${seaters || ""}`,
            },
            {
                label: "Trip Type",
                value: tripType === 0 ? "ONE WAY TRIP" : "ROUND TRIP",
            },
        ];

        if (isSingleWomen) {
            data.push({
                label: "Single Women",
                value: isSingleWomen ? "Yes" : "No",
            });
        }

        if (comments && comments.trim().length > 2) {
            data.push({
                label: "Comments",
                value: comments,
            });
        }

        if (isBookingForOthers) {
            data.push(
                {
                    label: "Others Name",
                    value: OthersName || "",
                },
                {
                    label: "Others Phone Number",
                    value: OthersPhoneNo || "",
                }
            );
        }

        return data;
    }, [
        pickupAddress,
        dropAddress,
        pickUpDate,
        pickUpTime,
        vehicleType,
        seaters,
        tripType,
        isSingleWomen,
        comments,
        OthersName,
        OthersPhoneNo,
        isBookingForOthers,
    ]);

    return (
        <View style={styles.container}>
            <View style={styles.blocks}>
                {reviewData.map((obj, index) => (
                    <View key={index} style={styles.items}>
                        <Label>{obj.label}</Label>
                        <View style={styles.valueRow}>
                            <Value>{obj.value}</Value>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: DEVICE_WIDTH,
        paddingHorizontal: DEVICE_WIDTH * 0.05,
        alignItems: "flex-start",
    },
    items: {
        paddingLeft: 10,
        flexDirection: "column",
        justifyContent: "flex-start",
        marginTop: 10,
    },
    blocks: {
        borderLeftWidth: 5,
        borderLeftColor: themeColors.yellow,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        marginBottom: 20,
        marginTop: 20,
    },
    valueRow: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
});

export default PrintReviewBookingDetails;