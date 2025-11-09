import { StyleSheet, View } from "react-native";
import { Label, Value } from "@components/brick/text";
import { useAppSelector } from "@store/hook";
import { DEVICE_WIDTH, themeColors } from "@utils/constant";
import TollDetails from "@screens/Booking/Confirmation/components/TollDetails";

const PrintReviewExtraDetails = () => {
    const extraBookingDetails = useAppSelector((state) => state.booking.tollDetail);
    const { status, hasTolls, duration, distance, route, tolls } = extraBookingDetails || '';
    const isTollAvailable = (hasTolls) ? 'Yes' : 'No';
    const reviewData = [
        {
            label: 'Approximate Distance',
            value: distance
        },
        {
            label: 'Approximate Duration',
            value: duration
        },
        {
            label: 'This Route has Tolls?',
            value: isTollAvailable
        }
    ]

    return (
        <>
            <View style={styles.container}>
                <View style={styles.blocks}>
                    {
                        reviewData.map((obj, index) => {
                            return (
                                <View key={index + 1} style={[styles.items]}>
                                    <Label>{obj.label}</Label>
                                    <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                                        <Value>{obj.value}</Value>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
            <TollDetails tolls={tolls} />
        </>
    )

}


export default PrintReviewExtraDetails;

const styles = StyleSheet.create({
    container: {
        width: DEVICE_WIDTH,
        paddingHorizontal: DEVICE_WIDTH * 0.05,
        alignItems: "flex-start",
    },
    items: {
        paddingLeft: 10,
        flexDirection: "column",
        justifyContent: "flex-start",
        marginTop: 10,
    },
    blocks: {
        borderLeftWidth: 5,
        borderLeftColor: themeColors.yellow,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        marginBottom: 20,
        marginTop: 20,
    },
}); 