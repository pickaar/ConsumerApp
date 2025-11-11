import { Linking, Platform, Alert } from "react-native";

/**
 * Opens the native map application (Apple Maps or Geo/Google Maps) 
 * at the specified latitude and longitude.
 * * @param {number} lat - Target latitude.
 * @param {number} lng - Target longitude.
 */
export const openGps = (lat, lng) => {
    // 💡 FIX: The scheme variable is either 'maps:' or 'geo:', NOT 'ios'.
    // The conditional needs to determine the base URL scheme first.
    let scheme;
    let url;

    if (Platform.OS === 'ios') {
        // iOS: uses the 'maps:' scheme or a universal Google Maps URL for better experience
        scheme = 'maps:';
        // We use the scheme directly for the URL
        url = scheme + `${lat},${lng}`;
    } else {
        // Android: uses the 'geo:' scheme
        scheme = 'geo:';
        // The geo scheme format is 'geo:lat,lng'
        url = scheme + `${lat},${lng}`;
    }

    // You can also use the universal Google Maps URL for all platforms:
    // const universalUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    // url = universalUrl; 

    Linking.canOpenURL(url).then(supported => {
        console.log(`Checking URL support: ${url}`, supported);
        if (supported) {
            Linking.openURL(url);
        } else {
            // Display an informative warning if map app is not available
            const mapName = Platform.OS === 'ios' ? 'Apple Maps' : 'Google Maps';
            Alert.alert(
                "Warning",
                `Unable to open map in external App. Please make sure ${mapName} is installed properly.`
                , [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        }
    }).catch(err => console.error('An error occurred while linking:', err));
};