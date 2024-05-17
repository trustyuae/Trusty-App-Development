import React from 'react';
import {View, Text, Image, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
<<<<<<< Updated upstream
import {Home, Settings, Watchlist, Cart, Account} from '../Screens';
import {Icons} from '../Constants';
import {globalColors} from '../Assets/Theme/globalColors';
=======
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
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
          tapbarIcon: () => {
            <Image source={Icons.home} resizeMode="contain"></Image>;
          },
=======
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
        name="Login"
        component={Loginscreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={ProfileIcon}
              style={{width: 15, height: 15}}
              resizeMode="contain"
            />
          ),
          tabBarShowLabel: false,
>>>>>>> Stashed changes
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
