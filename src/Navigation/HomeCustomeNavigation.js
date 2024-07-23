import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '../Screens';
import Productdetailscreen from '../Screens/Productdetail/Productdetailscreen';
import Icon from 'react-native-vector-icons/Ionicons'; // Assuming you're using Ionicons for the back button icon

import CategoryProducts from '../Screens/CategoryProducts';
import {useNavigation} from '@react-navigation/native';
import WishListCard from '../Components/wishListCard/wishListCard';
import Wishlist from '../Screens/wishlist/wishlist';
import DrawerNavigation from './DrawerNavigation';
const Stack = createNativeStackNavigator();

const HomeCustomeNavigation = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false,}}
        name={'DrawerNavigation'}
        component={DrawerNavigation}
      />

      <Stack.Screen
        name="ProductDetail"
        component={Productdetailscreen}
        options={({navigation}) => ({
          headerTransparent: true,
          title: null,
          headerStyle: {
            backgroundColor: '#f6f1eb',
          },
          headerBackTitleVisible: false,
          headerLeft: () => (
            <Icon
              name="arrow-back"
              size={25}
              color="#333"
              style={{marginLeft: 1}}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="CategoryProducts"
        component={CategoryProducts}
        options={{
          headerTransparent: true,
          title: null,
          headerStyle: {
            backgroundColor: '#f6f1eb',
          },
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
    </Stack.Navigator>
  );
};

export default HomeCustomeNavigation;
