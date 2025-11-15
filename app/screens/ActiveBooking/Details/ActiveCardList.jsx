import React from 'react';
import { View, StyleSheet, StatusBar, FlatList } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { BlockTitle, TitleWithBackBtn } from '@components/brick/text';
import VendorCard from '../../../components/rooms/vendorCards/VendorCard';
import SingleCustomerCard from './component/SingleCustomerCard';

import { useAppSelector } from '@store/hook';
import { themeColors, DEVICE_WIDTH } from "@utils/constant";

const ActiveCardList = () => {
    const quotesList = useAppSelector((state) => state.quote.quotesList);
    const insets = useSafeAreaInsets();

    const renderHeader = () => (
        <>
            <View style={styles.headerContentWrapper}>
                <TitleWithBackBtn name={'HUNTING'} />
                <View style={styles.customerCardContainer}>
                    <SingleCustomerCard from={'DETAIL'} />
                </View>
            </View>

            <View style={styles.quotesTitleContainer}>
                <BlockTitle name={'Quotes'} />
            </View>
        </>
    );

    const renderQuote = ({ item }) => (
        <VendorCard item={item} cardWidth={Math.round(DEVICE_WIDTH * 0.9)} />
    );

    return (
        <>
            <StatusBar backgroundColor={themeColors.yellow} barStyle="dark-content" />
            
            <View style={styles.mainContainer}>
                
                <View style={[styles.topYellowBar, { height: insets.top }]} />

                <FlatList
                    data={quotesList}
                    renderItem={renderQuote}
                    keyExtractor={(item) => item.quoteId.toString()}
                    ListHeaderComponent={renderHeader}
                    
                    contentContainerStyle={styles.listContentContainer}
                    
                    style={styles.flatListStyle} 
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: themeColors.white,
    },
    topYellowBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: themeColors.yellow,
        zIndex: 1,
    },
    flatListStyle: {
        flex: 1,
    },
    headerContentWrapper: {
        backgroundColor: themeColors.yellow,
        alignItems: 'center',
        paddingTop: 70,
    },
    customerCardContainer: {
        width: '80%',
        marginBottom: 20,
    },
    listContentContainer: {
        paddingBottom: 20,
    },
    quotesTitleContainer: {
        paddingVertical: 1,
        paddingHorizontal: 20,
        backgroundColor: themeColors.white,
    },
});

export default ActiveCardList;
