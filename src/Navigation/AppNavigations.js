import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../Components/SplashScreen/SplashScreen';
import CategoryProducts from '../Screens/CategoryProducts';
import ForgotpasswordScreen from '../Screens/Login/ForgotpasswordScreen';
import Loginscreen from '../Screens/Login/Loginscreen';
import SignupPage from '../Screens/Login/SignupPage';
import Productdetailscreen from '../Screens/Productdetail/Productdetailscreen';
import CartScreen from '../Screens/Cart/CartScreen';
import Theme from '../Assets/Theme/Theme';
import ThankYouScreen from '../Screens/ThankYou/ThankYouScreen';
import BottomTabNavigation from './BottomTabNavigation';
import Profile from '../Screens/Profile/Profile';
import Order from '../Screens/Profile/Order';

const Stack = createNativeStackNavigator();
const AppNavigations = () => {
  return (
    <NavigationContainer theme={Theme}>
      <Stack.Navigator initialRouteName="splash">
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
          name="CategoryProducts"
          component={CategoryProducts}
          options={{
            headerTransparent: true,
            title: null,
            headerStyle: {
              backgroundColor: '#f6f1eb',
            },
          }}
        />
        <Stack.Screen
          name="Login"
          component={Loginscreen}
          options={{
            headerTransparent: true,
            title: null,
            headerStyle: {
              backgroundColor: '#f6f1eb',
            },
          }}
        />
        <Stack.Screen
          name="Forgotpassword"
          component={ForgotpasswordScreen}
          options={{
            headerTransparent: true,
            title: null,
            headerStyle: {
              backgroundColor: '#f6f1eb',
            },
          }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupPage}
          options={{
            headerTransparent: true,
            title: null,
            headerStyle: {
              backgroundColor: '#f6f1eb',
            },
          }}
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
          name="Cart"
          component={CartScreen}
          options={{
            headerTransparent: true,
            title: null,
            headerStyle: {
              backgroundColor: '#f6f1eb',
            },
          }}
        />
        <Stack.Screen
          name="ThankYou"
          component={ThankYouScreen}
          options={{
            headerTransparent: false,
            title: null,
            headerShown: false,

            // headerStyle: {
            //   backgroundColor: '#f6f1eb',
            // },
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerTransparent: true,
            title: null,
            // headerStyle: {
            //   backgroundColor: '#f6f1eb',
            // },
          }}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigations;
