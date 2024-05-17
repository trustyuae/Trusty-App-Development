import { Text, TouchableOpacity,StyleSheet} from 'react-native';
import React from 'react';

const Button = ({stylesofbtn,handlepress,name,styleoffont}) => {
  return (
    <TouchableOpacity style={stylesofbtn} onPress={handlepress}>
      <Text style={styleoffont}>{name}</Text>
    </TouchableOpacity>
  );
};

export default Button;
