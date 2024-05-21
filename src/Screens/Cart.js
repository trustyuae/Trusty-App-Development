import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

import { getToken } from '../Utils/localstorage';

const Cart = () => {
  useEffect(()=>{
   let data= getToken()
   console.log(data);
  },[])

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 22, fontFamily: 'Intrepid Regular'}}>
        Comming Soon
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
export default Cart;
