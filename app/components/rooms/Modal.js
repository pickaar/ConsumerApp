import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from "react-native";
import { themeColors } from '../../utils/constant';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../utils/dimentions';

import Modal from "react-native-modal";
import { fonts } from '../../utils/theme';
export default function ModalInfo(props) {

    const [modalVisible, setModalVisible] = useState(props.showModal);

    return (
        <Modal
            animationType="slide"
            visible={modalVisible}
            hasBackdrop={true}
            transparent={true}
            backdropOpacity={0.5}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
            style={{}}
        >
            <TouchableWithoutFeedback>
                <View style={styles.modal}>
                    <View style={[styles.modalView, {}]}>
                        {props.children}

                        <TouchableOpacity activeOpacity={0.9} onPress={() => setModalVisible(false)} style={{ backgroundColor: themeColors.white, width: '100%', alignItems: 'center', justifyContent: 'flex-end', height: 50 }}>
                            <View style={{ height: 40, width: '90%', backgroundColor: themeColors.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 5, }}>
                                <Text style={{ fontFamily: fonts.RubikMedium, letterSpacing: 1.1, fontSize: 18, color: themeColors.white }}>Okay</Text>
                            </View>
                        </TouchableOpacity >
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}
const styles = StyleSheet.create({
    modal: {
        flex: 1,
        width: DEVICE_WIDTH * 0.9,
        height: DEVICE_HEIGHT,
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'absolute',
        zIndex: 9999
    },
    modalView: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 400,
        bottom: 0,
        width: DEVICE_WIDTH,
        padding: 35,
        justifyContent: 'space-between',
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