import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {globalColors} from '../../Assets/Theme/globalColors';

const Product = ({uri, name, price}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={uri}></Image>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    marginHorizontal: wp('1%'),
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    objectFit: 'cover',
    justifyContent: 'center',
    width: wp('46%'),
    height: hp('25%'),

    backgroundColor: globalColors.productBackground,
  },
  detailsContainer: {
    height: hp('8%'),
    width: wp('46%'),
    backgroundColor: globalColors.white,
  },
  name: {
    fontSize: 16,
    fontWeight: '400',
    marginLeft: wp('2%'),
    color: globalColors.productTextColor,
  },
  price: {
    fontSize: 14.06,
    marginLeft: wp('2%'),
    color: globalColors.productPriceText,
  },
});

export default Product;
