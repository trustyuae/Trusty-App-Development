import React, {useState} from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {Images} from '../../Constants/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {globalColors} from '../../Assets/Theme/globalColors';
import SkeletonLoader from '../Loader/SkeletonLoader';
import SkeletonLoaderHomeimg from '../Loader/SkeletonLoaderHomeimg';

const HeadingImage = () => {
  const [imageLoaded, setImageLoaded] = useState(true);

  return (
    <View style={{alignSelf: 'center', marginTop: -10}}>
      <ImageBackground
        style={styles.container}
        source={Images.HeadingImage}
        onLoad={() => setImageLoaded(false)}>
        <Image style={styles.imageContainer} source={Images.Textimg}></Image>
      </ImageBackground>
      {!imageLoaded && <SkeletonLoaderHomeimg />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    ImageBackground: globalColors.homeScreenBackground,
    height: hp('36%'),
    resizeMode: 'contain',
  },
  imageContainer: {
    alignItems: 'center',
    margin: 'auto',
    marginTop: hp('9%'),
    height: hp('25%'),
    width: wp('90%'),
    resizeMode: 'contain',
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
