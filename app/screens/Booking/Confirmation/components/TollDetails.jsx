import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { fonts } from "@utils/theme";
import { themeColors } from "@utils/constant";
import { PIcons } from "@components/brick/Icon";
import { openGps } from "@utils/maps";

const TollDetails = (tolls) => {

    return (
        <View style={{
            paddingHorizontal: 20,
            marginTop: 20
        }}>
            <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                <Text style={{ fontFamily: fonts.RubikBold, fontSize: 20, color: themeColors.primary }} >Tolls Details</Text>
            </View>
            <View style={{
                paddingVertical: 10,
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                {
                    tolls.map((obj, index) => {
                        return (

                            <View key={index} style={{
                                flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%',
                                borderTopWidth: StyleSheet.hairlineWidth,
                                borderTopColor: themeColors.gray,
                                paddingVertical: 10
                            }}>
                                <View style={{}}>
                                    <Text style={{
                                        fontSize: 13,
                                        fontFamily: fonts.RubikRegular
                                    }}>{obj.name} </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{}}>
                                        <Text style={{
                                            fontSize: 14,
                                            fontFamily: fonts.RubikMedium,
                                            color: themeColors.darkGray
                                        }}  >
                                            {'\u20B9'}{obj.tagCost}
                                        </Text>
                                    </View>
                                    <TouchableOpacity onPress={() => openGps(obj.lat, obj.lng)}>
                                        <PIcons style={{ paddingLeft: 5, color: themeColors.infoHighlightColor, opacity: 0.9 }} type={PIcons.Feather} name="map-pin" size={15}></PIcons>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        )
                    })
                }
            </View>
        </View>
    )
}

export default TollDetails;
