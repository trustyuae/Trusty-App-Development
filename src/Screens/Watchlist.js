import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Cart from './Cart';
import {useNavigation} from '@react-navigation/native';

const Watchlist = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
     

     

    
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Text>profile</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => navigation.navigate('Order')}>
        <Text>order</Text>
      </TouchableOpacity> */}
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
