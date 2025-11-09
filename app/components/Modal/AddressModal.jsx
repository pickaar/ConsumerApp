import React, { useState, useEffect, useRef } from 'react'; // 👈 Imported useRef
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Dimensions, Keyboard } from 'react-native'; // 👈 Imported Keyboard
import Modal from 'react-native-modal';
import { themeColors } from '@utils/constant';
import { PBtn } from '@components/brick/button';
import Toast from 'react-native-toast-message';
import { TextField } from 'rn-material-ui-textfield';

const { height } = Dimensions.get('window');

const initialAddressState = {
    flatHouseNo: '',
    buildingStreet: '',
    locality: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
};

const AddressModal = ({ isVisible, onClose, onSave, initialData , title }) => {
    const [address, setAddress] = useState(initialAddressState);
    const [errors, setErrors] = useState({});

    // 🔑 Create refs for all TextFields
    const refs = {
        flatHouseNo: useRef(null),
        buildingStreet: useRef(null),
        locality: useRef(null),
        landmark: useRef(null),
        city: useRef(null),
        state: useRef(null),
        pincode: useRef(null),
    };

    // 💡 Function to focus the next field
    const focusNextField = (nextField) => {
        if (refs[nextField] && refs[nextField].current) {
            refs[nextField].current.focus();
        } else {
            // For the last field (Pincode), dismiss the keyboard
            Keyboard.dismiss();
        }
    };

    useEffect(() => {
        if (isVisible) {
            setAddress({ ...initialAddressState, ...initialData });
            setErrors({}); 
            // Optional: Auto-focus the first field when modal opens
            setTimeout(() => {
                refs.flatHouseNo.current?.focus();
            }, 50); 
        } else {
            setAddress(initialAddressState);
            setErrors({});
        }
    }, [isVisible, initialData]);

    const handleChange = (fieldName, value) => {
        setAddress(prev => ({ ...prev, [fieldName]: value }));
        if (errors[fieldName]) {
            setErrors(prev => ({ ...prev, [fieldName]: '' }));
        }
    };

    const validate = () => {
        let newErrors = {};
        let isValid = true;
        
        // ... (Validation logic remains the same)
        if (!address.flatHouseNo?.trim()) { newErrors.flatHouseNo = 'Required Flat/House No.'; isValid = false; }
        if (!address.buildingStreet?.trim()) { newErrors.buildingStreet = 'Required Building/Street Name'; isValid = false; }
        if (!address.locality?.trim()) { newErrors.locality = 'Required Locality'; isValid = false; }
        if (!address.city?.trim()) { newErrors.city = 'Required City'; isValid = false; }
        if (!address.state?.trim()) { newErrors.state = 'Required State'; isValid = false; }
        if (!address.pincode?.trim() || !/^\d{6}$/.test(address.pincode)) { newErrors.pincode = 'Valid 6-digit Pincode required'; isValid = false; }

        setErrors(newErrors);
        return isValid;
    };

    const handleSave = () => {
        if (validate()) {
            onSave(address);
            onClose();
            Toast.show({ type: 'success', text1: 'Address Saved!', text2: 'Your address has been updated successfully.' });
        } else {
            Toast.show({ type: 'error', text1: 'Validation Error', text2: 'Please fill all required fields correctly.' });
        }
    };

    const saveButtonConfig = {
        label: 'Save Address',
        icon: { isRequired: false },
    };

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            onSwipeComplete={onClose}
            swipeDirection={['down']}
            style={styles.modal}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            avoidKeyboard={true}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -height * 0.1}
            >
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>{title}</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView contentContainerStyle={styles.scrollViewContent}>
                        <TextField
                            ref={refs.flatHouseNo} // 🔑 Ref
                            label="Flat/House No."
                            value={address.flatHouseNo}
                            onChangeText={(text) => handleChange('flatHouseNo', text)}
                            error={errors.flatHouseNo}
                            containerStyle={styles.inputContainer}
                            returnKeyType="next" // 🔑 Return key type
                            onSubmitEditing={() => focusNextField('buildingStreet')} // 🔑 Submit action
                            // ... other props
                        />
                        <TextField
                            ref={refs.buildingStreet}
                            label="Building/Street Name"
                            value={address.buildingStreet}
                            onChangeText={(text) => handleChange('buildingStreet', text)}
                            error={errors.buildingStreet}
                            containerStyle={styles.inputContainer}
                            returnKeyType="next"
                            onSubmitEditing={() => focusNextField('locality')}
                            // ... other props
                        />
                        <TextField
                            ref={refs.locality}
                            label="Locality"
                            value={address.locality}
                            onChangeText={(text) => handleChange('locality', text)}
                            error={errors.locality}
                            containerStyle={styles.inputContainer}
                            returnKeyType="next"
                            onSubmitEditing={() => focusNextField('landmark')}
                            // ... other props
                        />
                        <TextField
                            ref={refs.landmark}
                            label="Landmark (Optional)"
                            value={address.landmark}
                            onChangeText={(text) => handleChange('landmark', text)}
                            containerStyle={styles.inputContainer}
                            returnKeyType="next"
                            onSubmitEditing={() => focusNextField('city')}
                            // ... other props
                        />
                        <TextField
                            ref={refs.city}
                            label="City"
                            value={address.city}
                            onChangeText={(text) => handleChange('city', text)}
                            error={errors.city}
                            containerStyle={styles.inputContainer}
                            returnKeyType="next"
                            onSubmitEditing={() => focusNextField('state')}
                            // ... other props
                        />
                        <TextField
                            ref={refs.state}
                            label="State"
                            value={address.state}
                            onChangeText={(text) => handleChange('state', text)}
                            error={errors.state}
                            containerStyle={styles.inputContainer}
                            returnKeyType="next"
                            onSubmitEditing={() => focusNextField('pincode')}
                            // ... other props
                        />
                        <TextField
                            ref={refs.pincode}
                            label="Pincode"
                            value={address.pincode}
                            onChangeText={(text) => handleChange('pincode', text)}
                            keyboardType="numeric"
                            maxLength={6}
                            error={errors.pincode}
                            containerStyle={styles.inputContainer}
                            returnKeyType="done" // 🔑 Last field uses 'done'
                            onSubmitEditing={() => Keyboard.dismiss()} // 🔑 Dismiss keyboard
                            // ... other props
                        />
                        <View style={styles.buttonWrapper}>
                             <PBtn config={saveButtonConfig} onPress={handleSave} />
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

// ... (Styles remain the same)
const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    keyboardAvoidingView: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        borderRadius: 10,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        maxHeight: height * 0.9,
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: themeColors.primary,
    },
    closeButton: {
        padding: 5,
    },
    closeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: themeColors.secondary,
    },
    scrollViewContent: {
        paddingVertical: 10, 
        paddingBottom: 20, 
    },
    inputContainer: {
        marginBottom: 5, 
        marginTop: 2, 
        height: 70, 
        // Ensuring visibility properties are inherited from the parent
        baseColor: themeColors.secondary,
        tintColor: themeColors.primary,
        textColor: themeColors.primary,
    },
    buttonWrapper: {
        marginTop: 20,
    },
});

export default AddressModal;