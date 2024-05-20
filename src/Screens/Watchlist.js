import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Cart from './Cart';

const Watchlist = () => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 22, fontFamily: 'Intrepid Regular'}}>
        Comming Soon
      </Text>
      {/* <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text>Singup</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ProductDetail')}>
        <Text>ProductDetail</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        <Text>CartScreen</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ThankYou')}>
        <Text>ThankYou</Text>
      </TouchableOpacity> */}
      {/* <Cart></Cart> */}
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
