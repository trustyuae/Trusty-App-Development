import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Cart from './Cart';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

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
      <TouchableOpacity onPress={handleProfileNavigation}>
        <Text>profile</Text>
      </TouchableOpacity>
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
