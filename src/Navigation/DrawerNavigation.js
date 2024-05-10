import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Home, Settings} from '../Screens';
import BottomTabNavigation from './BottomTabNavigation';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const screenOptions = {
    headerShown: false,
  };
  return (
    <Drawer.Navigator screenOptions={screenOptions}>
      <Drawer.Screen name="Home" component={BottomTabNavigation} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
