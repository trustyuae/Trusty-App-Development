import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

import { getToken } from '../Utils/localstorage';

const Cart = () => {
  useEffect(()=>{
   let data= getToken()
   console.log(data);
  },[])

  return (
    <View>
      <Text>Cart</Text>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({})