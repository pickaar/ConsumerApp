import { useNavigation } from "@react-navigation/native";
import { View, TouchableOpacity, Image } from "react-native";
import { useAppSelector } from "@store/hook";

const OfferBanners = (props) => {
    const { promotionBanners } = useAppSelector((state) => state.offer);

    /**
     * @todo create standalone page and just load offer details using offerID
     * @param {*} offerID 
     */
    const gotoOfferbannerBooking = (offerID) => {
        // props.navigation.navigate('booking', { screen: 'StepOne' })
    }

    if (promotionBanners?.length === 0)
        return <></>

    return (
        <>
            {
                promotionBanners.map((item, index) => {
                    if (item.type == 'medium') {
                        return (
                            <TouchableOpacity key={index} onPress={gotoOfferbannerBooking(item.offerID)} >
                                <View  >
                                    {item.bannerImage && <Image
                                        style={{
                                            height: 130,
                                            width: '100%',
                                            borderRadius: 20
                                        }}
                                        source={{ uri: item.bannerImage }} />}
                                </View>
                            </TouchableOpacity >
                        )
                    }

                })
            }
        </>
    )


}
export { OfferBanners };