import React from 'react';
import {Image} from 'react-native';
import {View} from 'react-native';
import {Images} from '../Constants/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Header = () => {
  return (
    <View style={{marginLeft: wp('-80%')}}>
      <Image source={Images.arrowBack}></Image>
    </View>
  );
};

export default Header;
