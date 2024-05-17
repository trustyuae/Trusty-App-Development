import React from 'react';
import { Text,View,TouchableOpacity } from 'react-native';

const Watchlist = ({navigation}) => {
  return( <View>
    <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
<Text>Login</Text>
</TouchableOpacity>
<TouchableOpacity onPress={()=>navigation.navigate("Singup")}>
<Text>Singup</Text>
</TouchableOpacity>
<TouchableOpacity onPress={()=>navigation.navigate("ProductDetail")}>
<Text>ProductDetail</Text>
</TouchableOpacity>
<TouchableOpacity onPress={()=>navigation.navigate("Cart")}>
<Text>CartScreen</Text>
</TouchableOpacity>
  </View>)
};

export default Watchlist;
   
