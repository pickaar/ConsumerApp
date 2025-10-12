import { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar, Text } from "react-native";
// import { LineWithTxt } from '../../components/brick/hr';
// import PIcon, { PIconSet } from '../../components/brick/PIcon';
// import DashboardHeader from './components/dashboardHeader';
import { localStorageKeys, themeColors } from '../../utils/constant';
import { fonts } from '../../utils/theme';
// import CALL_SAGA from '../../store/sagas/types/types';
// import { useDispatch, useSelector } from 'react-redux';
// import { OfferBanners } from '../../components/rooms/offerBanners';
// import { getData, storeData } from '../../utils/helpersFn';
// import { ModalComponent } from '../../components/brick/modal';

// const BookNow = (props) => {

//     const gotoBookNow = () => {
//         props.navigation.navigate('booking', { screen: 'StepOne' })
//     }

//     return (
//         <View style={styles.titleBlock}>
//             <View style={{ width: '85%' }}>
//                 <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
//                     <View>
//                         <Text style={[styles.mainTitle, { color: themeColors.primary }]}>Book confortable     </Text>
//                     </View>
//                     <View>
//                         <Text style={[styles.mainTitle, { color: themeColors.yellow }]}>rides in affordable price  </Text>
//                     </View>
//                 </View>
//             </View>
//             <View style={{ width: '15%', flexDirection: 'row', justifyContent: 'flex-end' }}>
//                 <TouchableOpacity onPress={gotoBookNow}>
//                     <PIcon type={PIconSet.Feather} gradient={false} color={themeColors.primary} name="arrow-right" size={45}></PIcon>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     )
// }

export default function Dashboard(props) {
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     const dashboardOnLoad = async () => {
    //         dispatch({
    //             type: CALL_SAGA.REQUEST_DASHBOARD_ON_LOAD,
    //             serviceId: 103,
    //             serviceName: 'DashboardOnLoad',
    //             deviceID: '2354234-2345-2345-234'
    //         })
    //     }
    //     dashboardOnLoad();
    // }, [dispatch])

    return (
        <View style={styles.container}>
            {/* <StatusBar backgroundColor={themeColors.white} barStyle="dark-content" />
            <View style={{ height: 40 }}>
                <DashboardHeader />
            </View>

            {/* TITLE NAVIGATE TO BOOKING PAGE */}
            {/* <BookNow navigation={props.navigation} /> */}


            {/* <OfferBanners navigation={props.navigation} /> */}
            {/* <Line /> */}

            {/* <LineWithTxt txt={'Tours'} /> */}

            {/* <ModalComponent /> */} 
            <View>
                       <Text >SDash</Text>
                   </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    titleBlock: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        paddingVertical: 30
    },
    mainTitle: {
        fontSize: 23,
        fontFamily: fonts.RubikBold
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    }
})
