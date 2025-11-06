import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { themeColors } from '@utils/constant';

const OtpInputContainer = ({ postEnteredOTP }) => {
    const [pins, setPin] = useState(
        {
            pin1: '',
            pin2: '',
            pin3: '',
            pin4: '',
            pin5: '',
            pin6: ''
        }
    );

    const setOTPToParent = (pin) => postEnteredOTP(pin)

    useEffect(() => {
        //Check all pin entered
        const status = Object.values(pins).some(x => x == '');
        if (!status) {
            let pin = Object.values(pins).join('');
            setOTPToParent(pin);
        }

    }, [pins])

    const pinRefs = Array.from({ length: 6 }, () => useRef(null));

    const handleChange = (index, value) => {
        setPin(prev => ({
            ...prev,
            [`pin${index + 1}`]: value
        }));
        if (value !== '') {
            if (index < 5) {
                pinRefs[index + 1].current.focus();
            } else {
                pinRefs[index].current.blur();
            }
        }
    };

    return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
            {[...Array(6)].map((_, i) => (
                <TextInput
                    key={i}
                    autoFocus={i === 0 ? true : false}
                    placeholder=''
                    style={{ borderWidth: 2, borderColor: themeColors.secondary, borderRadius: 10, height: 40, width: 40, textAlign: 'center' }}
                    ref={pinRefs[i]}
                    maxLength={1}
                    keyboardType="number-pad"
                    onChangeText={pin => handleChange(i, pin)}
                />
            ))}
        </View>
    );
}

export default OtpInputContainer;


const styles = StyleSheet.create({
    otpContainer: {
    }
})