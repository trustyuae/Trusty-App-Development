import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Home, Settings, SignupPage} from '../Screens';
import BottomTabNavigation from './BottomTabNavigation';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const screenOptions = {
    headerShown: false,
  };
  return (
    <Drawer.Navigator screenOptions={screenOptions}>
      <Drawer.Screen name="HomeScreen" component={BottomTabNavigation} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Signup" component={SignupPage} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
