import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigation from './BottomTabNavigation';
import DrawerNavigation from './DrawerNavigation';
import SplashScreen from '../Components/SplashScreen/SplashScreen';
import CategoryProducts from '../Screens/CategoryProducts';
<<<<<<< Updated upstream
=======
import ForgotpasswordScreen from '../Screens/Login/ForgotpasswordScreen';
import Loginscreen from '../Screens/Login/Loginscreen';
import SignupPage from '../Screens/Login/SignupPage';
import Productdetailscreen from '../Screens/Productdetail/Productdetailscreen';
import CartScreen from '../Screens/Cart/CartScreen';
import Theme from '../Assets/Theme/Theme';
import ThankYouScreen from '../Screens/ThankYou/ThankYouScreen';
>>>>>>> Stashed changes

const Stack = createNativeStackNavigator();
const AppNavigations = () => {
  return (
<<<<<<< Updated upstream
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="splash" component={SplashScreen} />
        <Stack.Screen name="Main" component={DrawerNavigation} />
        <Stack.Screen name="CategoryProducts" component={CategoryProducts} />
=======
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
            headerShown: false,
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
            headerTransparent: true,
            title: null,
            // headerStyle: {
            //   backgroundColor: '#f6f1eb',
            // },
          }}
        />
>>>>>>> Stashed changes
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigations;
