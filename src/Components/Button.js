import { Text, TouchableOpacity,StyleSheet} from 'react-native';
import React from 'react';

const Button = ({styles,handlepress,name}) => {
  return (
    <TouchableOpacity style={styles.custbtn} onPress={handlepress}>
      <Text style={styles.custfontstyle}>{name}</Text>
    </TouchableOpacity>
  );
};

export default Button;
