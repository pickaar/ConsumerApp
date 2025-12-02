import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Keyboard } from 'react-native';
import { themeColors } from '@utils/constant';
import { PBtn } from '@components/brick/button';
import Toast from 'react-native-toast-message';
import { TextField } from 'rn-material-ui-textfield';
import { EXPO_GOOGLE_PLACES_API_KEY } from '@env';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DEVICE_WIDTH, SCREENS } from '@utils/constant';
import { fonts } from '../../utils/theme';
import PIcon from '../brick/Icon';


const GOOGLE_PLACES_API_KEY = EXPO_GOOGLE_PLACES_API_KEY;

const initialAddressState = {
    flatHouseNo: '',
    buildingStreet: '',
    locality: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    address: '',
    latitude: null,
    longitude: null,
};

const extractAddressComponent = (components, type) => {
    const component = components.find(c => c.types.includes(type));
    return component ? component.long_name : null;
};

export const GetAddressDetails = ({ route, navigation }) => {

    const {
        initialData = {},
        redirectTo = 'previous',
        title = 'Add Address',
        type = '',
    } = route.params || {};

    const [address, setAddress] = useState(initialAddressState);
    const [errors, setErrors] = useState({});
    const [searchKey, setSearchKey] = useState(0);

    const placesRef = useRef(null);
    const flatHouseNoRef = useRef(null);
    const landmarkRef = useRef(null);

    useEffect(() => {
        if (initialData && initialData.address !== address.address) {
            setAddress({ ...initialAddressState, ...initialData });
            setErrors({});
            setSearchKey(prev => prev + 1);
            setTimeout(() => {
                if (!initialData.address) {
                    placesRef.current?.focus();
                }
            }, 50);
        }
    }, [initialData.address]);

    const handleChange = (fieldName, value) => {
        setAddress(prev => ({ ...prev, [fieldName]: value }));
        if (errors[fieldName]) {
            setErrors(prev => ({ ...prev, [fieldName]: '' }));
        }
    };

    const handlePlaceSelect = (data, details = null) => {
        if (!details || !details.address_components || !details.geometry || !details.geometry.location) {
            Toast.show({ type: 'error', text1: 'Address Details Missing', text2: 'Could not fetch detailed address components or location.' });
            return;
        }

        setSearchKey(prev => prev + 1);

        const components = details.address_components;

        const newAddressData = {
            city: extractAddressComponent(components, 'locality'),
            state: extractAddressComponent(components, 'administrative_area_level_1'),
            pincode: extractAddressComponent(components, 'postal_code'),

            buildingStreet: details.formatted_address || data.description,
            locality: extractAddressComponent(components, 'sublocality_level_1') || extractAddressComponent(components, 'locality'),

            address: data.description,
            coordinates: [
                details.geometry.location.lat,
                details.geometry.location.lng
            ],

            flatHouseNo: address.flatHouseNo,
            landmark: address.landmark,
        };

        setAddress(prev => ({ ...prev, ...newAddressData }));

        setTimeout(() => {
            flatHouseNoRef.current?.focus();
        }, 150);
    };

    const validate = () => {
        let newErrors = {};
        let isValid = true;
        if (!address.address?.trim()) { newErrors.address = 'Please select a complete address from the list'; isValid = false; }
        if (!address.pincode?.trim() || !/^\d{6}$/.test(address.pincode)) { newErrors.pincode = 'Pincode is required and must be 6 digits'; isValid = false; }
        if (!address.city?.trim()) { newErrors.city = 'Could not extract City. Please select a different address.'; isValid = false; }
        setErrors(newErrors);
        return isValid;
    };

    const handleSave = () => {
        if (validate()) {
            if (redirectTo === 'GET_DETAILS_SCREEN') {
                console.log("Navigating back to Get Details Screen with address:", address);
                navigation.navigate(SCREENS.HOME, {
                    screen: SCREENS.DASHBOARD,
                    params: {
                        screen: SCREENS.BOOKING_GET_DETAILS,
                        params: {
                            updatedAddress: address,
                            type: type,
                        }
                    }
                });

            } else {
                navigation.goBack();
            }

            Toast.show({ type: 'success', text1: 'Address Saved!', text2: 'Your address has been updated successfully.' });
        } else {
            Toast.show({ type: 'error', text1: 'Validation Error', text2: 'Please complete all required fields.' });
        }
    };

    const saveButtonConfig = {
        label: 'Save Address',
        icon: { isRequired: false },
    };

    const onBackBtnPress = () => {
        navigation.goBack();
    }

    const ListHeaderComponent = () => (
        <View style={styles.contentWrapper}>
            <View style={styles.autocompleteWrapper}>
                <Text style={styles.inputLabel}>Search Address</Text>
                <GooglePlacesAutocomplete
                    key={searchKey}
                    ref={placesRef}
                    placeholder={address.address || 'Start typing your address...'}
                    fetchDetails={true}
                    onPress={handlePlaceSelect}
                    query={{
                        key: GOOGLE_PLACES_API_KEY,
                        language: 'en',
                        components: 'country:in',
                    }}
                    styles={{
                        container: styles.autocompleteContainer,
                        textInput: styles.autocompleteInput,
                        listView: styles.listView
                    }}
                    onFocus={() => { if (!address.address) setAddress(initialAddressState); }}
                />
                {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
            </View>

           <View style={{ marginTop: 10 }}>
            <TextField
                ref={flatHouseNoRef}
                label="Flat/House No. (Optional)"
                placeholder="Flat/House No. (Optional)"
                value={address.flatHouseNo}
                onChangeText={(text) => handleChange('flatHouseNo', text)}
                error={errors.flatHouseNo}
                containerStyle={styles.inputContainer}
                returnKeyType="next"
                onSubmitEditing={() => landmarkRef.current?.focus()}
            />

            <TextField
                ref={landmarkRef}
                label="Landmark (Optional)"
                placeholder="Landmark (Optional)"
                value={address.landmark}
                onChangeText={(text) => handleChange('landmark', text)}
                containerStyle={styles.inputContainer}
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
            />
           </View>

            <View style={{ marginTop: 40 }}>
                <Text style={styles.displayLabel}>--- Extracted Address Details ---</Text>

                <TextField
                    label="Building/Street Name"
                    value={address.buildingStreet || 'N/A'}
                    editable={false}
                    containerStyle={[ styles.displayContainer, { marginTop: 20 } ]}
                />
                <TextField
                    label="Locality"
                    value={address.locality || 'N/A'}
                    editable={false}
                    containerStyle={styles.displayContainer}
                />
                <View style={styles.cityPincodeRow}>
                    <TextField
                        label="City"
                        value={address.city || 'N/A'}
                        editable={false}
                        containerStyle={[styles.displayContainer, { flex: 1, marginRight: 10 }]}
                        error={errors.city}
                    />
                    <TextField
                        label="Pincode"
                        value={address.pincode || 'N/A'}
                        editable={false}
                        containerStyle={[styles.displayContainer, { flex: 1 }]}
                        error={errors.pincode}
                    />
                </View>
                <TextField
                    label="State"
                    value={address.state || 'N/A'}
                    editable={false}
                    containerStyle={styles.displayContainer}
                />
            </View>

            <View style={styles.buttonWrapper}>
                <PBtn config={saveButtonConfig} onPress={handleSave} />
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.screenContainer}>
            <View style={styles.customHeader}>
                <TouchableOpacity onPress={onBackBtnPress} style={{ marginTop: 10 }}>
                    <PIcon type="feather" color={themeColors.black} name="arrow-left" size={25} />
                </TouchableOpacity>
                <View style={{ marginTop: 12, marginLeft: 15 }}>
                    <Text style={{ fontSize: 15, fontFamily: fonts.RubikMedium }}>{title}</Text>
                </View>
            </View>

            <FlatList
                data={[{ key: 'all-content' }]} 
                renderItem={() => null} 
                keyExtractor={(item) => item.key}
                ListHeaderComponent={ListHeaderComponent}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.listContentContainer}
                style={styles.listContainer}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    customHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        width: DEVICE_WIDTH,
        height: 70,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    listContainer: {
        flex: 1,
    },
    listContentContainer: {
        paddingBottom: 40,
    },
    contentWrapper: {
        paddingHorizontal: 15,
    },
    autocompleteWrapper: {
        zIndex: 100,
    },
    inputLabel: {
        fontSize: 12,
        color: themeColors.secondary,
        marginTop: 10,
    },
    autocompleteContainer: {
        position: 'relative',
        zIndex: 10,
        marginBottom: 20,
    },
    autocompleteInput: {
        height: 48,
        borderRadius: 5,
        paddingLeft: 10,
        fontSize: 16,
        borderBottomWidth: 1.5,
        borderColor: themeColors.secondary,
    },
    listView: {
        zIndex: 100,
    },
    inputContainer: {
        marginBottom: 5,
        marginTop: 2,
        height: 40,
        baseColor: themeColors.secondary,
        tintColor: themeColors.primary,
        textColor: themeColors.primary,
    },
    displayContainer: {
        marginTop: 2,
        marginBottom: 1,
        height: 60,
        baseColor: themeColors.disabled,
        tintColor: themeColors.disabled,
        textColor: themeColors.primary,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    displayLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        color: themeColors.secondary,
        textAlign: 'center',
        marginVertical: 15,
    },
    cityPincodeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonWrapper: {
        marginTop: 30,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: -10,
        marginBottom: 10,
        marginLeft: 5,
    }
});
