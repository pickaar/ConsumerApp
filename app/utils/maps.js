import { Linking, Platform, Alert } from "react-native";

export const openGps = (lat, lng) => {
    var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:'
    var url = scheme + '37.484847,-122.148386'
    Linking.canOpenURL(url).then(supported => {
        console.log(supported)
        if (supported) {
            Linking.openURL(url);
        } else {
            Alert.alert(
                "Warning",
                `Unable to open in map in external App. Please make sure your ${scheme == 'ios' ? 'Apple Map' : 'Google Map'} is installed properly. `
                , [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            )
        }
    });
}