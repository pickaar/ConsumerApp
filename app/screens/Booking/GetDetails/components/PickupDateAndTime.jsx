import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Label, Value } from "@components/brick/text";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format, parse } from "date-fns";
import { setBookingParam } from "@store/reducer/bookingSlice";
import { useAppDispatch } from "@store/store";
import { useAppSelector } from "@store/hook";

const PickupDateAndTime = () => {
    const dispatch = useAppDispatch();
    const dateObj = useAppSelector((state) => state.booking.pickUpDate);
    const timeObj = useAppSelector((state) => state.booking.pickUpTime);

    const parsedDate = dateObj ? parse(dateObj, "dd/MM/yyyy", new Date()) : new Date();
    const formattedDate = format(parsedDate, "dd/MM/yyyy");

    const parsedTime = timeObj ? parse(timeObj, "hh:mm:ss", new Date()) : new Date();
    const formattedTime = format(parsedTime, "hh:mm:ss");

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const handleDateConfirm = (date) => {
        dispatch(setBookingParam({ key: "pickUpDate", value: format(date, "dd/MM/yyyy") }));
        setDatePickerVisibility(false);
    };

    const handleTimeConfirm = (time) => {
        dispatch(setBookingParam({ key: "pickUpTime", value: format(new Date(time), "hh:mm:ss") }));
        setTimePickerVisibility(false);
    };

    return (
        <View style={styles.container}>
            <Label>Select Pickup Date & Time</Label>
            <View style={styles.row}>
                <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={styles.button}>
                    <Value>{formattedDate}</Value>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTimePickerVisibility(true)} style={[styles.button, styles.timeButton]}>
                    <Value>{formattedTime}</Value>
                </TouchableOpacity>
            </View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                textColor="black"
                onConfirm={handleDateConfirm}
                onCancel={() => setDatePickerVisibility(false)}
                minimumDate={new Date()}
            />
            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                textColor="black"
                onConfirm={handleTimeConfirm}
                onCancel={() => setTimePickerVisibility(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    row: {
        flexDirection: "row",
    },
    button: {
        borderWidth: StyleSheet.hairlineWidth,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    timeButton: {
        marginLeft: 5,
    },
});

export default PickupDateAndTime;