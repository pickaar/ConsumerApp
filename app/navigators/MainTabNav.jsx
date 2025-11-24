import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useCallback, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Dashboard from '@screens/Dashboard/Dashboard';
import { fonts } from '@utils/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SCREENS, themeColors } from '@utils/constant';
import PIcon, { PIcons } from '@components/brick/Icon';
import BookingStackNavStack from '@nav/BookingStackNavStack';
import ActiveBookingNavStack from '@nav/ActiveBookingNavStack';
import DirectBooking from '@screens/DirectBooking/DirectBooking';
import SettingNavStack from '@nav/SettingNavStack';

const TAB_LIST = [
  {
    route: SCREENS.DASHBOARD,
    label: 'Home',
    type: 'feather',
    activeIcon: 'home',
    inActiveIcon: 'home',
    component: BookingStackNavStack,
  },
  {
    route: SCREENS.ACTIVE_BOOKING,
    label: 'Active',
    type: 'feather',
    activeIcon: 'watch',
    inActiveIcon: 'watch',
    component: ActiveBookingNavStack
  },
  {
    route: SCREENS.DIRECT_BOOKING,
    label: 'Direct',
    type: 'feather',
    activeIcon: 'bold',
    inActiveIcon: 'bold',
    component: DirectBooking
  },
  {
    route: SCREENS.SETTINGS,
    label: 'Settings',
    type: 'feather',
    activeIcon: 'settings',
    inActiveIcon: 'settings',
    component: SettingNavStack
  },
];

const Tab = createBottomTabNavigator();

const TabButton = React.memo(({ accessibilityStates, ...props }) => {
  const { item, onPress } = props;

  const focused = accessibilityStates?.selected;

  const iconColor = focused ? themeColors.yellow : themeColors.gray;
  const labelColor = focused ? themeColors.white : themeColors.gray;
  const labelFont = focused ? fonts.RubikMedium : fonts.RubikLight;

  const viewRef = useRef(null);

  if (!item || !item.type || !item.activeIcon || !item.inActiveIcon) {
    console.warn('TabButton rendered with missing item props:', item);
    return null;
  }
  
  useEffect(() => {
    console.log('TabButton - Mounted' + item);
  }, [])

  useEffect(() => {
    if (viewRef.current) {
      if (!focused) {
        viewRef.current.animate({
          0: { scale: 1.4, rotate: '360deg' },
          1: { scale: 1, rotate: '0deg' },
        });
      } else {
        viewRef.current.animate({ scale: 1.4, rotate: '360deg' });
      }
    }
    console.log('TabButton - item.type:', item.type);
  }, [focused]);

  const handlePress = useCallback(() => {
    if (viewRef.current) {
      if (!focused) {
        viewRef.current.animate({
          0: { scale: 0.4, rotate: '0deg' },
          1: { scale: 1.4, rotate: '360deg' },
        });
      }
    }

    onPress();
  }, [onPress, focused]);
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={1}
      style={styles.buttonContainer}
    >
      <View style={styles.contentWrapper}>
        <Animatable.View
          ref={viewRef}
          duration={1000}
          style={styles.iconContainer}
        >
          <PIcon
            type={item.type}
            size={14}
            name={focused ? item.activeIcon : item.inActiveIcon}
            color={iconColor}
          />
        </Animatable.View>
        <View style={styles.labelContainer}>
          <Text
            style={[
              styles.tabTitle,
              { color: labelColor },
              { fontFamily: labelFont },
            ]}
          >
            {item.label}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default function MainTab() {
  const insets = useSafeAreaInsets();
  const TAB_BAR_HEIGHT = 50;
  const totalTabBarHeight = TAB_BAR_HEIGHT + insets.bottom;
  const tabBarStyle = {
    bottom: 0,
    margin: 0,
    height: totalTabBarHeight,
    position: 'absolute',
    backgroundColor: themeColors.primary,
    paddingBottom: insets.bottom,
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: tabBarStyle,
      }}
    >
      {TAB_LIST.map((item, index) => {
        // Destructure properties here to ensure they are available when the button is rendered
        const { route, component, label, type, activeIcon, inActiveIcon } = item;

        return (
          <Tab.Screen
            key={index}
            name={route}
            component={component}
            options={{
              headerShown: false,
              tabBarShowLabel: true,
              tabBarButton: props => (
                <TabButton
                  {...props}
                  item={item}
                  currentLabel={props.accessibilityState?.selected ? label : undefined}
                />
              ),
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#393737ff',
  },
  tabTitle: {
    fontSize: 12,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeColors.primary || '#000000',
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
  },
  tabTitle: {
    fontSize: 12,
  },
});
