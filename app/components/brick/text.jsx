import { useNavigation } from '@react-navigation/native';
import { Text, View, TouchableOpacity } from 'react-native';
import { themeColors } from '../../utils/constant';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@utils/constant';
import { fonts } from '../../utils/theme';
import PIcon, { PIcons } from './Icon';
import React, { useCallback, memo } from 'react';


export const TitleWithBackBtn = ({ name }) => {
    const navigation = useNavigation();
    const onBackBtnPress = () => {
        navigation.goBack();
    }

    return (
        <View style={{ backgroundColor: themeColors.yellow, height: 40, width: '100%', flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ paddingLeft: 10, flexDirection: 'row' }}>
                <TouchableOpacity onPress={onBackBtnPress} style={{}}>
                    <PIcon type={PIcons.Feather} name="arrow-left" size={25}></PIcon>
                </TouchableOpacity>
                <View style={{ alignSelf: 'center', justifyContent: 'center', width: '100%', }}>
                    <Text style={{ color: themeColors.primary, fontFamily: fonts.RubikBlack, fontSize: 14, paddingLeft: 5 }}> {name}</Text>
                </View>
            </View>
        </View>
    )
}

export const BlockTitle = ({ name, size }) => {
    const firstLetter = name.slice(0, 1);
    const restLetter = name.slice(1, name.length);
    const _size = {
        fontSize: size == 'small' ? 16 : 27,
        paddingLeft: size == 'small' ? 15 : 20,
        paddingTop: size == 'small' ? 1 : 9
    }
    return (
        <View style={{ flexDirection: 'row', alignSelf: 'baseline', justifyContent: 'flex-start', paddingLeft: _size.paddingLeft, paddingTop: 15, paddingBottom: 10 }}>
            <View style={{ flexDirection: 'row', borderBottomWidth: 4, borderColor: themeColors.yellow }}>
                <Text style={{ fontSize: _size.fontSize, fontFamily: fonts.RubikMedium, marginBottom: 1 }}>{firstLetter}</Text>
            </View>
            <Text style={{ fontSize: 16, paddingTop: _size.paddingTop, fontFamily: fonts.RubikMedium }}>{restLetter}</Text>
        </View >
    )
}

const PText = (props, { fontFamily }) => {
    return (
        <Text style={{ fontFamily: fontFamily }} {...props} >{props.children}</Text>
    )
}

const PTitle = (props) => {
    console.log("TEXT CALLED")
    return (
        <Text {...props}> {props.children}</Text>
    )
}

const Label = (props) => {
    return (
        <Text {...props} style={{ fontFamily: fonts.RubikLight, fontSize: 16 }} >{props.children}</Text>
    )
}

const Value = (props) => {
    return (
        <Text {...props} style={{ fontFamily: fonts.RubikBold, fontSize: 18, color: themeColors.primary }} >{props.children}</Text>
    )
}
const PHeadings = memo(({ backBtnPressed, title }) => {

    const onBackBtnPress = useCallback(() => {
        if (typeof backBtnPressed === 'function') {
            backBtnPressed();
        }
    }, [backBtnPressed]);

    return (
        <View style={{ marginLeft: 0, paddingLeft: DEVICE_WIDTH * 0.03, height: DEVICE_HEIGHT * 0.15, flexDirection: 'column' }}>
            <TouchableOpacity onPress={onBackBtnPress} style={{ marginTop: 10 }}>
                <PIcon type={PIcons.Feather} name="arrow-left" size={25} />
            </TouchableOpacity>
            <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 25, fontFamily: fonts.RubikMedium }}>{title}</Text>
            </View>
        </View>
    );
});

export { PText, PTitle, PHeadings, Label, Value }