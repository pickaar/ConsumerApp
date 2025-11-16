import { View, Text, Image, StyleSheet, StatusBar, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from "react-native";
import { pStyles } from "@utils/theme";
import PIcon, { PIcons } from "@components/brick/Icon";
import { setConfig } from "@reducer/modalSlice";
import { setParam } from "@reducer/quoteSlice";
import { useAppDispatch } from "@store/store";

// export const WrapperItem = (Wrapped, prop) => () => (
//     <TouchableOpacity onPress={() => { console.log("TEST") }}
//         style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
//         {/* <Text>{prop.item}</Text> */}
//         <Wrapped {...prop} />
//     </TouchableOpacity>
// )

const WrapTextContent = ({ txt }) =>
    <Text>{((txt).length > 25) ? (((txt).substring(0, 25 - 3)) + '...') : txt}</Text>


const TxtWrapper = ({ item }) =>
    item.value.length > 25 ?
        <WrapTextContent txt={item?.value} /> :
        <Text>{item.value}</Text>





export const SingleLine = ({ item, index }) => {
    const dispatch = useAppDispatch();

    const navigateTo = (route) => {
            dispatch(setParam({ key: 'detailScreenRedirectTo', value: route }))
    }

    return (
        <View style={[
            styles.infoContainer,
            index != 0 && { borderTopWidth: StyleSheet.hairlineWidth },
            index != 0 && { borderTopColor: pStyles.gray }
        ]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <View>
                    <Text style={[styles.infoTitle, {}]}>{item?.key || ''}</Text>
                </View>
                <View style={[item.valueType == 'redirect' && { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
                    {(() => {
                        switch (item.valueType) {
                            case 'text':
                                return <TxtWrapper item={item} />

                            case 'redirect':
                                return (
                                    <TouchableOpacity onPress={() => navigateTo(item.navigateTo)}>
                                        <PIcon style={{ paddingLeft: 5, color: pStyles.gray, opacity: 0.9 }} type="feather" name="arrow-right" size={15}></PIcon>
                                    </TouchableOpacity>
                                )

                            default:
                                return null
                        }
                    })()}

                </View>
            </View>
        </View >
    )
}

export const MultiLine = ({ item, index }) => {
    return (
        <View key={index} style={[styles.infoContainer, item?.style ? item?.style : {}]}>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
                <View style={{ alignSelf: 'flex-start', width: '100%', paddingBottom: 3, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: pStyles.lightGray }}>
                    <Text style={[styles.infoTitle, {}]}> {item.key} </Text>
                </View>
                <View style={{ alignSelf: 'flex-start', paddingTop: 5 }} >
                    <Text style={{ fontSize: 14, fontFamily: pStyles.fontStyleM, color: pStyles.darkGray }}>{item.value}</Text>
                </View>
            </View>
        </View>
    )
}

export const MultiLineWithInfo = ({ item, index }) => {
    const dispatch = useAppDispatch();

    const openModal = (MODAL_TYPE, MODAL_CONTENT) => {

        if (MODAL_TYPE == 'CAR_DETAIL_MODAL') {
            dispatch(setConfig({
                msg: '',
                visible: true,
                modal: MODAL_TYPE, //CAR_DETAIL_MODAL
                swipeDirection: 'down',
                animationType: 'slide',
                modalContent: {}
            }))

        } else {
            dispatch(setConfig({
                msg: MODAL_CONTENT,
                visible: true,
                modal: MODAL_TYPE // INFO
            }))
        }
    }

    return (
        <View style={[styles.infoContainer, { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: pStyles.gray }]}>
            <View style={{ flexDirection: 'column', width: '100%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <View>
                        <Text style={[styles.infoTitle, {}]}>{item.key}</Text>
                    </View>
                    <View >
                        <TouchableOpacity onPress={() => {
                            openModal(item.modalType, item.modalContent)
                        }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={[styles.infoTitleValue, {}]}>
                                {item.value}
                            </Text>
                            <PIcon style={{ paddingLeft: 5, color: pStyles.infoHighlightColor, opacity: 0.9 }} type="feather" name="info" size={15}></PIcon>
                        </TouchableOpacity>

                    </View>
                </View>
                <View>
                    <Text style={{ fontFamily: pStyles.fontStyleLI, fontSize: 10, paddingTop: 1 }}>{item.info}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    infoContainer: {
        paddingVertical: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    infoTitle: {
        fontSize: 13,
        fontFamily: pStyles.fontStyleR,

    },
    infoTitleValue: {
        fontSize: 14,
        fontFamily: pStyles.fontStyleM,
        color: pStyles.darkGray
    }
});
