import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, ScrollView, FlatList, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "@utils/constant";
import { fonts, pStyles } from "@utils/theme";
import Modal from "react-native-modal";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setModalParam } from "@store/reducer/modalSlice";
import { themeColors } from "@utils/constant";
import PIcon, { PIcons } from "@components/brick/Icon";
import { setParam } from "@store/reducer/userSlice";
import { PInputFilled, PInputOutlined } from "../brick/inputs";
import GetNameAndEmailModal from "./GetNameAndEmailModal";
import { AddressInputModalContent } from "../../screens/Settings/Location/AddressInputComponent";

const InforModalContent = ({ closeModal, msg }) => {

    return (
        <TouchableWithoutFeedback>
            <View style={styles.modal}>
                <View style={[styles.modalView, {}]}>

                    <View style={{ padding: 15, }}>
                        <Text>{msg}</Text>
                    </View>

                    <TouchableOpacity activeOpacity={0.9} onPress={closeModal} style={{ backgroundColor: pStyles.white, width: '100%', alignItems: 'center', justifyContent: 'flex-end', height: 50 }}>
                        <View style={{ height: 40, width: '90%', backgroundColor: pStyles.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                            <Text style={{ fontFamily: pStyles.fontStyleM, letterSpacing: 1.1, fontSize: 18, color: pStyles.white }}>OK</Text>
                        </View>
                    </TouchableOpacity >
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const CarModalContent = ({ closeModal, modalContent }) => {

    /***
     * @todo Need to work on ModalContent to show vehicle detail
     */
    return (
        <TouchableWithoutFeedback>
            <View style={styles.modal1}>
                <View style={[styles.modalView1, {}]}>
                    <View style={{ height: 120, width: '90%', marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                        <Image source={require('../../../assets/cars/ritz.jpeg')} style={{ height: 100, width: 150 }}></Image>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', paddingTop: 10, paddingBottom: 10, marginTop: 20 }}>
                        <View style={{}}>
                            <Text style={{
                                fontSize: 13,
                                fontFamily: pStyles.fontStyleR
                            }}>Car Modal</Text>
                        </View>
                        <View style={{}}>
                            <Text style={{
                                fontSize: 14,
                                fontFamily: pStyles.fontStyleM,
                                color: pStyles.darkGray
                            }}>Maruthi Ritz</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', paddingTop: 10, paddingBottom: 10, }}>
                        <View style={{}}>
                            <Text style={{
                                fontSize: 13,
                                fontFamily: pStyles.fontStyleR
                            }}>Luggage Capacity</Text>
                        </View>
                        <View style={{}}>
                            <Text style={{
                                fontSize: 14,
                                fontFamily: pStyles.fontStyleM,
                                color: pStyles.darkGray
                            }}>280 L</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', paddingTop: 10, paddingBottom: 10, }}>
                        <View style={{}}>
                            <Text style={{
                                fontSize: 13,
                                fontFamily: pStyles.fontStyleR
                            }}>Setters</Text>
                        </View>
                        <View style={{}}>
                            <Text style={{
                                fontSize: 14,
                                fontFamily: pStyles.fontStyleM,
                                color: pStyles.darkGray
                            }}>4 (Passangers) + 1 (Driver)</Text>
                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={0.9} onPress={closeModal} style={{ marginBottom: 10, marginTop: 50, backgroundColor: pStyles.white, width: '100%', alignItems: 'center', justifyContent: 'flex-end', height: 50 }}>
                        <View style={{ height: 40, width: '90%', backgroundColor: pStyles.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 5, }}>
                            <Text style={{ fontFamily: pStyles.fontStyleM, letterSpacing: 1.1, fontSize: 18, color: pStyles.white }}>Okay</Text>
                        </View>
                    </TouchableOpacity >
                </View>

            </View>
        </TouchableWithoutFeedback>
    )
}

const gotoGetAddressPage = () => { console.log("GOTO MAP ADDRESS PAGE") }


const Item = ({ item }) => {
    const dispatch = useDispatch();
    let locations = useSelector((state) => state.user.locations);

    const selectThisAddress = (addressId) => {
        //Reset Primary address
        const index = locations.findIndex((item) => item.isPrimary === true)
        const index2 = locations.findIndex((item) => item._id == addressId)
        const newLoc = locations.map((value, key) => {
            if (key == index)
                return { ...value, isPrimary: false }

            if (key == index2)
                return { ...value, isPrimary: true }

            return value;
        })

        dispatch(setParam({ key: "locations", value: newLoc }))
        dispatch(setModalParam({ key: "visibleConfig", value: false }))
    }

    return (
        <TouchableWithoutFeedback onPress={() => selectThisAddress(item._id)} key={item._id}>
            <View style={[styles.addressItem, { backgroundColor: item.isPrimary ? themeColors.lightGray2 : themeColors.white }]}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <PIcon type="feather" style={{ color: item.isPrimary ? themeColors.yellow : themeColors.primary }} name="map-pin" />
                    <Text style={[styles.addressTxtName, { color: item.isPrimary ? themeColors.primary : themeColors.secondary }]}>{item.name}</Text>
                </View >
                <View style={{ flex: 2, flexDirection: 'row' }}>
                    <View style={{ flex: 2 }}>
                        <Text style={[styles.addressTxtValue, { opacity: item.isPrimary ? 0.6 : 1 }]}  > {((item.address).length > 45) ?
                            (((item.address).substring(0, 45 - 3)) + '...') :
                            item.address}</Text>
                    </View>
                    <TouchableOpacity onPress={gotoGetAddressPage} style={{ flex: 0.2, backgroundColor: themeColors.yellow, alignContent: "flex-end", paddingVertical: 1, paddingHorizontal: 5 }}>
                        <Text style={{ color: themeColors.primary, fontFamily: 'auto', fontWeight: "bold", letterSpacing: 0 }}>Edit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const AddressPickerContent = ({ closeModal }) => {
    const locations = useSelector((state) => state.user.locations);
    const renderItem = ({ item }) => (
        <Item item={item} />
    );

    return (
        <View style={styles.modal3}>
            <View style={[styles.modalView3, {}]}>

                <View style={styles.addressContainer} >
                    <FlatList
                        horizontal={false}
                        data={locations}
                        scrollEnabled={true}
                        renderItem={renderItem}
                        keyExtractor={item => item._id}
                    />
                </View>

                <TouchableOpacity activeOpacity={0.9} onPress={closeModal} style={{ backgroundColor: pStyles.white, width: '100%', alignItems: 'center', justifyContent: 'flex-end', height: 50 }}>
                    <View style={{ height: 40, width: '100%', backgroundColor: pStyles.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontFamily: pStyles.fontStyleM, letterSpacing: 1.1, fontSize: 18, color: pStyles.white }}>Add New</Text>
                    </View>
                </TouchableOpacity >
            </View>
        </View>
    )
}

export const ModalComponent = (prop) => {
    const dispatch = useDispatch();

    const isVisible = useSelector((state) => state.modal.visibleConfig)
    const isTransparent = useSelector((state) => state.modal.transparentConfig)
    const animationType = useSelector((state) => state.modal.animationTypeConfig)
    const swipeDirection = useSelector((state) => state.modal.swipeDirectionConfig)
    const modalName = useSelector((state) => state.modal.modalName)
    const msg = useSelector((state) => state.modal.message)
    const modalContent = useSelector((state) => state.modal.modalContent)
    const [showModal, setInfoModalVisible] = useState(isVisible);

    useEffect(() => {
        setInfoModalVisible(isVisible);
    }, [isVisible])

    const closeModal = () => {
        setInfoModalVisible(false);
        dispatch(setModalParam({ key: "visibleConfig", value: false }))
    }

    return (
        <Modal
            // propagateSwipe={true}
            animationType={animationType}
            visible={showModal}
            // hasBackdrop={true}
            transparent={isTransparent}
            backdropOpacity={showModal ? 0.7 : 1}
            // statusBarTranslucent={true}
            swipeDirection={swipeDirection}

            // statusBarTranslucent={infoModalVisible}
            onRequestClose={closeModal}
            style={{ flex: 1, margin: 0, height: DEVICE_HEIGHT }}
        >
            {modalName == 'INFO' && <InforModalContent closeModal={closeModal} msg={msg} />}

            {modalName == 'CAR_DETAIL_MODAL' && <CarModalContent closeModal={closeModal} modalContent={modalContent} />}

            {modalName == 'ADDRESS_PICKER' && <AddressPickerContent closeModal={closeModal} />}

            {modalName == 'GET_NAME_EMAIL' && <GetNameAndEmailModal closeModal={closeModal} />}
        </Modal>
    )
}


const styles = StyleSheet.create({
    modal: {
        flex: 1,
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView: {
        borderRadius: 20,
        height: 200,
        width: DEVICE_WIDTH * 0.9,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: pStyles.white,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 6

    },
    modal1: {
        flex: 1,
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT,
        alignItems: 'center',
        justifyContent: 'flex-end',
        // position: 'absolute',
        // zIndex: 9999
    },
    modalView1: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        bottom: 0,
        width: DEVICE_WIDTH,
        alignItems: 'center',
        backgroundColor: pStyles.white,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 6

    },
    modal3: {
        flex: 1,
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView3: {
        flex: 0.3,
        borderRadius: 5,
        width: DEVICE_WIDTH * 0.9,
        justifyContent: 'flex-end',
        backgroundColor: pStyles.white,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 6
    },
    addressContainer: {
        flex: 1,
        margin: 0,
        padding: 0

    },
    addressItem: {
        paddingVertical: 10,
        paddingHorizontal: 7,
        flex: 1,
        flexDirection: "column",
        // marginVertical: 8,
        // marginHorizontal: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: themeColors.darkGray
    },
    addresstitle: {
        fontSize: 32,
        color: '#fff'
    },
    addressTxtName: {
        paddingHorizontal: 5,
        fontFamily: fonts.RubikExtraBold,
        fontSize: 16,

    }, addressTxtValue: {
        fontSize: 12
    }
})

