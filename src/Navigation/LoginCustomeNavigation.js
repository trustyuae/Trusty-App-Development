import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Loginscreen from '../Screens/Login/Loginscreen';
import ForgotpasswordScreen from '../Screens/Login/ForgotpasswordScreen';
import {SignupPage} from '../Screens';

const Stack = createNativeStackNavigator();

const LoginCustomeNavigation = () => {
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
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupPage}
        options={{
          headerTransparent: true,
          title: null,
          headerStyle: {
            backgroundColor:'#f6f1eb',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default LoginCustomeNavigation;
