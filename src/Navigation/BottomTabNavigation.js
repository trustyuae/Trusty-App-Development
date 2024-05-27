import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Account, Cart, SignupPage, Watchlist} from '../Screens';
import Home from '../Screens/Home/Home';
import {
  ProfileIcon,
  HomeIcon,
  SearchIcon,
  BagIcon,
  MenuIcon,
} from '../Constants/Icons';

import CategoryProducts from '../Screens/CategoryProducts';
import Loginscreen from '../Screens/Login/Loginscreen';
import HomeCustomeNavigation from './HomeCustomeNavigation';
import LoginCustomeNavigation from './LoginCustomeNavigation';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {backgroundColor: '#101010', height: 50},
      })}>
      <Tab.Screen
        name="HomeCustomeNavigation"
        component={HomeCustomeNavigation}
        options={{
          tabBarIcon: () => (
            <Image
              source={HomeIcon}
              style={{width: 20, height: 20}}
              resizeMode="contain"
            />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Cart}
        options={{
          tabBarIcon: () => (
            <Image
              source={SearchIcon}
              style={{width: 15, height: 15}}
              resizeMode="contain"
            />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Menu"
        component={Watchlist}
        options={{
          tabBarIcon: () => (
            <Image
              source={MenuIcon}
              style={{width: 40, height: 20}}
              resizeMode="contain"
            />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Bag"
        component={Account}
        options={{
          tabBarIcon: () => (
            <Image
              source={BagIcon}
              style={{width: 15, height: 15}}
              resizeMode="contain"
            />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="LoginCustomeNavigation"
        component={LoginCustomeNavigation}
        options={{
          tabBarIcon: () => (
            <Image
              source={ProfileIcon}
              style={{width: 15, height: 15}}
              resizeMode="contain"
            />
          ),
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
