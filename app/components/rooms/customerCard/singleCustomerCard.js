import { View, Text, StyleSheet, FlatList, Image, StatusBar, TouchableOpacity, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { themeColors } from "../../../utils/constant";
import { fonts } from "../../../utils/theme";
import PIcon, { PIcons } from "../../brick/Icon";
import date from 'date-and-time';

export const SelectedBookingJSX = ({ item, from }) => {
    const isFromDetail = from === 'DETAIL' ? true : false;
    if (isFromDetail) {
        const bookingList = useSelector((state) => state.quotes.bookingList)
        const selectedIndex = useSelector((state) => state.quotes.selectedIndex)
        item = bookingList[selectedIndex];
        console.log(JSON.stringify(item))
    }

    const rowOne = [
        {
            address: ((item.pickupAddress.address).length > 30) ?
                (((item.pickupAddress.address).substring(0, 30 - 3)) + '...') :
                item.pickupAddress.address,
            dateTime: ''
        },
        {
            address: ((item.dropAddress.address).length > 30) ?
                (((item.dropAddress.address).substring(0, 30 - 3)) + '...') :
                item.dropAddress.address,
            dateTime: false
            // tripTypeDetail: 'item.tripTypeDetail'
        }
    ]

    const rowTwo = [
        {
            Key: 'Vehicle',
            Value: item.vehicleType
        },
        {
            Key: 'Seater',
            Value: item.seaters
        },
        {
            Key: 'Distance',
            Value: item.distance
        }
    ]

    return (

        <View style={[styles.container]}>
            <View style={styles.BookingitemBlockA}>

                {
                    rowOne.map((item, index) => {
                        return (
                            <View key={index} style={[{ flexDirection: 'row', alignItems: 'center' }, { paddingTop: index == 1 ? 10 : 0 }]}>
                                <PIcon name="circle" type={PIcons.Feather} size={13} style={{ color: '#fff' }} />
                                <View>
                                    <Text style={[styles.labelOne]}> {item.address}</Text>
                                    {item.dateTime == false ? <Text style={styles.labelTwo}>{item.tripTypeDetail} </Text> : <Text style={styles.labelTwo}>{item.dateTime}</Text>}
                                </View>
                            </View>
                        )
                    })
                }

            </View>

            <View style={styles.itemRowTwoContainer}>
                {
                    rowTwo.map((item, index) => {
                        // const itemValue = item.Value;
                        const valueLength = item.Key === 'Vehicle' ? true ? true : false : '';

                        return (
                            <View key={index} style={[styles.itemRowTwo, index == 2 ? {} : styles.itemRowTwoExtra]}>
                                <View style={{ flexDirection: 'column', height: '100%', alignItems: "center", justifyContent: "space-around" }}>
                                    <Text style={[styles.labelOne]}>{item.Key} </Text>
                                    <Text style={[styles.subLabel, (valueLength) ? { fontSize: 12 } : { fontSize: 12 }]}>{item.Value}</Text>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        </View >
    )
}


const styles = StyleSheet.create({
    itemRowTwoContainer: {
        flexDirection: 'row',
        height: 50,
        width: '100%'
    },
    container: {
        flexDirection: 'column',
        width: '100%',
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
    labelOne: {
        color: themeColors.white,
        fontFamily: fonts.RubikBold,
        fontSize: 12,
        paddingLeft: 5
    },
    subLabel: {
        color: themeColors.yellow,
        fontFamily: fonts.RubikRegular,
        fontSize: 13
    },
    labelTwo: {
        color: themeColors.yellow,
        fontFamily: fonts.RubikBold,
        fontSize: 9,
        paddingLeft: 10
    },
    itemRowTwo: {
        padding: 3,
        width: '33%'
    },
    itemRowTwoContainer: {
        flexDirection: 'row',
        height: 50,
        width: '100%'
    },
    itemRowTwoExtra: {
        borderRightWidth: StyleSheet.hairlineWidth,
        borderRightColor: themeColors.yellow
    }
});