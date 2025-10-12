
import { View, StyleSheet, Text } from "react-native";
import { themeColors } from "../../utils/constant";
const Line = () => {
    return (
        <View
            style={{
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginBottom: 10,
                marginTop: 10,
                borderBottomColor: themeColors.darkGray,
                opacity: 0.4
            }}
        />
    )
}


const LineWithTxt = ({ txt, color }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 10 }}>
            <View style={{ flex: 1, height: 1, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: themeColors.secondary, opacity: 0.4 }} />
            <View>
                <Text style={{ width: 50, textAlign: 'center', color: themeColors.primary, fontStyle: "italic", fontSize: 11, fontWeight: "800" }}>{txt}</Text>
            </View>
            <View style={{ flex: 1, height: 1, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: themeColors.secondary, opacity: 0.4 }} />
        </View>
    )
}
export { Line, LineWithTxt }

const styles = StyleSheet.create({
    hrStyle: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 10,
        marginTop: 10,
        borderBottomColor: themeColors.yellow
    }
})