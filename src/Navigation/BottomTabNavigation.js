import React from 'react';
import {View, Text, Image, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Settings, Watchlist, Cart, Account} from '../Screens';
import {Icons} from '../Constants';
import {globalColors} from '../Assets/Theme/globalColors';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  const screenOptions = {
    headerShown: false,
    tabBarStyle: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      elevation: 0,
      backgroundColor: globalColors.white,
    },
  };
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tapbarIcon: () => {
            <Image source={Icons.home} resizeMode="contain"></Image>;
          },
        }}
      />
      {/* <Tab.Screen name="Settings" component={Settings} /> */}
      <Tab.Screen name="Watchlist" component={Watchlist} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
