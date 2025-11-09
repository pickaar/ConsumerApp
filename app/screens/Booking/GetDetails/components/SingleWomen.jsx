import React, { useState } from "react";
import { View, Text } from "react-native";
import CheckBox from "react-native-check-box";
import { useAppDispatch } from "@store/store";
import { setBookingParam } from "@store/reducer/bookingSlice";
import { themeColors } from "@utils/constant";
import { fonts } from "@utils/theme";

const SingleWomen = () => {
    const dispatch = useAppDispatch();
    const [isSingleWomen, setIsSingleWomen] = useState(false);

    const handleCheck = () => {
        const newValue = !isSingleWomen;
        setIsSingleWomen(newValue);
        dispatch(setBookingParam({ key: "isSingleWomen", value: newValue }));
    };

    return (
        <View style={{ width: "100%" }}>
            <CheckBox
                style={{ paddingTop: 10 }}
                onClick={handleCheck}
                isChecked={isSingleWomen}
                rightText="Single Women"
                rightTextStyle={{ color: themeColors.primary }}
            />
            <View style={{ paddingLeft: 30 }}>
                <Text style={{ fontSize: 9, fontFamily: fonts.RubikLight }}>
                    Additional safety action will be taken
                </Text>
            </View>
        </View>
    );
};

export default SingleWomen;