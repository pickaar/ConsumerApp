import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import PIcon, { PIcons } from "@components/brick/Icon";
import { themeColors } from "@utils/constant";
import { fonts } from "@utils/theme";

// Helper to safely truncate address strings
const truncateAddress = (address, maxLength = 30) => {
    if (typeof address === 'string' && address.length > maxLength) {
        return `${address.substring(0, maxLength - 3)}...`;
    }
    return address;
};

// Component to render a single address row
const AddressRow = ({ address, detail, isLast }) => (
    <View style={[styles.addressRow, isLast && styles.addressRowSpacing]}>
        <PIcon name="circle" type={PIcons.Feather} size={13} style={styles.icon} />
        <View>
            <Text style={styles.labelOne}>{address}</Text>
            {/* Show tripTypeDetail only if detail is explicitly false (i.e., dropAddress) */}
            {detail !== false && <Text style={styles.labelTwo}>{detail}</Text>}
        </View>
    </View>
);

// Component to render a single detail cell (Vehicle, Seater, Distance)
const DetailCell = ({ item, isLast }) => (
    <View style={[styles.itemRowTwo, !isLast && styles.itemRowTwoExtra]}>
        <View style={styles.detailCellContent}>
            <Text style={styles.labelOne}>{item.Key}</Text>
            <Text style={styles.subLabel}>{item.Value}</Text>
        </View>
    </View>
);


export default function Card({ item, from, cardWidth, centeringOffset }) {
    
    // --- Data Mapping ---
    
    // 1. First Row (Pick up / Drop off) Data
    const rowOneData = [
        {
            address: truncateAddress(item.pickupAddress),
            detail: (item.pickUpDate && item.pickUpTime) ? `${item.pickUpDate} ${item.pickUpTime}` : '',
        },
        {
            address: truncateAddress(item.dropAddress),
            detail: item.tripTypeDetail || false,
        }
    ];

    // 2. Second Row (Vehicle Details) Data
    const rowTwoData = [
        { Key: 'Vehicle', Value: item.vehicleType },
        { Key: 'Seater', Value: item.seaters },
        { Key: 'Distance', Value: item.distance }
    ];

    // --- Render ---
    return (
        <View 
            style={[
                styles.container,
                {
                    width: cardWidth,
                    marginLeft: centeringOffset // Centers the card within the Carousel item slot
                }
            ]}
        >
            {/* Top Section: Addresses and Time */}
            <View style={styles.BookingitemBlockA}>
                {rowOneData.map((data, index) => (
                    <AddressRow
                        key={index}
                        address={data.address}
                        detail={data.detail}
                        isLast={index === rowOneData.length - 1}
                    />
                ))}
            </View>

            {/* Bottom Section: Vehicle Details */}
            <View style={styles.itemRowTwoContainer}>
                {rowTwoData.map((data, index) => (
                    <DetailCell
                        key={index}
                        item={data}
                        isLast={index === rowTwoData.length - 1}
                    />
                ))}
            </View>
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: themeColors.primary,
        borderRadius: 15, // This provides the standard rounded corners
        height: 150, 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
    },
    BookingitemBlockA: {
        width: '100%',
        height: 100,
        padding: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: themeColors.yellow
    },
    addressRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addressRowSpacing: {
        paddingTop: 10,
    },
    icon: {
        color: themeColors.white
    },
    labelOne: {
        color: themeColors.white,
        fontFamily: fonts.RubikBold,
        fontSize: 12,
        paddingLeft: 5
    },
    labelTwo: {
        color: themeColors.yellow,
        fontFamily: fonts.RubikBold,
        fontSize: 9,
        paddingLeft: 10
    },
    itemRowTwoContainer: {
        flexDirection: 'row',
        height: 50,
        width: '100%'
    },
    itemRowTwo: {
        padding: 3,
        width: '33%',
    },
    detailCellContent: {
        flexDirection: 'column',
        height: '100%',
        alignItems: "center",
        justifyContent: "space-around"
    },
    itemRowTwoExtra: {
        borderRightWidth: StyleSheet.hairlineWidth,
        borderRightColor: themeColors.yellow
    },
    subLabel: {
        color: themeColors.yellow,
        fontFamily: fonts.RubikRegular,
        fontSize: 13,
    },
});