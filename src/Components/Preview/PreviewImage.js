import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {globalColors} from '../../Assets/Theme/globalColors';

const PreviewImage = ({uri}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.container} source={uri} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '98%',
    marginLeft: wp('0.5%'),
    backgroundColor: globalColors.headingBackground,
    marginTop: hp('1%'),
  },
  imageContainer: {
    // marginLeft: wp('10%'),
    // width: '80%',
    // marginRight: wp('10%'),
  },
});

export default PreviewImage;
