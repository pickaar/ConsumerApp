import React, { useState } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Label, Value } from "@components/brick/text";
import { useAppSelector } from "@store/hook";
import { format, parse } from "date-fns";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { setBookingParam } from "@store/reducer/bookingSlice";
import { useAppDispatch } from "@store/store";

const styles = StyleSheet.create({
    container: { marginTop: 20 },
    row: { flexDirection: "row" },
    dateButton: {
        borderWidth: StyleSheet.hairlineWidth,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
});

const ReturnDatePicker = () => {
    const dispatch = useAppDispatch();
    const returnDateString = useAppSelector((state) => state.booking.returnDate);

    const parsedDate = returnDateString
        ? parse(returnDateString, "dd/MM/yyyy", new Date())
        : new Date();

    const formattedReturnDate = format(parsedDate, "dd/MM/yyyy");

    const [isReturnDateVisible, setDatePickerVisibility] = useState(false);

    const showReturnDatePicker = () => setDatePickerVisibility(true);
    const hideReturnDatePicker = () => setDatePickerVisibility(false);

    const handleDateConfirm = (dateObj) => {
        dispatch(
            setBookingParam({ key: "returnDate", value: format(dateObj, "dd/MM/yyyy") })
        );
        hideReturnDatePicker();
    };

    return (
        <View style={styles.container}>
            <Label>Select Return Date</Label>
            <View style={styles.row}>
                <TouchableOpacity
                    onPress={showReturnDatePicker}
                    style={styles.dateButton}
                    activeOpacity={0.7}
                >
                    <Value>{formattedReturnDate}</Value>
                </TouchableOpacity>
            </View>
            <DateTimePickerModal
                isVisible={isReturnDateVisible}
                mode="date"
                textColor="black"
                onConfirm={handleDateConfirm}
                onCancel={hideReturnDatePicker}
            />
        </View>
    );
};

export default ReturnDatePicker;
