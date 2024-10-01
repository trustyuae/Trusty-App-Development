import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { globalColors } from '../../Assets/Theme/globalColors';

const CustomStatusBar = ({ color, barStyle = 'dark-content' }) => {
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBackgroundColor(color);
      StatusBar.setBarStyle(barStyle);
    }, [color, barStyle])
  );

  return null;
};

export default CustomStatusBar;
