import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
    Alert,
} from 'react-native';
import { useAppDispatch } from '../../store/store';
import { updateUserThunk } from '../../store/thunk/userThunk';
import { useAppSelector } from '../../store/hook';
import { setIsLoading, setUserNameAndEmail } from '../../store/reducer/userSlice';
import { API_CALL_STATUS } from '../../utils/constant';

const { height } = Dimensions.get('window');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const GetNameAndEmailModal = ({ closeModal }) => {
    const dispatch = useAppDispatch();
    const phoneNo = useAppSelector(state => state.user.userData.phoneNo);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isProgress, setIsProgress] = useState(false);
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');

    const validateForm = () => {
        let valid = true;

        if (name.trim() === '') {
            setNameError('Name cannot be empty.');
            valid = false;
        } else {
            setNameError('');
        }

        if (email.trim() === '') {
            setEmailError('Email cannot be empty.');
            valid = false;
        } else if (!EMAIL_REGEX.test(email.trim())) {
            setEmailError('Please enter a valid email format.');
            valid = false;
        } else {
            setEmailError('');
        }

        return valid;
    };

    const handlePress = () => {
        if (isProgress) return;

        if (!validateForm()) {
            return;
        }

        setIsProgress(true);
        dispatch(setUserNameAndEmail({ userName: name.trim(), emailId: email.trim() }));
        dispatch(setIsLoading({ key: 'updateUserLoader', status: API_CALL_STATUS.PENDING }));
        dispatch(updateUserThunk({ phoneNo, userName: name.trim(), emailId: email.trim() }));
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardContainer}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -height * 0.1}
        >
            <View style={styles.modalContent}>
                <Text style={styles.title}>Enter Basic details to proceed.</Text>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={[styles.input, nameError && styles.inputError]}
                        value={name}
                        onChangeText={(text) => {
                            setName(text);
                            if (nameError) setNameError('');
                        }}
                        placeholder={"Enter your name"}
                        keyboardType={"default"}
                        autoCapitalize="words"
                    />
                    {!!nameError && <Text style={styles.errorText}>{nameError}</Text>}
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={[styles.input, emailError && styles.inputError]}
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text);
                            if (emailError) setEmailError('');
                        }}
                        placeholder={"Enter your email"}
                        keyboardType={"email-address"}
                        autoCapitalize="none"
                    />
                    {!!emailError && <Text style={styles.errorText}>{emailError}</Text>}
                </View>

                <View style={styles.buttonWrapper}>
                    <TouchableOpacity
                        style={[styles.submitButton, { backgroundColor: '#c0c0c0' }]}
                        onPress={closeModal}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handlePress}
                        activeOpacity={0.7}
                        disabled={isProgress}
                    >
                        <Text style={styles.buttonText}>{isProgress ? "Submitting..." : "Submit"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    keyboardContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
    },
    modalContent: {
        width: "100%",
        height: 450,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        paddingTop: 30,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    inputGroup: {
        width: '90%',
        marginTop: 15,
        flexDirection: 'column',
        gap: 5,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        fontSize: 16,
        backgroundColor: '#fff',
        height: 45,
    },
    inputError: {
        borderColor: '#e74c3c',
        borderWidth: 2,
    },
    errorText: {
        color: '#e74c3c',
        fontSize: 12,
        marginTop: 4,
    },
    buttonWrapper: {
        width: '90%',
        marginTop: 30,
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitButton: {
        backgroundColor: '#3498db',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default GetNameAndEmailModal;
