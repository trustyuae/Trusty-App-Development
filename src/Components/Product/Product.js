import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {globalColors} from '../../Assets/Theme/globalColors';
import {Images} from '../../Constants/index';

const Product = ({uri, name, price, saved}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={uri}></Image>
        {saved ? (
          <Image style={styles.saveImage} source={Images.saveIconFill}></Image>
        ) : (
          <Image
            style={styles.saveImage}
            source={Images.saveIconUnFill}></Image>
        )}
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
    marginBottom: hp('2%'),
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
    // gap: 10,
  },
  detailsContainer: {
    height: hp('7%'),
    width: wp('46%'),
    justifyContent: 'center',
    backgroundColor: globalColors.white,
  },
  name: {
    fontSize: 16,
    fontWeight: '400',
    marginLeft: wp('2%'),
    fontFamily: 'Intrepid Regular',

    color: globalColors.productTextColor,
  },
  price: {
    fontSize: 14.06,
    marginLeft: wp('2%'),
    fontFamily: 'Intrepid Regular',

    color: globalColors.productPriceText,
  },
  saveImage: {
    marginTop: wp('3%'),
    marginLeft: 'auto',
    marginRight: wp('6%'),
  },
  image: {
    marginLeft: wp('12%'),
  },
});

export default Product;
