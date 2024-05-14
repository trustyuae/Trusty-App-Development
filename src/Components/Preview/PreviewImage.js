import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const PreviewImage = ({uri}) => {
  return (
    <View style={styles.container}>
      <Image source={uri} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: hp('2%'),
    marginBottom: hp('4%'),
    marginLeft: wp('3%'),
    marginRight: wp('3%'),
    alignContent: 'center',
    flexWrap: 'wrap',
  },
});

export default PreviewImage;
