import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '../Screens';
import Productdetailscreen from '../Screens/Productdetail/Productdetailscreen';

import CategoryProducts from '../Screens/CategoryProducts';
const Stack = createNativeStackNavigator();

const HomeCustomeNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name={'DrawerHome'}
        component={Home}
      />

      <Stack.Screen
        name="ProductDetail"
        component={Productdetailscreen}
        options={{
          headerTransparent: true,
          title: null,
          headerStyle: {
            backgroundColor: '#f6f1eb',
          },
        }}
      />
      <Stack.Screen
        name="CategoryProducts"
        component={CategoryProducts}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeCustomeNavigation;
