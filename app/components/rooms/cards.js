import { View, Text, StyleSheet } from "react-native";
import { themeColors } from "../../utils/constant";
import { fonts } from "../../utils/theme";
import PIcon, { PIcons } from "../brick/Icon";

export function CardFromTo() {
    return (
        <>
            <View style={[styles.container]}>
                <View style={{ width: '100%', height: 100, padding: 20, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: themeColors.yellow }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <PIcon name="circle" type={PIcons.Feather}  size={13} style={{ color: '#629303' }} />
                        <View>
                            <Text style={{ color: themeColors.white, fontFamily: fonts.RubikBold, fontSize: 10, paddingLeft: 5 }}> Thiru Nagar, katpadi, Vellore - 632006</Text>
                            <Text style={{ color: themeColors.yellow, fontFamily: fonts.RubikBold, fontSize: 8, paddingLeft: 5 }}> 14, April 2022 01:30 PM</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10 }}>
                        <PIcon name="disc" type={PIcons.Feather} size={13} style={{ color: '#629303' }} />
                        <View>
                            <Text style={{ color: themeColors.white, fontFamily: fonts.RubikBold, fontSize: 10, paddingLeft: 5 }}> Perumbakkam, Chennai - 600100</Text>
                            <Text style={{ color: themeColors.yellow, fontFamily: fonts.RubikBold, fontSize: 8, paddingLeft: 5 }}> 14, April 2022 04:30 PM </Text>
                        </View>
                    </View>

                </View>
                <View style={{ flexDirection: 'row', height: 50, width: '100%' }}>
                    <View style={{ padding: 3, width: '33%', borderRightWidth: StyleSheet.hairlineWidth, borderRightColor: themeColors.yellow }}>
                        <View style={{ flexDirection: 'column', height: '100%', alignItems: "center", justifyContent: "space-around" }}>
                            <View><Text style={{ color: themeColors.white, fontFamily: fonts.RubikBold, fontSize: 10 }}>Expected </Text></View>
                            <View><Text style={{ color: themeColors.yellow, fontFamily: fonts.RubikRegular, fontSize: 13 }}>2342</Text></View>
                        </View>
                    </View>
                    <View style={{ padding: 3, width: '33%', borderRightWidth: StyleSheet.hairlineWidth, borderRightColor: themeColors.yellow }}>
                        <View style={{ flexDirection: 'column', height: '100%', alignItems: "center", justifyContent: "space-around" }}>
                            <View><Text style={{ color: themeColors.white, fontFamily: fonts.RubikBold, fontSize: 10 }}>Estd. Price</Text></View>
                            <View><Text style={{ color: themeColors.yellow, fontFamily: fonts.RubikRegular, fontSize: 13 }}>{'\u20B9'}223</Text></View>
                        </View>
                    </View>
                    <View style={{ padding: 3, width: '33%', }}>
                        <View style={{ flexDirection: 'column', height: '100%', alignItems: "center", justifyContent: "space-around" }}>
                            <View><Text style={{ color: themeColors.white, fontFamily: fonts.RubikBold, fontSize: 10 }}>Estd. Dist.</Text></View>
                            <View><Text style={{ color: themeColors.yellow, fontFamily: fonts.RubikRegular, fontSize: 13 }}>38/Km</Text></View>
                        </View>
                    </View>
                </View>
            </View >
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
        backgroundColor: themeColors.primary,
        borderRadius: 15,
        height: 150,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
    }
})