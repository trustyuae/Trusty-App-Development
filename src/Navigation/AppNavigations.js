import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../Components/SplashScreen/SplashScreen';
import CartScreen from '../Screens/Cart/CartScreen';
import Theme from '../Assets/Theme/Theme';
import ThankYouScreen from '../Screens/ThankYou/ThankYouScreen';
import BottomTabNavigation from './BottomTabNavigation';
import Profile from '../Screens/Profile/Profile';
import Order from '../Screens/Profile/Order';
import ProfileNavigations from './ProfileNavigations';
import Points from '../Screens/Profile/Points';
import Icon from 'react-native-vector-icons/Ionicons'; // Assuming you're using Ionicons for the back button icon

const Stack = createNativeStackNavigator();
const AppNavigations = ({ navigation }) => {
  return (
    <NavigationContainer theme={Theme}>
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
          name="Cart"
          component={CartScreen} // Pass the navigation prop here
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
                color="#333" // Customize the color as needed
                style={{ marginLeft: 1 }}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
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
