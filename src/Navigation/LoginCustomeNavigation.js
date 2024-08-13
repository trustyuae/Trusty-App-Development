import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Loginscreen from '../Screens/Login/Loginscreen';
import ForgotpasswordScreen from '../Screens/Login/ForgotpasswordScreen';
import {SignupPage} from '../Screens';
import Icon from 'react-native-vector-icons/Ionicons'; // Assuming you're using Ionicons for the back button icon

const Stack = createNativeStackNavigator();

const LoginCustomeNavigation = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name={'Login'}
        component={Loginscreen}
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
          headerBackTitleVisible: false,

          headerLeft: () => (
            <Icon
              name="arrow-back"
              size={25}
              color="#333" // Customize the color as needed
              style={{marginLeft: 1}}
              onPress={() => navigation.navigate('Login')}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupPage}
        options={{
          headerTransparent: true,
          title: null,
          headerShown: false,
          headerStyle: {
            backgroundColor: '#f6f1eb',
          },
          headerBackTitleVisible: false,
          headerLeft: () => (
            <Icon
              name="arrow-back"
              size={25}
              color="#333" // Customize the color as needed
              style={{marginLeft: 1}}
              onPress={() => navigation.navigate('Login')}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default LoginCustomeNavigation;
