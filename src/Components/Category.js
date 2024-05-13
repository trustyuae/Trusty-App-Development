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
      <Image style={styles.image} source={uri}></Image>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // alignItems: 'center',
    // marginBottom: 10,
    justifyContent: 'center',
    width: '50%',
    backgroundColor: globalColors.backgroundCategory,
    // paddingHorizontal: 10,
  },
  image: {
    width: wp('45%'),
    height: hp('25%'),
    marginBottom: wp('2.5%'),
  },
  name: {
    width: wp('50%'),
    marginLeft: wp('8%'),
    alignItems: 'flex-end',
    marginBottom: wp('2.5%'),
    color: globalColors.black,
  },
});

export default Category;
