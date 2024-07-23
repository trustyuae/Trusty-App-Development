import * as React from 'react';
import {Image, Touchable, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Home, Settings} from '../Screens';
import SignupPage from '../Screens/Login/SignupPage';
import BottomTabNavigation from './BottomTabNavigation';
import HomeCustomeNavigation from './HomeCustomeNavigation';
import {Images} from '../Constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';
const Drawer = createDrawerNavigator();

const DrawerNavigation = ({navigation}) => {
  const screenOptions = {
    headerShown: false,
  };

  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="DrawerHome"
        component={Home}
        options={{
          headerShown: true,
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity 
              // onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              >
              <View style={{marginLeft: 10}}>
                <Image source={Images.Menu} style={{width: 20, height: 20}} />
              </View>
            </TouchableOpacity>
          ),
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Image source={Images.Head} style={{width: 145, height: 32}} />
          ),
          headerRight: () => (
            <View style={{marginRight: 10}}>
              <Image source={Images.Bags} style={{width: 25, height: 24}} />
            </View>
          ),
        }}
      />
      {/* <Drawer.Screen name="Settings" component={Settings} /> */}
      <Drawer.Screen name="Signup" component={SignupPage} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
