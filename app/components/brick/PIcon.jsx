import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
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
};

const PIcon = ({ type, name, color, size = 24, style, gradient = false }) => {
    const Tag = PIconSet[type];
    
    const defaultGradientColors = [themeColors.primary, themeColors.yellow];

    if (!Tag || !name) {
        return null; 
    }

    if (gradient) {
        return (
            <MaskedView
                maskElement={
                    <Tag 
                        name={name} 
                        size={size} 
                        color="black" 
                        style={style} 
                    />
                }
            >
                <LinearGradient
                    colors={defaultGradientColors}
                    start={{ x: 0, y: 1 }} 
                    end={{ x: 1, y: 1 }}
                    style={{ 
                        width: size, 
                        height: size, 
                        }}
                />
            </MaskedView>
        );
    } 
    
    else {
        return (
            <Tag 
                name={name} 
                size={size} 
                color={color || themeColors.black} 
                style={style} 
            />
        );
    }
};

export default PIcon;