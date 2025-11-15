import { useState, useRef } from 'react';
import VendorCard from '@components/rooms/vendorCards/VendorCard';
import Carousel from 'react-native-reanimated-carousel';
import { DEVICE_WIDTH } from '@utils/constant';
import { Dimensions, Text, View } from 'react-native';
const windowWidth = Dimensions.get('window').width;

export default function RecommendedCard({ quotes }) {
    const carouselRef = useRef('')
    // const carouselWidth = Math.round(windowWidth);
    const itemWidth = Math.round(100);
    // const [orderItems, setOrderItems] = useState(quotes);
    const recommendedQuotes = quotes;
    // console.log("recommendedQuotes", recommendedQuotes);
    const gotoBookingDetail = (item) => {
        // navigation.push('OrderDetail', {
        //     selectedItem: item
        // })
    }

    return (
        <View style={{ width: windowWidth, alignItems: 'center', justifyContent: 'center' }}>
            <Carousel
                ref={carouselRef}
                data={recommendedQuotes}
                layout="parallax"
                width={windowWidth} 
                accessible={true}
                defaultIndex={1}
                renderItem={({ item, index }) => (
                    <VendorCard 
                        item={item} 
                        // from={'ActiveBooking'} 
                        cardWidth={Math.round(windowWidth*0.8)} // <-- Ensure this prop also uses an integer
                        // gotoBookingDetail={gotoBookingDetail} 
                    />
                )}
                loop={true}
                autoPlay={false}
                height={200}
                modeConfig={{
                    snapDirection: 'left',
                    // stackInterval: 18, // Can remove this if layout='parallax'
                }}
                onProgressChange={(currentIndex, absoluteIndex) => { }}
            />
        </View>
    );
}


// const styles = StyleSheet.create({
//     headerContainer: {
//         flex: 0.5,
//         width: DEVICE_WIDTH,
//         backgroundColor: themeColors.yellow,
//     },
//     contentContainer: {
//         flex: 2.5,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     item: {
//         height: 150,
//         overflow: 'hidden',
//         width: DEVICE_WIDTH * 0.9,
//         backgroundColor: themeColors.white,
//         borderLeftWidth: 10,
//         borderRadius: 10,
//         marginTop: 20,
//         alignSelf: "center",
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 3,
//         },
//         shadowOpacity: 0.27,
//         shadowRadius: 4.65,
//         elevation: 6,
//     }
// })