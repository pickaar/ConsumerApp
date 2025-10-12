import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PIcon, { PIconSet} from '../components/brick/PIcon'
import * as Animatable from 'react-native-animatable';
// import AcitveScreen from '../screens/ActiveBooking/StepOne/active';
import Dashboard from '../screens/Dashboard/Dashboard';
// import Settings from '../screens/settings/settings';
import {themeColors} from '../utils/constant';
// import Trips from '../screens/Trips';
// import DirectBooking from '../screens/DirectBooking/DirectBooking';
import {fonts} from '../utils/theme';
// import SettingScreenNav from './settingsNav';

const TabArr = [
  {
    route: 'home',
    label: 'Home',
    type: PIconSet.Feather,
    activeIcon: 'home',
    inActiveIcon: 'home',
    component: Dashboard,
  },
  // { route: 'Active', label: 'Active', type: PIcons.Feather, activeIcon: 'watch', inActiveIcon: 'watch', component: AcitveScreen },
  // { route: 'Direct', label: 'Direct', type: PIcons.Feather, activeIcon: 'bold', inActiveIcon: 'bold', component: DirectBooking },
  // { route: 'Settings', label: 'Settings', type: PIcons.Feather, activeIcon: 'settings', inActiveIcon: 'settings', component: SettingScreenNav },
];

const Tab = createBottomTabNavigator();

const TabButton = props => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState?.selected;
  const viewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      // viewRef.current.style({color:'red'})
      viewRef.current.animate({
        0: {scale: 0.4, rotate: '0deg'},
        1: {scale: 1.4, rotate: '360deg'},
      });
    } else {
      viewRef.current.animate({
        0: {scale: 1.4, rotate: '360deg'},
        1: {scale: 1, rotate: '0deg'},
      });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container]}
    >
      <View style={[styles.container, {padding: 6}]}>
        <Animatable.View
          ref={viewRef}
          duration={1000}
          style={[styles.container, {alignItems: 'flex-end'}]}
        >
          <PIcon
            type={item.type}
            size={14}
            name={focused ? item.activeIcon : item.inActiveIcon}
            color={focused ? themeColors.yellow : themeColors.gray}
          />
        </Animatable.View>
        <View
          style={[styles.container, {alignItems: 'flex-end', paddingTop: 0}]}
        >
          <Text
            style={[
              styles.tabTitle,
              focused ? {color: themeColors.white} : {color: themeColors.gray},
              focused
                ? {fontFamily: fonts.RubikMedium}
                : {fontFamily: fonts.RubikLight},
            ]}
          >
            {item.label}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          bottom: 0,
          margin: 0,
          height: 55,
          position: 'absolute',
        },
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: true,
              tabBarButton: props => <TabButton {...props} item={item} />,
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
    backgroundColor: '#000',
  },
  tabTitle: {
    fontSize: 12,
  },
});
