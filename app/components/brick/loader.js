import LottieView from 'lottie-react-native';
import Modal from "react-native-modal";
import { View, StyleSheet, Text } from "react-native";
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { DEVICE_WIDTH, DEVICE_HEIGHT } from "../../utils/dimentions";
import { themeColors } from '../../utils/constant';

export const ModalLoader = forwardRef((props, ref) => {

    const [showModal, setshowModal] = useState(false)

    useImperativeHandle(ref, () => ({
        handleModal(status) {
            setshowModal(curState => curState = status)
        }
    }));

    const styles = StyleSheet.create({
        modal: {
            flex: 1,
            width: DEVICE_WIDTH,
            height: DEVICE_HEIGHT,
            alignItems: 'center',
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
        modalView: {

            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            bottom: 0,
            height: 150,
            width: DEVICE_WIDTH,
            alignItems: 'center',
            backgroundColor: themeColors.white,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 6


        }
    })

    return (
        <Modal
            animationType="fade"
            visible={showModal}
            transparent={true}
            backdropOpacity={0.7}
            statusBarTranslucent={true}
            style={{ flex: 1, margin: 0 }}
        >
            <View style={styles.modal}>
                <View style={[styles.modalView, {}]}>
                    <View style={{ padding: 15, height: 50 }}>
                        <Text>{props.msg}</Text>
                    </View>
                    <View style={{ padding: 15, height: 100 }}>
                        <LottieView
                            style={{ height: 50 }}
                            source={require('../../../assets/lottie/booking_loader.json')}
                            autoPlay={true}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
})