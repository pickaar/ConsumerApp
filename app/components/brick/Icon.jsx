// @components/brick/Icon.js

import React from 'react';
// ... (Your imports remain the same)
import { AntDesign, Entypo, Feather, FontAwesome, FontAwesome5, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons } from '@expo/vector-icons';


export const PIcons = {
    materialCommunityIcon: MaterialCommunityIcons,
    materialIcons: MaterialIcons,
    iconIcons: Ionicons,
    feather: Feather,
    fontAwesome: FontAwesome,
    fontAwesome5: FontAwesome5,
    antDesign: AntDesign,
    entypo: Entypo,
    simpleLineIcons: SimpleLineIcons,
    octicons: Octicons,
    foundation: Foundation,
};

const PIcon = ({ type, name, color, size = 16, style }) => {
    const defaultSize = 24;

    // --- 💡 FIX IS HERE ---
    // 1. Look up the component using the string `type` in the `PIcons` map.
    const Tag = PIcons[type]; 
    // 2. Check if the component was found.
    if (!Tag) {
        console.error(`PIcon Error: Invalid icon type prop received: "${type}". Expected one of: ${Object.keys(PIcons).join(', ')}`);
        return null; // Don't crash, just render nothing.
    }
    
    return (
        <Tag
            name={name}
            size={size || defaultSize}
            // Use the passed color prop, falling back to a default if needed
            color={color || '#fff'} 
            style={style}
        />
    );
};

export default PIcon;