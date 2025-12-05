import React, { useEffect, memo, useRef } from 'react';
import { Text, StyleSheet, View, ScrollView, Image, Animated, Easing, StatusBar } from "react-native";
import { themeColors, DEVICE_WIDTH } from '@utils/constant';
import { fonts, pStyles } from '@utils/theme';
import StarRating from 'react-native-star-rating-widget';
import { useAppDispatch } from '@store/store';
import { setQuoteParam } from '@reducer/quoteSlice';
import { getFeedbackList, getVendorDetails } from '@thunk/feebackThunk';
import { useAppSelector } from '@store/hook';
import { TitleWithBackBtn } from '../../../components/brick/text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_CALL_STATUS } from '../../../utils/constant';
import { fetchFeedback } from '../../../store/thunk/feebackThunk';

const TextSkeleton = ({ width, height = 9, style, label }) => {
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 0.3,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    }, [opacityAnim]);

    const animatedStyle = {
        width: width,
        height: height,
        borderRadius: 4, 
        backgroundColor: '#e0e0e0', 
        opacity: opacityAnim,
    };

    return (
        <View style={[styles.skeletonWrapper, style, { flexDirection: label ? 'row' : 'column', alignItems: 'center', gap: 6 }]}>
            {label && <Text>{label}</Text>}
            <Animated.View style={animatedStyle} />
        </View>
    );
};


const USER_INFO_LABELS = [
    { key: 'exp', label: 'Exp. :' },
    { key: 'language', label: 'Language :' },
    { key: 'completedTrip', label: 'Completed Trip :' },
    { key: 'badgesScored', label: 'Badges Scored :' }
];

const StarRate = memo(({ rating, size, styleWidth }) => (
    <StarRating
        rating={rating}
        onChange={() => { }}
        maxStars={5}
        color={pStyles.yellow}
        emptyColor={pStyles.gray}
        enableHalfStar={false}
        enableSwiping={false}
        starSize={size}
        starStyle={{ width: styleWidth }}
    />
));

const ScoredBadges = memo(({ scoredBadgesWithTotal }) => (
    scoredBadgesWithTotal.map((item, index) => (
        <View key={index} style={styles.badgeBox}>
            <Text style={styles.badgeText}>{item}</Text>
        </View>
    ))
));

const Hr = memo(() => <View style={styles.hr} />);

const UserInfoBlock = memo(({ userInfo, loader }) => (
    <>
        <View style={[styles.blockContainer, { marginTop: 20 }]}>
            <View style={styles.profileImgContainer}>
                <Image style={styles.driverAvatar} source={require('../../../../assets/driver_avatar.png')} />
            </View>
            <View style={styles.driverContentContainer}>
                {loader=== API_CALL_STATUS.PENDING ? <TextSkeleton width="80%" height={16} style={{ marginBottom: 0 }} /> : <Text style={styles.driverName}>{userInfo.name}</Text>}
                {

                    loader === API_CALL_STATUS.PENDING ?
                        Array(4).fill().map((_, index) => (
                            <View key={index} style={styles.userInfoRow}>
                                <TextSkeleton width="40%" height={13} style={{ marginBottom: 0 }} label={USER_INFO_LABELS[index].label} />

                            </View>
                        ))
                        :
                        USER_INFO_LABELS?.map(({ key, label }) => (
                            <View key={key} style={styles.userInfoRow}>
                                <Text style={styles.userInfoLabel}>{label} </Text>
                                <Text style={styles.userInfoValue} numberOfLines={1}>{userInfo[key]}</Text>
                            </View>
                        ))

                }
            </View>
        </View>
        <View style={[styles.blockContainer, styles.aboutUsContainer]}>
            <Text style={styles.aboutUsTitle}>About Us</Text>
            {loader ? (<TextSkeleton width="80%" height={20} style={{ marginBottom: 8 }} />) : (
                <Text style={styles.aboutUsContent}>{userInfo.aboutMe}</Text>
            )}
        </View>
    </>
));

const RatingAndReviewBlock = memo(({ ratings }) => (
    <View style={[styles.blockContainer, styles.ratingBlockContainer]}>
        <View style={styles.ratingLeftSection}>
            <Text style={styles.ratingTitle}>Ratings and reviews</Text>
            <View style={styles.ratingSummary}>
                <Text style={styles.ratingValue}>{ratings.rating}</Text>
                <Text style={styles.ratingTripCount}>In {ratings.completedTrip} trips</Text>
                <View style={{ paddingTop: 5 }}>
                    <StarRate rating={ratings.rating} size={25} styleWidth={15} />
                </View>
            </View>
        </View>
        <View style={styles.ratingRightSection}>
            {(ratings.ratingForEach || []).map((value, index) => (
                <View key={index} style={styles.ratingBarRow}>
                    <Text style={styles.ratingBarLabel}>{5 - index}</Text>
                    <View style={styles.ratingBarBackground}>
                        <View style={[styles.ratingBarForeground, { width: `${value}%` }]} />
                    </View>
                </View>
            ))}
        </View>
    </View>
));

const ScoredBadgesBlock = memo(({ scoredBadgesWithTotal }) => (
    <View style={[styles.blockContainer, styles.scoredBadgesBlock]}>
        <Text style={styles.scoredBadgesTitle}>Scored Badges</Text>
        <View style={styles.scoredBadgesContainer}>
            <ScoredBadges scoredBadgesWithTotal={scoredBadgesWithTotal} />
        </View>
    </View>
));

const FeedbackItem = memo(({ item }) => (
    <View style={[styles.blockContainer, styles.feedbackItemContainer]}>
        <View style={styles.feedbackItemHeader}>
            <View style={styles.reviewerInfo}>
                <Image style={styles.reviewerAvatar} source={require('../../../../assets/customer_avatar.png')} />
                <Text style={styles.reviewerName}>{item.reviewerName}</Text>
            </View>
            <View style={styles.feedbackRating}>
                <Text style={styles.feedbackStarText}>{item.starRating}</Text>
                <StarRate rating={item.starRating} size={15} styleWidth={5} />
            </View>
        </View>
        <View style={styles.commentContainer}>
            <Text style={styles.commentText}>{item.comments}</Text>
        </View>
        <View style={styles.feedbackBadgeContainer}>
            <ScoredBadges scoredBadgesWithTotal={item.scoredBadges} />
        </View>
    </View>
));

const FeedbackComponent = memo(({ feedbackList, loader }) => (
    <>
        <View style={styles.feedbackHeader}>
            <Text style={styles.feedbackTitle}>Feedbacks {loader===API_CALL_STATUS.PENDING && <Text style={{ color: 'black' }}>Loading...</Text>}</Text>
        </View>

        {loader === API_CALL_STATUS.SUCCESS && (
            feedbackList?.length === 0 ? (
                <Text style={styles.noFeedbackText}>No feedback available</Text>
            ) : (
                feedbackList?.map((item) => <FeedbackItem key={item.id} item={item} />)
            ))}
    </>
));

export default function Feedback({ navigation, route }) {
    const dispatch = useAppDispatch();
    const vendorId = route.params?.vendorId;
    const { userInfo, ratings, scoredBadgesWithTotal, feedbackList } = useAppSelector((state) => state.feedback);
    const feedbackLoader = useAppSelector((state) => state.feedback.feedbackLoader);
    // console.log("Feedback Screen - vendorId:", vendorId);
    useEffect(() => {
        // dispatch(setQuoteParam({ key: 'detailScreenRedirectTo', value: '' }));
        dispatch(fetchFeedback({ vendorId}));
    }, [dispatch]);

    return (
        <>
            <StatusBar  barStyle="dark-content" />
            <SafeAreaView style={styles.safeAreaContainer}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.container}>
                        <TitleWithBackBtn name="Feedback"  />

                        <UserInfoBlock userInfo={userInfo} loader={feedbackLoader} />
                        <Hr />
                        <RatingAndReviewBlock ratings={ratings} />
                        <ScoredBadgesBlock scoredBadgesWithTotal={scoredBadgesWithTotal} />
                        <Hr />
                        <FeedbackComponent feedbackList={feedbackList} loader={feedbackLoader} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: themeColors.lightGray2,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 20,
    },
    blockContainer: {
        width: DEVICE_WIDTH * 0.9,
        backgroundColor: themeColors.white,
        borderRadius: 10,
        marginBottom: 10,
        padding: 15,
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    hr: {
        height: StyleSheet.hairlineWidth,
        width: DEVICE_WIDTH * 0.9,
        backgroundColor: pStyles.gray,
        marginVertical: 5,
    },
    // UserInfoBlock
    profileImgContainer: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    driverAvatar: { width: 60, height: 60 },
    driverContentContainer: {
        flex: 0.7,
        justifyContent: 'center',
        paddingLeft: 15,
    },
    driverName: { fontFamily: pStyles.fontStyleM, fontSize: 14, color: pStyles.primary },
    userInfoRow: { flexDirection: 'row', paddingTop: 3 },
    userInfoLabel: { fontFamily: pStyles.fontStyleR, fontSize: 12, color: pStyles.gray },
    userInfoValue: { fontFamily: pStyles.fontStyleR, fontSize: 12, color: pStyles.lightBlack, flex: 1 },
    aboutUsContainer: { flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-evenly' },
    aboutUsTitle: { fontFamily: pStyles.fontStyleB, fontSize: 17, color: pStyles.lightBlack },
    aboutUsContent: { fontFamily: pStyles.fontStyleM, fontSize: 11, color: pStyles.lightBlack, paddingTop: 5 },
    // RatingAndReviewBlock
    ratingBlockContainer: { flexDirection: 'row', paddingVertical: 20, borderBottomColor: pStyles.gray, borderBottomWidth: StyleSheet.hairlineWidth },
    ratingLeftSection: { width: '50%', alignItems: 'center' },
    ratingTitle: { fontFamily: pStyles.fontStyleM, fontSize: 14, marginBottom: 15 },
    ratingSummary: { alignItems: 'center' },
    ratingValue: { fontFamily: pStyles.fontStyleB, color: pStyles.lightBlack, fontSize: 25 },
    ratingTripCount: { fontFamily: pStyles.fontStyleR, color: pStyles.lightBlack, fontSize: 11 },
    ratingRightSection: { width: '50%', justifyContent: 'center' },
    ratingBarRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 2 },
    ratingBarLabel: { fontFamily: pStyles.fontStyleL, fontSize: 11, width: 15 },
    ratingBarBackground: { marginHorizontal: 5, borderRadius: 5, width: 100, height: 12, backgroundColor: pStyles.lightGray },
    ratingBarForeground: { height: 12, borderRadius: 5, backgroundColor: pStyles.yellow },
    // ScoredBadgesBlock
    scoredBadgesBlock: { flexDirection: 'column', alignItems: 'flex-start', padding: 20 },
    scoredBadgesTitle: { fontFamily: pStyles.fontStyleM, fontSize: 14, marginBottom: 10 },
    scoredBadgesContainer: { flexDirection: 'row', flexWrap: 'wrap' },
    badgeBox: {
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themeColors.lightGray,
        paddingHorizontal: 4,
        margin: 3,
        borderRadius: 5,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: themeColors.lightBlack,
    },
    badgeText: { fontFamily: pStyles.fontStyleM, color: pStyles.lightBlack, fontSize: 10 },
    // FeedbackComponent
    feedbackHeader: { width: '90%', paddingVertical: 10 },
    feedbackTitle: { fontFamily: fonts.RubikBold, fontSize: 18, color: themeColors.lightBlack },
    feedbackItemContainer: { padding: 10, flexDirection: 'column' },
    feedbackItemHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    reviewerInfo: { flexDirection: 'row', alignItems: 'center' },
    reviewerAvatar: { height: 25, width: 25, borderRadius: 12.5 },
    reviewerName: { paddingLeft: 5, fontFamily: fonts.RubikMedium, fontSize: 12 },
    feedbackRating: { flexDirection: 'row', alignItems: 'center' },
    feedbackStarText: { fontFamily: fonts.RubikMedium, fontSize: 10, marginRight: 2 },
    commentContainer: { paddingTop: 10, paddingBottom: 10 },
    commentText: { fontFamily: fonts.RubikRegular, fontSize: 12 },
    feedbackBadgeContainer: { flexDirection: 'row', flexWrap: 'wrap', paddingTop: 5 },
    skeletonWrapper: {
        marginVertical: 4, // Add vertical spacing similar to a line of text
        overflow: 'hidden', // To contain the animation if we use a different style later
    },
});
