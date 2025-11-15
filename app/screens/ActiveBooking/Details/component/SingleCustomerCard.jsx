import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import PropTypes from 'prop-types';
import { themeColors } from "@utils/constant";
import { fonts } from "@utils/theme";
import PIcon, { PIcons } from "@components/brick/Icon";
import { useAppSelector } from '@store/hook';

const ADDRESS_MAX_LENGTH = 30;

const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
        return text;
    }
    return `${text.substring(0, maxLength - 3)}...`;
};

const SingleCustomerCard = React.memo(({ item, from }) => {

    const bookingList = useAppSelector((state) => state.quote.bookingList);
    const selectedIndex = useAppSelector((state) => state.quote.selectedIndex);

    const data = from === 'DETAIL' ? bookingList?.[selectedIndex] : item;
    console.log("SingleCustomerCard Data:",data);
    if (!data) {
        return null; 
    }

    const {
        pickupAddress,
        pickUpDate,
        pickUpTime,
        dropAddress,
        tripTypeDetail,
        vehicleType,
        seaters,
        distance
    } = data;

    const locationInfo = [
        {
            address: truncateText(pickupAddress, ADDRESS_MAX_LENGTH),
            details: `${pickUpDate} ${pickUpTime}`,
        },
        {
            address: truncateText(dropAddress, ADDRESS_MAX_LENGTH),
            details: tripTypeDetail,
        }
    ];

    const vehicleInfo = [
        { key: 'Vehicle', value: vehicleType },
        { key: 'Seater', value: seaters },
        { key: 'Distance', value: distance }
    ];

    return (
        <View style={styles.container}>
            <View style={styles.locationContainer}>
                {locationInfo.map((info, index) => (
                    <View key={index} style={[styles.row, index > 0 && styles.rowSpacing]}>
                        <PIcon name="circle" type={PIcons.Feather} size={13} color={themeColors.white} />
                        <View style={styles.textContainer}>
                            <Text style={styles.labelOne}>{info.address}</Text>
                            {info.details && <Text style={styles.labelTwo}>{info.details}</Text>}
                        </View>
                    </View>
                ))}
            </View>

            <View style={styles.vehicleInfoContainer}>
                {vehicleInfo.map((info, index) => (
                    <View key={info.key} style={[styles.vehicleInfoItem, index < vehicleInfo.length - 1 && styles.itemSeparator]}>
                        <Text style={styles.labelOne}>{info.key}</Text>
                        <Text style={styles.subLabel}>{info.value}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
});

export default SingleCustomerCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: themeColors.primary,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 7 },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
    },
    locationContainer: {
        padding: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: themeColors.yellow
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowSpacing: {
        paddingTop: 10,
    },
    textContainer: {
        marginLeft: 5,
    },
    labelOne: {
        color: themeColors.white,
        fontFamily: fonts.RubikBold,
        fontSize: 12,
    },
    labelTwo: {
        color: themeColors.yellow,
        fontFamily: fonts.RubikBold,
        fontSize: 9,
        paddingTop: 2,
    },
    subLabel: {
        color: themeColors.yellow,
        fontFamily: fonts.RubikRegular,
        fontSize: 12,
        marginTop: 4,
    },
    vehicleInfoContainer: {
        flexDirection: 'row',
        height: 50,
    },
    vehicleInfoItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemSeparator: {
        borderRightWidth: StyleSheet.hairlineWidth,
        borderRightColor: themeColors.yellow,
    }
});
