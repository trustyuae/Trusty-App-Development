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
    <View>
      <ImageBackground style={styles.container} source={Images.HeadingImage}>
        <Image
          style={styles.container}
          source={Images.homeScreenBackground}></Image>
        <Image style={styles.imageContainer} source={Images.logoHome}></Image>
        <View style={styles.textConatainer}>
          <Text style={styles.MainHeading}>
            SHINE WITH US OUR CAVE OF WONDER
          </Text>
          <Text style={styles.subHeading}>
            We create for you a world of elegance and beauty with love and
            passion, Luxurious life is stunning, the best from china to your
            house door
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    ImageBackground: globalColors.homeScreenBackground,
    height: hp('49%'),
    objectFit: 'cover',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  imageContainer: {
    // alignItems: 'center',
    margin: 'auto',
    marginTop: hp('-47%'),
  },
  MainHeading: {
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'Intrepid Regular',
    fontSize: 18,
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
