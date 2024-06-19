import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import { globalColors } from '../Assets/Theme/globalColors';
const Button = ({ stylesofbtn, handlepress, name, styleoffont, loading }) => {
  return (
    <TouchableOpacity style={stylesofbtn} onPress={handlepress}>
      {loading ? (
        <ActivityIndicator size="small" color={globalColors.white} />
      ) : (
        <Text style={styleoffont}>{name}</Text>
      )}
    </TouchableOpacity>
  );
};
export default Button;
