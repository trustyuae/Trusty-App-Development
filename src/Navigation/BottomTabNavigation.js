import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProfileIcon, HomeIcon, SearchIcon, BagIcon, HomeIconfilled, ProfileIconfilled, HeartIcon3x } from '../Constants/Icons';

import HomeCustomeNavigation from './HomeCustomeNavigation';
import LoginCustomeNavigation from './LoginCustomeNavigation';
import Profile from '../Screens/Profile/Profile';
import { getToken } from '../Utils/localstorage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CartScreen from '../Screens/Cart/CartScreen';
import SearchScreen from '../Screens/search/SearchScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import Shop from '../Screens/Shop/Shop';
import Wishlist from '../Screens/wishlist/wishlist';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = ({ navigation }) => {
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
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#101010' },
      })}>
      <Tab.Screen
        name="HomeCustomeNavigation"
        component={HomeCustomeNavigation}
        options={{
          tabBarIcon: ({ focused }) => (
            focused ?
              <Image
                source={HomeIconfilled}
                style={{ width: 25, height: 25 }}
                resizeMode="contain"
              /> : <Image
                source={HomeIcon}
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
              />

          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Shop}
        // component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            focused ?
              <Image
                source={SearchIcon}
                tintColor={"#866528"}
                style={{ width: 25, height: 25 }}
                resizeMode="contain"
              /> : <Image
                source={SearchIcon}
                tintColor={"#fff"}
                style={{ width: 30, height: 25 }}
                resizeMode="contain"
              />

          ),
          tabBarShowLabel: false,
          headerLeft: () => (
            <Icon
              name="arrow-back"
              size={25}
              color="#333"
              style={{ marginLeft: 1 }}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />

      <Tab.Screen
        name="wishlist"
        component={Wishlist}
        options={{
          tabBarIcon: ({ focused }) => (
            focused ?
              <Image
                source={HeartIcon3x}
                style={{ width: 20, height: 20 }}
                tintColor={"#866528"}
                resizeMode="contain"
              /> : <Image
                source={HeartIcon3x}
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
              />

          ),
          tabBarShowLabel: false,
        }}
      />

      {isLoggedIn ? (
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ focused }) => (
              focused ?
                <Image
                  source={ProfileIconfilled}
                  style={{ width: 20, height: 20 }}
                  resizeMode="contain"
                /> : <Image
                  source={ProfileIcon}
                  style={{ width: 20, height: 20 }}
                  resizeMode="contain"
                />

            ),
            tabBarShowLabel: false,
          }}
        />
      ) : (
        <Tab.Screen
          name="LoginCustomeNavigation"
          component={LoginCustomeNavigation}
          options={{
            tabBarIcon: ({ focused }) => (
              focused ?
                <Image
                  source={ProfileIconfilled}
                  style={{ width: 25, height: 25 }}
                  resizeMode="contain"
                /> : <Image
                  source={ProfileIcon}
                  style={{ width: 20, height: 20 }}
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
