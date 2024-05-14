import React from 'react';
import {Image, ImageBackground, StyleSheet, View} from 'react-native';
import {Images} from '../../Constants/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const HeadingImage = () => {
  return (
    <View>
      <ImageBackground style={styles.container} source={Images.HeadingImage}>
        <Image style={styles.imageContainer} source={Images.logoHome}></Image>
        {/* <Text>gfgh</Text> */}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    // width: 431,
    // height: 396,//////////////////////////
    height: hp('46%'),
    // objectFit: 'cover',
  },
  imageContainer: {
    // justifyContent: 'center',
    // flexDirection: 'row',
    // marginLeft: wp('30%'),
    alignItems: 'center',
    margin: 'auto',
    marginTop: hp('2%'),
  },
});
export default HeadingImage;
