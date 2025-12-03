import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from "react-native";
import PIcon from "@components/brick/Icon";
import { themeColors } from "@utils/constant";
import { fonts } from "@utils/theme";
import { format } from 'date-fns';

const ADDRESS_TRUNCATE_LENGTH = 40;
const ADDRESS_TRUNCATE_LENGTH_RETURN = 90;

const truncateAddress = (address, maxLength) => {
    if (typeof address === 'string' && address.length > maxLength) {
        return `${address.substring(0, maxLength - 3)}...`;
    }
    return address;
};

const AddressRow = React.memo(({ address, detail, isLast }) => (
    <View style={[styles.addressRow, isLast && styles.addressRowSpacing]}>
        <PIcon name="check-circle" type="feather" size={13} style={styles.icon} />
        <View>
            <Text style={styles.labelOne}>{address}</Text>
            {detail !== false && <Text style={styles.labelTwo}>{detail}</Text>}
        </View>
    </View>
));

const DetailCell = React.memo(({ item, isLast }) => (
    <View style={[styles.itemRowTwo, !isLast && styles.itemRowTwoExtra]}>
        <View style={styles.detailCellContent}>
            <Text style={styles.labelOne}>{item.Key}</Text>
            <Text style={styles.subLabel}>{item.Value}</Text>
        </View>
    </View>
));

const Card = ({ item, cardWidth, centeringOffset }) => {
    const rowOneData = useMemo(() => [
        {
            address: truncateAddress(item.pickupAddress.address, ADDRESS_TRUNCATE_LENGTH),
            detail: format(new Date(item.pickUpDate), 'dd/MM/yyyy hh:mm a'),
        },
        {
            address: truncateAddress(
                item.dropAddress.address,
                item.returnDate ? ADDRESS_TRUNCATE_LENGTH : ADDRESS_TRUNCATE_LENGTH_RETURN
            ),
            detail: item.returnDate ? format(new Date(item.returnDate), 'dd/MM/yyyy hh:mm a') : false,
        }
    ], [item]);

    const rowTwoData = useMemo(() => [
        { Key: 'Vehicle', Value: item.vehicleType },
        { Key: 'Seater', Value: item.seaters },
        { Key: 'Distance', Value: item.distance.text }
    ], [item]);

    const containerStyle = useMemo(() => [
        styles.container,
        {
            width: cardWidth,
            marginLeft: centeringOffset
        }
    ], [cardWidth, centeringOffset]);

    return (
        <View style={containerStyle}>
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
    );
};

export default React.memo(Card);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: themeColors.primary,
        borderRadius: 15,
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
        color: themeColors.yellow
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
        width: '33.33%', // Use percentage for equal distribution
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