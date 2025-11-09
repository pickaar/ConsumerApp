import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useCallback, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Dashboard from '@screens/Dashboard/Dashboard';
import { fonts } from '@utils/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { themeColors } from '../utils/constant';
import PIcon, { PIcons } from '../components/brick/Icon';
import { PIconSet } from '../components/brick/PIcon';

const DummyComponent = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Dummy Component</Text>
  </View>
);
const DummyComponenttwo = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Dummy Component two</Text>
  </View>
);
const DummyComponentthree = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Dummy Component three</Text>
  </View>
);

const TAB_LIST = [
  {
    route: 'home',
    label: 'Home',
    type: PIconSet.Feather,
    activeIcon: 'home',
    inActiveIcon: 'home',
    component: Dashboard,
  },
  { route: 'Active', label: 'Active', type: PIcons.Feather, activeIcon: 'watch', inActiveIcon: 'watch', component: DummyComponenttwo },
  { route: 'Direct', label: 'Direct', type: PIcons.Feather, activeIcon: 'bold', inActiveIcon: 'bold', component: DummyComponent },
  { route: 'Settings', label: 'Settings', type: PIcons.Feather, activeIcon: 'settings', inActiveIcon: 'settings', component: DummyComponentthree },
];

const Tab = createBottomTabNavigator();

const TabButton = React.memo(({ accessibilityStates, ...props }) => {
  const { item, onPress } = props;

  const focused = accessibilityStates?.selected;

  const iconColor = focused ? themeColors.yellow : themeColors.gray;
  const labelColor = focused ? themeColors.white : themeColors.gray;
  const labelFont = focused ? fonts.RubikMedium : fonts.RubikLight;

  const viewRef = useRef(null);

  
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
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: true,
              tabBarButton: props => (
                <TabButton
                  {...props}
                  item={item}
                  currentLabel={props.accessibilityState?.selected ? item.label : undefined}
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
