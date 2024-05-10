import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigation from './BottomTabNavigation';
import DrawerNavigation from './DrawerNavigation';
import SplashScreen from '../Components/SplashScreen/SplashScreen';

const Stack = createNativeStackNavigator();
const AppNavigations = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="splash"
        screenOptions={{headerShown: false}}
        
        >
        <Stack.Screen name="splash" component={SplashScreen} />
        <Stack.Screen name="Main" component={DrawerNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigations;
