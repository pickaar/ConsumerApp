import React from 'react';

import { AntDesign, Entypo, Feather, FontAwesome, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons } from '@expo/vector-icons';


/**
 * Maps icon type strings to the actual imported component.
 */
export const PIcons = {
    MaterialCommunityIcons,
    MaterialIcons,
    Ionicons,
    Feather,
    FontAwesome,
    AntDesign,
    Entypo,
    SimpleLineIcons,
    Octicons,
    Foundation,
};

/**
 * A simple wrapper component for all react-native-vector-icons sets.
 * @param {string} type - The key from PIconSet (e.g., 'AntDesign').
 * @param {string} name - The name of the icon (e.g., 'home').
 * @param {string} color - The color of the icon.
 * @param {number} size - The size of the icon.
 * @param {object} style - Additional styles for the icon.
 */
const PIcon = ({ type, name, color, size = 16, style }) => {
    const defaultSize = 24;

    const Tag = PIcons[type];
    console.log('PIcon - type:', type, 'name:', name, 'size:', PIcons[4]);
    // if (Tag && name) {
    return (
        <Tag
            name={name}
            size={size || defaultSize}
            color="#fff"
            style={style}
        />
    );
    // }

    return null;
};


export default PIcon;