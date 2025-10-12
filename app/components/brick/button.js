import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { themeColors } from '../../utils/constant';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

/***
 * BtnConfig will have following properties
 * 
    config={{
        label: 'Proceed',*
        outlinedBtn: Boolean, 
        customStyles:{
            container: 'flex-end'/'flex-start'/'flex-end',
            justifyTxtIcon:   JUSTIFY_CSS_PROPERY ,
           
        },
        icon:{
            isRequired: Boolean, *
            name:'',// name of the icon ex: 'navigate-next'
            customStyles: {
                container: ''
            }
        }
    }} 
    
    (config, funs...)
    
 */


const PBtn = ({ config, onPress }) => {

    //OnPress event will trigger Parent container func
    const onBtnPress = () => onPress();

    //Btn color modifier 
    const outLinedBtnTxtColor = (config.outlinedBtn) ? { color: themeColors.primary } : { color: themeColors.light };

    const { customStyles, icon } = config;

    return (
        <TouchableOpacity
            style={[config.outlinedBtn ? styles.outlinedBtnStyle : styles.btnOneContainer, { height: 50 }, customStyles?.container]}
            onPress={onBtnPress}>

            <View style={[styles.container, { justifyContent: customStyles?.justifyTxtIcon || 'center' }]}>
                <View >
                    <Text
                        style={[styles.btnOneText, outLinedBtnTxtColor]}>
                        {config.label}
                    </Text>
                </View>

                {(icon.isRequired) &&
                    <View
                        style={[customStyles?.container]}>

                        <MaterialIcons
                            name={icon.name}
                            color={outLinedBtnTxtColor}
                            size={30} />
                    </View>
                }

            </View>
        </TouchableOpacity >
    )
}

export { PBtn };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnOneContainer: {
        elevation: 8,
        backgroundColor: themeColors.primary,
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 7
    },
    outlinedBtnStyle: {
        elevation: 8,
        backgroundColor: themeColors.yellow,
        borderWidth: 2,
        borderColor: themeColors.secondary,
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 7
    },
    btnOneText: {
        fontSize: 18,
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
})