import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../Components/SplashScreen/SplashScreen';
import CartScreen from '../Screens/Cart/CartScreen';
import Theme from '../Assets/Theme/Theme';
import ThankYouScreen from '../Screens/ThankYou/ThankYouScreen';
import BottomTabNavigation from './BottomTabNavigation';
import Profile from '../Screens/Profile/Profile.js';
import ProfileNavigations from './ProfileNavigations';
import Icon from 'react-native-vector-icons/Ionicons';
import OrderDetails from '../Screens/Profile/OrderDetails.js';
import Order from '../Screens/Profile/Order.js';
import Wishlist from '../Screens/wishlist/wishlist.js';
import Productdetailscreen from '../Screens/Productdetail/Productdetailscreen.js';
import OrderTrackingScreen from '../Screens/OrderTrackingScreen.js';
import SetNewPassword from '../Screens/Login/SetNewPassword.js';
import { Linking } from 'react-native';
import SearchScreen from '../Screens/search/SearchScreen.js';
import WebViewScreen from '../Components/WebView/WebViewScreen.js';
import FindItems from '../Screens/search/FindItems.js';


const Stack = createNativeStackNavigator();
const AppNavigations = ({ navigation }) => {
  const linking = {
    prefixes: [
      'trustyuae.com//',
      'https://trustyuae.com/',
      'trustyuae.com://',
      'trustyuae.com/',
    ],
    config: {
      screens: {
        ResetPasswordLink: 'ResetPasswordLink',
      },
    },
  };
  return (
    <NavigationContainer theme={Theme} linking={linking}>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="splash"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabNavigation}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="WebViewScreen"
          component={WebViewScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Cart"
          component={CartScreen}

          options={({ navigation }) => ({
            headerTransparent: true,
            headerShown: false,
            title: null,
            headerStyle: {
              backgroundColor: '#f6f1eb',
            },
            headerBackTitleVisible: false,

          })}
        />
        <Stack.Screen
          name="wishlist"
          component={Wishlist}
          options={({ navigation }) => ({
            // Pass navigation prop here
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
                style={{ marginLeft: 1 }}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />

        <Stack.Screen
          name="ProductDetail"
          component={Productdetailscreen}
          options={({ navigation }) => ({
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
                style={{ marginLeft: 1 }}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />

        <Stack.Screen
          name="Order"
          component={Order}
          options={{
            headerTransparent: true,
            title: null,
            // headerStyle: {
            //   backgroundColor: '#f6f1eb',
            // },
          }}
        />
        <Stack.Screen
          name="OrderTracking"
          component={OrderTrackingScreen}
          options={({ navigation }) => ({
            headerTransparent: true,
            title: null,
            headerShown: false,

          })}
        />
        <Stack.Screen
          name="ResetPasswordLink"
          component={SetNewPassword}
          options={({ navigation }) => ({
            headerTransparent: true,
            title: null,
            headerLeft: () => (
              <Icon
                name="arrow-back"
                size={25}
                color="#333"
                style={{ marginLeft: 1 }}
                onPress={() => navigation.navigate('Forgotpassword')}
              />
            ),
          })}
        />
        <Stack.Screen
          name="SearchScreenq"
          component={SearchScreen}
          options={({ navigation }) => ({
            headerTransparent: true,
            title: null,
            headerLeft: () => (
              <Icon
                name="arrow-back"
                size={25}
                color="#333"
                style={{ marginLeft: 1 }}
                onPress={() => navigation.navigate('Forgotpassword')}
              />
            ),
          })}
        />
        <Stack.Screen
          name="OrderDetail"
          component={OrderDetails}
          options={({ navigation }) => ({
            // Pass navigation prop here
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
                style={{ marginLeft: 1 }}
                onPress={() => navigation.goBack()}
              />
            ),
          })}>

        </Stack.Screen>
        <Stack.Screen
          name="findItems"
          component={FindItems}
          options={({ navigation }) => ({
            headerTransparent: true,
            title: null,
            headerStyle: {
              backgroundColor: '#f6f1eb',
            },
            headerBackTitleVisible: false,
            headerShown: false,

            // headerLeft: () => (
            //   <Icon
            //     name="arrow-back"
            //     size={25}
            //     color="#333"
            //     style={{ marginLeft: 1 }}
            //     onPress={() => navigation.goBack()}
            //   />
            // ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigations;
