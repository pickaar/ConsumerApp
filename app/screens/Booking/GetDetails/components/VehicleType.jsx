import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Label } from "@components/brick/text";
import { DEVICE_WIDTH } from "@utils/constant";
import { setBookingParam } from "@store/reducer/bookingSlice";
import { fonts } from "@utils/theme";
import { useAppDispatch } from "@store/store";
import { useAppSelector } from "@store/hook";
import { themeColors } from "@utils/constant";

// Map vehicle types to images
const vehicleImages = {
    HATCHBACK: require("@assets/cars/hatchback.png"),
    // SEDAN: require("@assets/sedan.png"),
    // SEDAN: require("@assets/suv.png"),
    // MUV: require("@assets/muv.png"),
    // AUTO: require("@assets/auto.png"),
};

const vehicleTypes = [
    { type: "HATCHBACK", seatters: 5 },
    { type: "SEDAN", seatters: 5 },
    { type: "SUV", seatters: 6 },
    { type: "MUV", seatters: 8 },
    { type: "AUTO", seatters: 3 }
];

const VehicleType = () => {
    const dispatch = useAppDispatch();
    const vehicleType = useAppSelector((state) => state.booking.vehicleType);
    const seaters = useAppSelector((state) => state.booking.seaters);

    return (
        <View style={{ flexDirection: "column", justifyContent: "flex-start", marginTop: 20 }}>
            <Label>Select Vehicle Type</Label>
            <View style={{ flexDirection: "row", justifyContent: "flex-start", width: DEVICE_WIDTH, flexWrap: "wrap" }}>
                {vehicleTypes.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {
                            dispatch(setBookingParam({ key: "vehicleType", value: item.type }));
                            dispatch(setBookingParam({ key: "seaters", value: item.seatters }));
                        }}
                        style={[
                            vehicleType === item.type ? styles.vehicleTypeActive : styles.vehicleTypeInactive,
                            styles.vehicleContainer
                        ]}
                    >
                        <Image
                            source={vehicleImages[item.type]}
                            style={styles.vehicleImage}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                ))}
            </View>
            <View style={{ marginLeft: 5 }}>
                <Text style={{ fontSize: 13, fontFamily: fonts.RubikMediumItalic }} >Seaters: {seaters}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    vehicleContainer: {
        justifyContent: "flex-end",
        paddingBottom: 8,
        alignItems: "center",
        height: 70,
        margin: 5,
        borderRadius: 10,
        width: DEVICE_WIDTH * 0.15
    },
    vehicleTypeActive: {
        borderColor: themeColors.yellow,
        borderWidth: 2
    },
    vehicleTypeInactive: {
        borderColor: themeColors.primary,
        borderWidth: StyleSheet.hairlineWidth
    },
    vehicleImage: {
        width: 100,
        height: 70,
        paddingTop: 30,
        marginBottom: 0,
      
        // resizeMode: "contain",
    }
});

export default VehicleType;