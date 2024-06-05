import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Profile from '../Screens/Profile/Profile.js';
import Points from '../Screens/Profile/Points';
import Order from '../Screens/Profile/Order';
import Gifts from '../Screens/Profile/Gifts';
import CustomTabBar from '../Components/CustomeTabBar/CustomeTabBar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const ProfileNavigations = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Order" component={Order} />
      <Tab.Screen name="Points" component={Points} />
      <Tab.Screen name="Gifts" component={Gifts} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: wp('15%'),
    alignContent: 'center',
  },
});
export default ProfileNavigations;
