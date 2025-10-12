import { Alert, Button, View } from 'react-native';

const showSimpleAlert = (msg) => {
  Alert.alert(
    "Error",
    msg,
    // The third parameter is an array of buttons (optional)
    [{ text: "OK", onPress: () => console.log("OK Pressed") }]
  );
};

const PAlert = (msg) => (
  <View>
    {showSimpleAlert(msg)}
  </View>
);

export default PAlert;