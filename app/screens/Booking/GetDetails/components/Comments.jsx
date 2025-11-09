import React from "react";
import { View } from "react-native";
import { TextField } from "rn-material-ui-textfield";
import { useAppDispatch } from "@store/store";
import { themeColors, DEVICE_WIDTH } from "@utils/constant";
import { setBookingParam } from "@store/reducer/bookingSlice";

const Comments = () => {
    const dispatch = useAppDispatch();

    const handleChange = (comments) => {
        dispatch(setBookingParam({ key: "comments", value: comments }));
    };

    return (
        <View style={{ width: DEVICE_WIDTH * 0.9, marginTop: 20 }}>
            <TextField
                tintColor={themeColors.primary}
                baseColor={themeColors.primary}
                labelTextStyle={{ color: themeColors.yellow }}
                label="Comments"
                onChangeText={handleChange}
            />
        </View>
    );
};

export default Comments;