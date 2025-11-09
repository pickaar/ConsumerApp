
import react, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, TouchableOpacity, ScrollView } from "react-native";
import { themeColors } from '../../../utils/constant';
import { DEVICE_WIDTH } from '../../../utils/dimentions';
import { vCardStyles } from './vendorStyle';
import { fonts, pStyles } from '../../../utils/theme';
import * as Animatable from 'react-native-animatable';
import PIcon, { PIcons } from '../../brick/Icon';
import StarRating from 'react-native-star-rating-widget';
import { useNavigation } from '@react-navigation/native';


const BargainableJSX = () => {
    return (
        <View style={vCardStyles.C1.bargainContainer}>
            <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite"
                style={vCardStyles.C1.bargainLabelTxt}>BARGAIN</Animatable.Text>
        </View>
    )
}

const TagWrapperJSX = ({ width, name }) => {
    return (
        <View style={[vCardStyles.common.tagContainer, { width: width }]}>
            <Text style={vCardStyles.common.tagTxt}>{name}</Text>
        </View>
    )
}

const FirstColBlockJSX = ({ quotedAmt, save, isNegotiable }) => {
    return (
        <View style={{ flex: 1, height: 150 }}>
            <View style={vCardStyles.C1.main}>
                <View style={vCardStyles.C1.container}>
                    <View>
                        <Text style={vCardStyles.C1.quotedAmtTxt}>{'\u20B9'} {quotedAmt}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                            <Text style={vCardStyles.C1.savelabelTxt}>Save </Text>
                            <Text style={vCardStyles.C1.saveValueTxt}>{save}</Text>
                        </View>
                    </View>
                    <View style={vCardStyles.C1.bargainMain}>
                        {
                            isNegotiable &&
                            <BargainableJSX />
                        }
                    </View>
                </View>
            </View>
        </View>
    )
}

const ExpWrapperJSX = ({ vendorExp }) => {
    return (
        <View style={vCardStyles.C2.blockBContainer}>
            <Text style={vCardStyles.common.expLabel}>Exp.</Text>
            <Text style={vCardStyles.common.expValue}>{vendorExp} </Text>
        </View>
    )
}

const StarRatingWrapperJSX = ({ vendorStarRating }) => {
    return (
        <View style={vCardStyles.C2.blockAContainerSubBlockB}>
            <StarRating
                rating={vendorStarRating}
                color={vCardStyles.common.yellow}
                emptyColor={vCardStyles.common.gray}
                starSize={17}
                starStyle={{ width: 5 }}
            />
            <View style={vCardStyles.C2.startRatingContainer}>
                <Text style={vCardStyles.C2.startRatingLabel}>{vendorStarRating} / 5</Text>
            </View>
        </View>
    )
}

const NameWrapperJSX = ({ name }) => {
    return (
        <View style={vCardStyles.C2.blockAContainerSubBlockA}>
            <Text style={vCardStyles.common.nameLabelTxt}>{name}</Text>
        </View>
    )
}

const Tagged = ({ bookingPrivilege }) => {
    return (
        <View style={{ paddingTop: 5 }}>
            <TagWrapperJSX width={100} name={bookingPrivilege} />
        </View>
    )
}

const TopContainerJSX = ({ item }) => {
    const { vendorName, vendorStarRating, vendorExp, bookingPrivilege } = item;

    return (
        <>
            <View style={vCardStyles.C2.blockAContainer}>
                <NameWrapperJSX name={vendorName} />
                <StarRatingWrapperJSX vendorStarRating={vendorStarRating} />
            </View>
            <View>
                <ExpWrapperJSX vendorExp={vendorExp} />
                {
                    (bookingPrivilege == 'Recommended' || bookingPrivilege == 'Economy' || bookingPrivilege == 'Regular') &&
                    <Tagged bookingPrivilege={bookingPrivilege} />
                }
            </View>
        </>
    )
}

const FooterItems = ({ item, index }) => {
    const { value, label } = item;
    const overflowStyle = index = 0 ? { overflow: 'hidden' } : {};
    return (
        <View style={[vCardStyles.common.container, overflowStyle]}>
            <Text style={vCardStyles.common.labelTxt}>{label}</Text>
            <Text style={vCardStyles.common.valueTxt}>{value}</Text>
        </View>
    )
}

const FooterContainerJSX = () => {
    const footerItems = [{
        label: 'CAR',
        value: 'SEDAN'
    }, {
        label: 'LUGGAGE',
        value: '2323'
    }, {
        label: 'HEADER',
        value: '323'
    }]

    return (
        <View style={vCardStyles.C2.blockBContainerBlock}>
            <View style={vCardStyles.C2.blockBContainerBlockB}>
                {
                    footerItems.map((item, index) => {
                        return <FooterItems key={index} item={item} index={index} />
                    })
                }
            </View>
        </View>
    )
}

const SecondColBlockJSX = ({ item }) => {
    const navigation = useNavigation();

    const gotoBookingDetail = (Id) => {
        navigation.navigate('active', { screen: 'ActiveDetail', params: { quoteId: Id } })
    }

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => gotoBookingDetail(item.quoteId)} style={vCardStyles.C2.main}>

            <View style={vCardStyles.C2.container}>

                <View style={vCardStyles.C2.blockA}>
                    <TopContainerJSX item={item} />
                </View>

                <View style={vCardStyles.C2.blockB}>
                    <FooterContainerJSX />
                </View>

            </View>

            <View style={vCardStyles.C2.angleRightContainer}>
                <PIcon style={vCardStyles.C2.angleRightIcon} type={PIcons.FontAwesome} name="angle-right" size={15}></PIcon>
            </View>

        </TouchableOpacity >
    )
}

export const RenderVendorCardJSX = ({ item }) => {
    const colors = [pStyles.recommendedColor, pStyles.premiumColor, pStyles.regularColor, pStyles.economyColor];
    const previlage = ['Recommended', 'Premium', 'Regular', 'Economy'];
    const colorCode = colors[previlage.indexOf(item.bookingPrivilege) == -1 ? 2 : previlage.indexOf(item.bookingPrivilege)];

    return (
        <View key={item.quoteId} style={[styles.item, { borderLeftColor: colorCode }]}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>

                <FirstColBlockJSX quotedAmt={item.quotedAmtByKM} save={item.save} isNegotiable={item.isNegotiable} />

                <SecondColBlockJSX item={item} />

            </View>
        </View >
    )

};

const styles = StyleSheet.create({
    headerContainer: {
        flex: 0.5,
        width: DEVICE_WIDTH,
        backgroundColor: themeColors.yellow,
    },
    contentContainer: {
        flex: 2.5,
        justifyContent: "center",
        alignItems: "center",
    },
    item: {
        height: 150,
        overflow: 'hidden',
        width: DEVICE_WIDTH * 0.9,
        backgroundColor: themeColors.white,
        borderLeftWidth: 10,
        borderRadius: 10,
        marginTop: 20,
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    }
})