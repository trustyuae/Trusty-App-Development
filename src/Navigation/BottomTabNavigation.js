import React, {useEffect, useState} from 'react';
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
import Profile from '../Screens/Profile/Profile';
import {getToken} from '../Utils/localstorage';
import ProfileNavigations from './ProfileNavigations';
import {useFocusEffect} from '@react-navigation/native';
import CartScreen from '../Screens/Cart/CartScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useFocusEffect(() => {
    const checkLoginStatus = async () => {
      const token = await getToken();
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  });

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {backgroundColor: '#101010'},
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
        component={Search}
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
        component={CartScreen}
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

      {isLoggedIn ? (
        <Tab.Screen
          name="Profile"
          component={ProfileNavigations}
          options={{
            headerTransparent: true,
            title: null,
            headerStyle: {
              backgroundColor: '#f6f1eb',
            },
            tabBarIcon: () => (
              <Image
                source={ProfileIcon}
                style={{width: 15, height: 15}}
                resizeMode="contain"
              />
            ),
            tabBarShowLabel: false,
            headerBackTitleVisible: false,
            headerLeft: () => (
              <Icon
                name="arrow-back"
                size={25}
                color="#333" // Customize the color as needed
                style={{marginLeft: -8}}
                onPress={() => navigation.goBack()}
              />
            ),
          }}
        />
      ) : (
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
      )}
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
