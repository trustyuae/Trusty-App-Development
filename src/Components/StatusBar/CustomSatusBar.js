import React, { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { globalColors } from '../../Assets/Theme/globalColors';

const CustomStatusBar = ({ color, barStyle = 'dark-content' }) => {
  useFocusEffect(
    React.useCallback(() => {
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(color); // Android only
      }
      StatusBar.setBarStyle(barStyle); // Works on both iOS and Android
    }, [color, barStyle])
  );

  return null;
};

export default CustomStatusBar;
