import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, BackHandler } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from 'lottie-react-native';
import { getData } from '@utils/helperfn';
import { pStyles } from "@utils/theme";
import PIcon, { PIcons } from "@components/brick/Icon";
import { localStorageKeys, SCREENS, STORAGE_KEY, USER_DATA_SLICE_INITIAL_STATE } from "@utils/constant";
import { storeData } from "@utils/helperfn";
import { useAppSelector } from "@store/hook";
import { useAppDispatch } from "../../store/store";
import { ModalComponent } from "../../components/Modal";
import { setConfig } from "@reducer/modalSlice";
import { API_CALL_STATUS } from "../../utils/constant";
import { setIsLoading, setUserNameAndEmail } from "../../store/reducer/userSlice";

const settingListConfig = [
    [
        { name: 'Your Locations', redirectTo: SCREENS.LOCATION_SETTINGS, icon: 'map-pin', type: "feather", iconbg: '#34C759' }, // Green
        { name: 'Your Rides', redirectTo: SCREENS.RIDES_SETTINGS, icon: 'zap', type: "feather", iconbg: '#007AFF' }, // Blue
    ],
    [
        { name: 'About Us', redirectTo: SCREENS.ABOUT_US, icon: 'info', type: "feather", iconbg: '#FF9500' }, // Orange
        { name: 'Privacy', redirectTo: SCREENS.PRIVACY, icon: 'lock', type: "feather", iconbg: '#FF2D55' }, // Red
        { name: 'Help', redirectTo: SCREENS.HELP, icon: 'help-circle', type: "feather", iconbg: '#5856D6' }, // Indigo
    ],
];

const UserProfile = () => {
    const avatarAnimate = useRef(null);
    const dispatch = useAppDispatch();
    const userData = useAppSelector(state => state.user.userData);
    useEffect(() => {
        if (avatarAnimate.current) {
            avatarAnimate.current.play(87, 147);
        }
    }, [])

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => dispatch(setConfig({ visible: true, modal: 'GET_NAME_EMAIL' }))} 
            style={styles.profileBlock}
        >
            <View style={styles.profileAvatarContainer}>
                <LottieView
                    ref={avatarAnimate}
                    loop={true}
                    style={styles.lottieAvatar}
                    source={require('../../../assets/lottie/cusavatar.json')}
                    autoPlay={true}
                />
            </View>
            <View style={styles.profileContentContainer}>
                <Text style={styles.profileName}>{userData.userName}</Text>
                <Text style={styles.profileDetail}>{userData.phoneNo}</Text>
                <Text style={styles.profileDetail}>{userData.emailId}</Text>
            </View>

            <View style={styles.profileArrowContainer}>
                <PIcon style={{ color: pStyles.gray }} type="fontAwesome" name="angle-right" size={18} />
            </View>
        </TouchableOpacity>
    );
}

const ListItem = ({ item, isLast, onPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onPress(item.redirectTo)}
            style={[styles.listItem, isLast ? styles.noBorder : styles.separator]}
        >
            <View style={{ ...styles.iconBlock, backgroundColor: item.iconbg }}>
                <PIcon style={{ color: '#fff' }} type={item.type} name={item.icon} size={13} />
            </View>

            <View style={styles.labelBlock}>
                <Text style={styles.labelText}>{item.name}</Text>
                <PIcon style={styles.arrowIcon} type="fontAwesome" name="angle-right" size={18} />
            </View>
        </TouchableOpacity>
    );
}

const SettingList = ({ navigation }) => {
    const navigateTo = (route) => {
        navigation.navigate(SCREENS.SETTINGS, { screen: route });
    }

    return (
        <View style={styles.listGroupsContainer}>
            {
                settingListConfig.map((group, groupIndex) => (
                    <View key={groupIndex} style={styles.groupBlock}>
                        {group.map((item, index, arr) => (
                            <ListItem
                                key={index}
                                item={item}
                                isLast={index === arr.length - 1}
                                onPress={navigateTo}
                            />
                        ))}
                    </View>
                ))
            }
        </View>
    );
}

// --- Main Settings Screen ---
export default function Settings({ navigation }) {
    const exitApp = () => BackHandler.exitApp();
    const dispatch = useAppDispatch();
    const userData = useAppSelector(state => state.user.userData);
    const updateUserLoader = useAppSelector(state => state.user.loadingStatus.updateUserLoader);
    const logout = () => {
        Alert.alert(
            "Confirmation",
            `Are you sure, do you want to logout from Pickaar?`,
            [
                {
                    text: "Cancel",
                    onPress: () => { return },
                    style: 'cancel' // iOS style for cancel button
                },
                {
                    text: "Logout", // Use a strong word like Logout
                    onPress: async () => {
                        console.log('Logging out user...');
                        const currentUserData = { ...USER_DATA_SLICE_INITIAL_STATE };
                        const updatedUserData = JSON.stringify(currentUserData);
                        await storeData(STORAGE_KEY, updatedUserData);
                        exitApp();
                    },
                    style: 'destructive' // iOS style for destructive action
                }
            ]
        );
    }

    useEffect(() => {
        const isProfileIncomplete = !userData.userName || !userData.emailId;
        if (isProfileIncomplete) {
            const config = { swipeDirection: 'down', animationType: 'slide', modalContent: {} };
            dispatch(setConfig({ visible: true, modal: 'GET_NAME_EMAIL', ...config }));
        }
    }, [userData.userName, userData.emailId, dispatch]);

    useEffect(() => {
        if (updateUserLoader === API_CALL_STATUS.SUCCESS) {
            Alert.alert('Profile Updated', 'Your profile has been successfully updated.');
            dispatch(setConfig({ visible: false, modal: '' }));
            dispatch(setIsLoading({updateUserLoader: API_CALL_STATUS.IDLE}));
        } else if (updateUserLoader === API_CALL_STATUS.REJECTED) {
            dispatch(setUserNameAndEmail({ userName: '', emailId: '' }));
            Alert.alert('Profile Update Failed', 'There was an error updating your profile. Please try again.');
            dispatch(setConfig({ visible: false, modal: '' }));
            dispatch(setIsLoading({updateUserLoader: API_CALL_STATUS.IDLE}));
        }
    }, [updateUserLoader, dispatch]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* 1. Large iOS Title */}
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>Settings</Text>
                </View>

                {/* Scrollable Content (since the list can grow) */}
                <View style={styles.contentArea}>

                    {/* 2. Profile Block */}
                    <UserProfile navigation={navigation} />

                    {/* 3. Grouped Settings List */}
                    <SettingList navigation={navigation} />

                    {/* 4. Logout Button (Standalone) */}
                    <TouchableOpacity
                        onPress={logout}
                        style={styles.logoutContainer}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>

                </View>
                <ModalComponent />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f2f2f7',
    },
    container: {
        flex: 1,
        backgroundColor: '#f2f2f7',
    },
    headerContainer: {
        height: 80,
        justifyContent: 'flex-end',
        paddingHorizontal: 15,
        paddingBottom: 10,
    },
    headerTitle: {
        fontSize: pStyles.fontSizeXXL + 5,
        fontFamily: pStyles.fontStyleB,
        color: 'black',
    },

    contentArea: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 10,
    },

    profileBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginBottom: 20,

        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#EFEFF4',
    },
    profileAvatarContainer: {
        width: 60,
        height: 60,
        marginRight: 15,
    },
    lottieAvatar: {
        width: '100%',
        height: '100%',
    },
    profileContentContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    profileName: {
        fontSize: 16,
        fontFamily: pStyles.fontStyleB,
        color: 'black',
    },
    profileDetail: {
        fontSize: 12,
        fontFamily: pStyles.fontStyleR,
        color: pStyles.gray || '#8E8E93',
    },
    profileArrowContainer: {
        paddingHorizontal: 10,
    },

    listGroupsContainer: {
        marginBottom: 20,
    },
    groupBlock: {
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
    },

    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 44,
        paddingRight: 10,
        backgroundColor: 'white',
    },
    iconBlock: {
        width: 28,
        height: 28,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 15,
    },
    labelBlock: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
    },
    labelText: {
        fontSize: 16,
        fontFamily: pStyles.fontStyleR,
        color: 'black',
    },
    arrowIcon: {
        color: pStyles.gray || '#8E8E93',
        paddingRight: 5,
    },

    separator: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#C6C6C8', // Subtle separator color
    },
    noBorder: {
        borderBottomWidth: 0,
    },

    logoutContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    logoutText: {
        fontSize: 16,
        fontFamily: pStyles.fontStyleR,
        color: 'red',
    }
});