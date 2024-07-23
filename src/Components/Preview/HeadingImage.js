import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {Images} from '../../Constants/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {globalColors} from '../../Assets/Theme/globalColors';

const HeadingImage = () => {
  return (
    <View style={{width: wp('100%'), alignSelf: 'center',marginTop:-10}}>
       
       <ImageBackground style={styles.container} source={Images.HeadingImage}>
        <Image style={styles.imageContainer} source={Images.Textimg}></Image>
     
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp("100%"),
    ImageBackground: globalColors.homeScreenBackground,
    height: hp("37%"),
    objectFit: 'cover',
   
  },
  imageContainer: {
    alignItems: 'center',
    margin: 'auto',
    marginTop: hp('20%'),
    height:hp("15%"),
    width:wp('100%')  
  },
  MainHeading: {
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'Intrepid Regular',
    fontSize: 17,
    color: globalColors.white,
  },
  subHeading: {
    fontSize: 14,
    width: wp('70%'),
    height: hp('10%'),
    textAlign: 'center',
    fontFamily: 'Intrepid Regular',
    margin: 'auto',
    color: globalColors.white,
  },
  textConatainer: {
    marginBottom: hp('11%'),
    alignContent: 'center',
    gap: hp('1%'),
  },
});
export default HeadingImage;
