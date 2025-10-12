import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Foundation from 'react-native-vector-icons/Foundation';
import { Icon } from 'react-native-gradient-icon';
import { themeColors } from '../../utils/constant';

export const PIconSet = {
    MaterialCommunityIcons,
    MaterialIcons,
    Ionicons,
    Feather,
    FontAwesome,
    FontAwesome5,
    AntDesign,
    Entypo,
    SimpleLineIcons,
    Octicons,
    Foundation,
}

const PIcon= ({ type, name, color, size = 16, style, gradient = false }) => {
    const fontSize = 24;
    const Tag = type;

    if (gradient) {
        return (
            <>
                {type && name && (
                    <Icon
                        size={size || fontSize}
                        
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        colors={[
                            { color: themeColors.primary, offset: "0", opacity: "1" },
                            { color: themeColors.yellow, offset: "1", opacity: "1" },
                        ]}
                        name={name} style={style} />
                )}
            </>
        )
    } else {
        return (
            <>
                {type && name && (
                    <Tag name={name} size={size || fontSize} color={color} style={style} />
                )}
            </>
        )
    }
}
const PIcon2 = () => {
    const fontSize = 24;
    const Tag = type;
    return (
        <></>
    )
}
export default PIcon