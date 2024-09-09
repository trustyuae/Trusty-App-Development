import * as React from 'react';
import { Button, Image, Touchable, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home, Settings } from '../Screens';
import SignupPage from '../Screens/Login/SignupPage';
import BottomTabNavigation from './BottomTabNavigation';
import HomeCustomeNavigation from './HomeCustomeNavigation';
import { Images } from '../Constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { color } from 'react-native-elements/dist/helpers';
import Shop from '../Screens/Shop/Shop';
const Drawer = createDrawerNavigator();

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}
function FAQ({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const DrawerNavigation = ({ navigation }) => {
  const screenOptions = {
    headerShown: false,
    activeBackgroundColor: 'red',
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#fff',
          width: 280,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <View style={{ marginLeft: 10 }}>
                <Image source={Images.Menu} style={{ width: 18, height: 16 }} />
              </View>
            </TouchableOpacity>
          ),
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Image source={Images.Head} style={{ width: 145, height: 32 }} />
          ),
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <Image source={Images.Bags} style={{ width: 25, height: 24 }} />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Shop"
        component={Shop}
        options={{
          headerTitle: '',
        }}
      />
      {/* <Drawer.Screen name="Settings" component={Settings} /> */}
      <Drawer.Screen
        name="Notification"
        component={NotificationsScreen}
        options={{ headerTitle: '' }}
      />
      <Drawer.Screen name="Faq" component={FAQ} options={{ headerTitle: '' }} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
