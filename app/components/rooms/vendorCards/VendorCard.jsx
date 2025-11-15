import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import StarRating from 'react-native-star-rating-widget';
import * as Animatable from 'react-native-animatable';
import PIcon, { PIcons } from '../../brick/Icon';
import { themeColors } from '@utils/constant';
import { pStyles,fonts } from '@utils/theme';
import { SCREENS } from '../../../utils/constant';


const Bargainable = memo(() => (
    <View style={styles.bargainContainer}>
        <Animatable.Text
            animation="pulse"
            easing="ease-out"
            iterationCount="infinite"
            style={styles.bargainLabelTxt}
        >
            BARGAIN
        </Animatable.Text>
    </View>
));

const TagWrapper = memo(({ width, name }) => (
    <View style={[styles.tagContainer, { width: width }]}>
        <Text style={styles.tagTxt}>{name}</Text>
    </View>
));

const FirstColBlock = memo(({ quotedAmt, save, isNegotiable }) => (
    <View style={styles.firstColBlock}>
        <View style={styles.c1Container}>
            <View>
                <Text style={styles.quotedAmtTxt}>{'\u20B9'} {quotedAmt}</Text>
                <View style={styles.saveWrapper}>
                    <Text style={styles.savelabelTxt}>Save </Text>
                    <Text style={styles.saveValueTxt}>{save}</Text>
                </View>
            </View>
            {isNegotiable && (
                <View style={styles.bargainMain}>
                    <Bargainable />
                </View>
            )}
        </View>
    </View>
));

const TopContainer = memo(({ item }) => {
    const { vendorName, vendorStarRating, vendorExp, bookingPrivilege } = item;
    const isTagged = ['Recommended', 'Economy', 'Regular'].includes(bookingPrivilege);

    return (
        <>
            <View style={styles.c2BlockAContainer}>
                <View style={styles.c2NameWrapper}>
                    <Text style={styles.nameLabelTxt}>{vendorName}</Text>
                </View>
                <View style={styles.c2StarWrapper}>
                     <StarRating
                        rating={Math.floor(vendorStarRating)}
                        color={pStyles.yellow}
                        emptyColor={pStyles.gray}
                        starSize={17}
                        starStyle={styles.starStyle} 
                    /> 
                    <View style={styles.startRatingContainer}>
                        <Text style={styles.startRatingLabel}>{vendorStarRating} </Text>
                    </View>
                </View>
            </View>
            <View style={styles.c2ExpWrapper}>
                <Text style={styles.expLabel}>Exp.</Text>
                <Text style={styles.expValue}>{vendorExp} </Text>
            </View>
            {isTagged && (
                <View style={styles.taggedWrapper}>
                    <TagWrapper width={100} name={bookingPrivilege} />
                </View>
            )}
        </>
    );
});

const FooterItems = memo(({ item, index }) => {
    const { value, label } = item;
    // The previous logic was: const overflowStyle = index = 0 ? { overflow: 'hidden' } : {};
    // This is confusing and likely a typo. Assuming it should be index === 0.
    const overflowStyle = index === 0 ? { overflow: 'hidden' } : {};
    return (
        <View style={[styles.footerItemContainer, overflowStyle]}>
            <Text style={styles.footerLabelTxt}>{label}</Text>
            <Text style={styles.footerValueTxt}>{value}</Text>
        </View>
    );
});

const FooterContainer = memo(() => {
    const footerItems = [{
        label: 'CAR',
        value: 'SEDAN'
    }, {
        label: 'LUGGAGE',
        value: '2323'
    }, {
        label: 'HEADER',
        value: '323'
    }];

    return (
        <View style={styles.c2FooterBlock}>
            <View style={styles.c2FooterRow}>
                {
                    footerItems.map((item, index) => (
                        <FooterItems key={index} item={item} index={index} />
                    ))
                }
            </View>
        </View>
    );
});


const SecondColBlock = memo(({ item }) => {
    const navigation = useNavigation();

    const gotoBookingDetail = (Id) => {
        console.log("Selected Id:"+Id);
        navigation.navigate(SCREENS.ACTIVE_BOOKING, { screen: SCREENS.BOOKING_DETAIL, params: { quoteId: Id } });
    };

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => gotoBookingDetail(item.quoteId)} style={styles.secondColMain}>
            <View style={styles.c2Container}>
                <View style={styles.c2BlockA}>
                    <TopContainer item={item} />
                </View>
                <View style={styles.c2BlockB}>
                    <FooterContainer />
                </View>
            </View>
            <View style={styles.angleRightContainer}>
                <PIcon style={styles.angleRightIcon} type={PIcons.FontAwesome} name="angle-right" size={15} />
            </View>
        </TouchableOpacity>
    );
});

const VendorCard = memo(({ item, cardWidth }) => {
    const colors = [pStyles.recommendedColor, pStyles.premiumColor, pStyles.regularColor, pStyles.economyColor];
    const privileges = ['Recommended', 'Premium', 'Regular', 'Economy'];
    const colorIndex = privileges.indexOf(item.bookingPrivilege);
    const colorCode = colors[colorIndex === -1 ? 2 : colorIndex]; // Default to 'Regular' color (index 2)

    return (
        <View key={item.quoteId} style={[styles.item, { borderLeftColor: colorCode ,width: cardWidth}]}>
            <View style={styles.cardContentWrapper}>
                <FirstColBlock quotedAmt={item.quotedAmtByKM} save={item.save} isNegotiable={item.isNegotiable} />
                <SecondColBlock item={item} />
            </View>
        </View>
    );
});

export default VendorCard;


const styles = StyleSheet.create({
    item: {
        height: 170,
        // width: 100 , // **CRITICAL FIX: Ensure integer width**
        backgroundColor: themeColors.white,
        borderLeftWidth: 10,
        borderRadius: 10,
        marginTop: 20,
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    cardContentWrapper: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },

    // Column 1 Styles (Price & Bargain)
    firstColBlock: { 
        flex: 1, 
        height: 150 
    },
    c1Container: { 
        height: '100%', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginTop: 10, 
        marginBottom: 10, 
        borderRightWidth: 1, 
        borderRightColor: pStyles.lightGray 
    },
    quotedAmtTxt: { 
        fontFamily: pStyles.fontStyleM, 
        fontSize: 18 
    },
    saveWrapper: { 
        flexDirection: 'row', 
        alignItems: 'baseline' 
    },
    savelabelTxt: { 
        fontSize: pStyles.fontSizeSM, 
        fontFamily: pStyles.fontStyleBI, 
        color: pStyles.primary, 
        opacity: 0.6 
    },
    saveValueTxt: { 
        fontSize: pStyles.fontSizeM - 2, 
        fontFamily: pStyles.fontStyleBI, 
        color: pStyles.primary 
    },
    bargainMain: { 
        justifyContent: 'center', 
        width: 55, 
        height: 17, 
        borderRadius: 4 
    },
    bargainContainer: { 
        height: 20, 
        borderRadius: 5, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: pStyles.lightGray 
    },
    bargainLabelTxt: { 
        fontSize: 8, 
        opacity: 0.9, 
        fontFamily: pStyles.fontStyleB, 
        letterSpacing: 1.2, 
        color: pStyles.primary, 
        textAlign: 'center' 
    },

    // Column 2 Styles (Details)
    secondColMain: { 
        flex: 3, 
        flexDirection: 'row', 
        height: 150, 
        justifyContent: 'center', 
        alignSelf: 'center' 
    },
    c2Container: { 
        height: 150, 
        width: '97%', 
        flexDirection: 'column' 
    },
    c2BlockA: { 
        height: 105, 
        padding: 10 
    },
    c2BlockB: { 
        height: 45, 
        paddingLeft: 10 
    },
    c2BlockAContainer: { 
        height: 30, 
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        alignItems: 'center' 
    },
    c2NameWrapper: { 
        height: 30, 
        width: '60%', 
        overflow: 'hidden', 
        flexDirection: 'row', 
        alignItems: 'flex-start' 
    },
    nameLabelTxt: { 
        fontSize: 18, 
        fontFamily: fonts.RubikMedium, 
        color: themeColors.primary 
    },
    c2StarWrapper: { 
        height: 30, 
        width: '40%', 
        flexDirection: 'column', 
        justifyContent: 'flex-end' 
    },
    starStyle: {
        width: 5
    },
    c2ExpWrapper: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingTop: 3 
    },
    expLabel: { 
        fontSize: 9, 
        fontFamily: fonts.RubikMedium, 
        letterSpacing: 1.1, 
        color: themeColors.primary, 
        opacity: 0.7 
    },
    expValue: { 
        fontSize: 10, 
        fontFamily: fonts.RubikMedium, 
        color: themeColors.primary, 
        paddingLeft: 5, 
        opacity: 0.9 
    },
    taggedWrapper: { 
        paddingTop: 5 
    },
    tagContainer: { 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: themeColors.lightGray, 
        borderRadius: 8, 
        paddingLeft: 6, 
        paddingRight: 6 
    },
    tagTxt: { 
        fontSize: 12, 
        fontFamily: fonts.RubikMedium, 
        color: themeColors.primary, 
        opacity: 1 
    },
    // Footer Styles
    c2FooterBlock: { 
        paddingTop: 10, 
        borderTopWidth: StyleSheet.hairlineWidth, 
        borderTopColor: themeColors.lightGray 
    },
    c2FooterRow: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-evenly' 
    },
    footerItemContainer: { 
        flex: 1.5, 
        flexDirection: 'column', 
        alignItems: 'flex-start', 
        justifyContent: 'center' 
    },
    footerLabelTxt: { 
        fontFamily: fonts.RubikMedium, 
        fontSize: 11, 
        // opacity: 0.9, 
        color: themeColors.gray 
    },
    footerValueTxt: { 
        fontFamily: fonts.RubikBlack, 
        fontSize: 12, 
        opacity: 0.9, 
        color: "#000" 
    },
    // Rating Styles
    startRatingContainer: { 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    startRatingLabel: { 
        fontSize: 9, 
        fontFamily: fonts.RubikMediumItalic, 
        color: themeColors.primary, 
        paddingLeft: 20 
    },
    // Icon
    angleRightContainer: { 
        height: 150, 
        justifyContent: 'center', 
        alignSelf: 'flex-end', 
        width: '3%', 
    },
    angleRightIcon: { 
        color: themeColors.gray, 
        opacity: 0.5 
    },
});