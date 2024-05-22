import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
const Button = ({stylesofbtn, handlepress, name, styleoffont, loading}) => {
  return (
    <TouchableOpacity style={stylesofbtn} onPress={handlepress}>
      {loading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <Text style={styleoffont}>{name}</Text>
      )}
    </TouchableOpacity>
  );
};
export default Button;
