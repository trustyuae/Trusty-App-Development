import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Images} from '../Constants/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {globalColors} from '../Assets/Theme/globalColors';
const Category = ({uri, name}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: uri}}></Image>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalColors.headingBackground,
    gap: 10,
    marginHorizontal: 5,
  },
  image: {
    width: wp('46%'),
    height: hp('25%'),
    marginBottom: wp('2.5%'),
  },
  name: {
    marginBottom: wp('2.5%'),
    fontFamily: 'Intrepid Regular',
    fontSize: 18,
    color: globalColors.black,
    textTransform: 'capitalize',
  },
});

export default Category;
