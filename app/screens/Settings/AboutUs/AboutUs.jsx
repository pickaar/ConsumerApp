import { StyleSheet, View, Text } from "react-native"
import { PHeadings } from "../../../components/brick/text"
import { pStyles } from "../../../utils/theme"

export const AboutUs = ({ navigation }) => {

    const backBtnPressed = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <PHeadings title="About Us" backBtnPressed={backBtnPressed} />

            <View style={{ flex: 1, alignItems: "flex-start", justifyContent: "flex-start" }}>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listBlock: { backgroundColor: pStyles.lightGray, width: '100%', paddingHorizontal: 5 }
})