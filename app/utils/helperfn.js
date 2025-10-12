import { Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const wrapTextContent = (mytextvar, maxlimit) => {
    return (
        <Text>{((mytextvar).length > maxlimit) ?
            (((mytextvar).substring(0, maxlimit - 3)) + '...') :
            mytextvar}</Text>
    )
}


/**
 * @param {login} status
 * @info : Store async status  
 */

export const storeData = async (key, value) => {
    try {
        return await AsyncStorage.setItem(key, value)
    } catch (e) {
        // saving error
        return e
    }
}


export const getData = async (key) => {
    try {
        return await AsyncStorage.getItem(key);
    } catch (e) {
        // error reading value
        return e
    }
}

