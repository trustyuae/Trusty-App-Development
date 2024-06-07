import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Cart from './Cart';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import CustomStatusBar from '../Components/StatusBar/CustomSatusBar';
import {globalColors} from '../Assets/Theme/globalColors';

const Watchlist = () => {
  const navigation = useNavigation();
  const isLoggedIn = useSelector(state => state.user.userData !== null);

  const handleProfileNavigation = () => {
    if (isLoggedIn) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('Login'); // Navigate to the login screen if not logged in
    }
  };

  return (
    <View style={styles.container}>
      <CustomStatusBar color={globalColors.headingBackground}></CustomStatusBar>

      <Text
        style={{fontSize: 22, color: 'black', fontFamily: 'Intrepid Regular'}}>
        Menu Comming Soon !!!
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F1EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Watchlist;
