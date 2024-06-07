import React from 'react';
import { StatusBar } from 'react-native';
import { globalColors } from '../../Assets/Theme/globalColors'; // Assuming globalColors is imported from your theme file
import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

const CustomStatusBar = (color) => {
    return (
        <StatusBar color={color} />
    );
};

export default CustomStatusBar;
