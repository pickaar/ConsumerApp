import React, { useState, useCallback, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
    TextInput,
    ActivityIndicator
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { pStyles } from "@utils/theme";
import { API_CALL_STATUS ,themeColors} from '@utils/constant';
import { setIsLoading, setLocation } from '@reducer/userSlice';
import { updateUserThunk } from '@thunk/userThunk';
import { TitleWithBackBtn } from '@components/brick/text';
import { useAppSelector } from '@store/hook';
import { useAppDispatch } from '@store/store';

const INITIAL_ADDRESS_STATE = {
    name: "Home",
    flatHouseNo: '',
    buildingStreet: '',
    locality: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
};

const DefaultCheckbox = ({ isChecked, onPress }) => (
    <TouchableOpacity style={addressStyles.checkboxContainer} onPress={onPress} activeOpacity={0.8}>
        <View style={[addressStyles.checkbox, isChecked && addressStyles.checkboxChecked]}>
            {isChecked && <Text style={addressStyles.checkmark}>✓</Text>}
        </View>
        <Text style={addressStyles.checkboxLabel}>Make this as Primary address</Text>
    </TouchableOpacity>
);

const InputField = ({ label, value, onChangeText, errorMessage, isMandatory = true, keyboardType = 'default' }) => (
    <View style={addressStyles.inputGroup}>
        <Text style={addressStyles.label}>
            {label}
            {isMandatory && <Text style={{ color: pStyles.danger }}> *</Text>}
        </Text>
        <TextInput
            style={[addressStyles.input, !!errorMessage && addressStyles.inputError]}
            value={value}
            onChangeText={onChangeText}
            placeholder={`Enter ${label}`}
            placeholderTextColor={themeColors.gray}
            keyboardType={keyboardType}
        />
        {!!errorMessage && <Text style={addressStyles.errorText}>{errorMessage}</Text>}
    </View>
);

const AddressInputComponent = ({ route }) => {
    const { label } = route.params || {};
    const navigation = useNavigation();
    const dispatch = useAppDispatch();

    const phoneNo = useAppSelector(state => state.user.userData.phoneNo);
    const locations = useAppSelector(state => state.user.userData.locations);
    const loaderStatus = useAppSelector(state => state.user.loadingStatus.updateLocationLoader);

    const isLoader = loaderStatus === API_CALL_STATUS.PENDING;
    const selectedAddress = locations?.find(loc => loc.name === label);

    const initialFormState = {
        ...INITIAL_ADDRESS_STATE,
        ...(selectedAddress || {}),
        name: label || "Home"
    };

    const [address, setAddress] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    const [isPrimary, setIsPrimary] = useState(selectedAddress?.isPrimary || false);

    const handleChange = useCallback((key, value) => {
        setAddress(prev => ({ ...prev, [key]: value }));
        if (errors[key]) {
            setErrors(prev => {
                const { [key]: _, ...rest } = prev;
                return rest;
            });
        }
    }, [errors]);

    const validate = useCallback(() => {
        const newErrors = {};
        const mandatoryFields = ['flatHouseNo', 'buildingStreet', 'locality', 'city', 'state', 'pincode'];

        mandatoryFields.forEach(key => {
            if (!address[key]?.trim()) {
                const fieldName = key.replace(/([A-Z])/g, ' $1').trim();
                newErrors[key] = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required.`;
            }
        });

        if (address.pincode?.trim() && !/^\d{6}$/.test(address.pincode.trim())) {
            newErrors.pincode = 'Pincode must be exactly 6 digits.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [address]);

    const handleSave = () => {
        if (isLoader || !validate()) {
            if (!validate()) {
                Alert.alert("Validation Failed", "Please fill in all mandatory fields correctly.");
            }
            return;
        }

        const addressString = `${address.flatHouseNo}, ${address.buildingStreet}, ${address.locality}, ${address.city}, ${address.state} - ${address.pincode}`;
        const finalAddress = { ...address, address: addressString, isPrimary, name: address.name?.trim() };

        let updatedLocations = isPrimary
            ? locations.map(loc => ({ ...loc, isPrimary: false }))
            : [...locations];

        const locationIndex = updatedLocations.findIndex(loc => loc.name.trim() === finalAddress.name.trim());

        if (locationIndex !== -1) {
            updatedLocations[locationIndex] = finalAddress;
        } else {
            updatedLocations.push(finalAddress);
        }

        dispatch(setIsLoading({ key: 'updateLocationLoader', status: API_CALL_STATUS.PENDING }));
        dispatch(setLocation(finalAddress));
        dispatch(updateUserThunk({ phoneNo, locations: updatedLocations }));
    };

    useEffect(() => {
        if (loaderStatus === API_CALL_STATUS.SUCCESS) {
            navigation.goBack();
        } else if (loaderStatus === API_CALL_STATUS.REJECTED) {
            Alert.alert("Error", `Failed to save address for ${address.name}. Please try again.`);
        }
    }, [loaderStatus, navigation, address.name]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: pStyles.white }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={addressStyles.keyboardContainer}
                keyboardVerticalOffset={0}
            >
                <ScrollView
                    style={addressStyles.scrollArea}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={addressStyles.scrollContent}
                >
                    <View style={addressStyles.modalContent}>
                        <View style={addressStyles.header}>
                            <TitleWithBackBtn name={`Add/Edit ${label || 'New'} Address`} bgColor={pStyles.white} />
                        </View>

                        <InputField
                            label="Label Name"
                            value={address.name}
                            onChangeText={(text) => handleChange('name', text)}
                            isMandatory={false}
                        />
                        <InputField
                            label="Flat/House No."
                            value={address.flatHouseNo}
                            onChangeText={(text) => handleChange('flatHouseNo', text)}
                            errorMessage={errors.flatHouseNo}
                        />
                        <InputField
                            label="Building/Street"
                            value={address.buildingStreet}
                            onChangeText={(text) => handleChange('buildingStreet', text)}
                            errorMessage={errors.buildingStreet}
                        />
                        <InputField
                            label="Locality"
                            value={address.locality}
                            onChangeText={(text) => handleChange('locality', text)}
                            errorMessage={errors.locality}
                        />
                        <InputField
                            label="City"
                            value={address.city}
                            onChangeText={(text) => handleChange('city', text)}
                            errorMessage={errors.city}
                        />
                        <InputField
                            label="State"
                            value={address.state}
                            onChangeText={(text) => handleChange('state', text)}
                            errorMessage={errors.state}
                        />
                        <InputField
                            label="Pincode"
                            value={address.pincode}
                            onChangeText={(text) => handleChange('pincode', text.replace(/[^0-9]/g, ''))}
                            keyboardType="numeric"
                            errorMessage={errors.pincode}
                        />
                        <InputField
                            label="Landmark (Optional)"
                            value={address.landmark}
                            onChangeText={(text) => handleChange('landmark', text)}
                            isMandatory={false}
                        />

                        <DefaultCheckbox
                            isChecked={isPrimary}
                            onPress={() => setIsPrimary(prev => !prev)}
                        />

                        <View style={addressStyles.footer}>
                            <TouchableOpacity
                                style={[addressStyles.saveButton, isLoader && addressStyles.saveButtonDisabled]}
                                onPress={handleSave}
                                activeOpacity={0.8}
                                disabled={isLoader}
                            >
                                {isLoader ? (
                                    <ActivityIndicator color={pStyles.white} size="small" />
                                ) : (
                                    <Text style={addressStyles.buttonText}>Save Address</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default AddressInputComponent;

const addressStyles = StyleSheet.create({
    keyboardContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContent: {
        width: '100%',
        flex: 1,
        backgroundColor: pStyles.white,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    header: {
        borderBottomWidth: 1,
        borderBottomColor: themeColors.lightGray,
        alignItems: 'center',
    },
    scrollArea: {
        flex: 1,
        paddingHorizontal: 20,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    inputGroup: {
        marginVertical: 10,
    },
    label: {
        fontSize: 14,
        fontFamily: pStyles.fontStyleR,
        color: themeColors.secondary,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: themeColors.gray,
        padding: 10,
        borderRadius: 8,
        fontSize: 16,
        backgroundColor: themeColors.white,
        minHeight: 45,
    },
    inputError: {
        borderColor: pStyles.danger,
        borderWidth: 2,
    },
    errorText: {
        color: pStyles.danger,
        fontSize: 12,
        marginTop: 4,
        fontFamily: pStyles.fontStyleR,
    },
    footer: {
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: themeColors.lightGray2,
        backgroundColor: themeColors.white,
        alignItems: 'center',
    },
    saveButton: {
        width: '100%',
        backgroundColor: pStyles.primary,
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButtonDisabled: {
        backgroundColor: themeColors.gray,
    },
    buttonText: {
        fontFamily: pStyles.fontStyleM,
        letterSpacing: 1.1,
        fontSize: 18,
        color: pStyles.white,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
    },
    checkbox: {
        height: 20,
        width: 20,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: themeColors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        backgroundColor: themeColors.white,
    },
    checkboxChecked: {
        backgroundColor: themeColors.yellow,
        borderColor: themeColors.yellow,
    },
    checkmark: {
        color: themeColors.primary,
        fontSize: 14,
        fontWeight: 'bold',
    },
    checkboxLabel: {
        fontSize: 16,
        color: themeColors.secondary,
        fontFamily: pStyles.fontStyleR,
    },
});
