import React from 'react';
import {View, Text, Image, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Settings} from '../Screens';
import {Icons} from '../Constants';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  const screenOptions = {
    headerShown: false,
  };
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="DrawerHome"
        component={Home}
        options={{
          tapbarIcon: () => {
            <Image source={Icons.home} resizeMode="contain"></Image>;
          },
        }}
      />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
