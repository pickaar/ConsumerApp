import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColors, DEVICE_WIDTH } from '@utils/constant';
import { fonts } from '@utils/theme';

const DirectBooking = () => {

    const handleCallPress = () => {
        // Replace with the actual phone number
        const phoneNumber = '1234567890'; 
        Linking.openURL(`tel:${phoneNumber}`);
        console.log('Call button pressed');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>Direct Booking</Text>
                
                <View style={styles.card}>
                    <Text style={styles.description}>
                        Don't have time to play with Biddings. Call us directly to do that job.
                    </Text>

                    <TouchableOpacity 
                        activeOpacity={0.8} 
                        onPress={handleCallPress} 
                        style={styles.callButton}
                    >
                        <Text style={styles.callButtonText}>CALL & BOOK NOW</Text>
                    </TouchableOpacity >
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: themeColors.white,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: themeColors.white,
    },
    title: {
        fontFamily: fonts.RubikBold,
        fontSize: 22,
        paddingBottom: 8,
        color: themeColors.primary,
    },
    card: {
        backgroundColor: themeColors.white,
        padding: 20,
        borderRadius: 10,
        width: '100%',
        height: 200,
        justifyContent: 'space-around',
        alignItems: 'center',
        // Add shadow or border if needed for visibility against a white background
        borderWidth: 1,
        borderColor: themeColors.lightGray, // Example color
    },
    description: {
        fontFamily: fonts.RubikRegular,
        fontSize: 13,
        textAlign: 'center',
    },
    callButton: {
        backgroundColor: themeColors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        height: 50,
        width: '90%',
    },
    callButtonText: {
        fontFamily: fonts.RubikMedium,
        letterSpacing: 1.1,
        fontSize: 18,
        color: themeColors.white,
    },
});

export default DirectBooking;