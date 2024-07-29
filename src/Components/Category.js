import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import {Images} from '../Constants/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {globalColors} from '../Assets/Theme/globalColors';
import {NoImg} from '../Constants/Icons';

const Category = ({uri, name, description, price, id, isWatchList}) => {
  const [imageUri, setImageUri] = useState(uri);
  const [saved, setSaved] = useState(isWatchList === true);
  const handleImageError = () => {
    setImageUri(null);
  };

  return (
    <View style={styles.container}>
      {imageUri == null || imageUri === '' ? (
        <Image style={styles.image} source={NoImg} onError={handleImageError} />
      ) : (
        <Image
          style={styles.image}
          source={{uri: imageUri}}
          onError={handleImageError}
        />
      )}
      <Pressable style={styles.saveImagea}>
        <Image
          style={styles.saveImage}
          source={saved ? Images.saveIconFill : Images.saveIconUnFill}
        />
      </Pressable>

      <View style={{width: 160, marginTop: hp('1%')}}>
        <Text style={styles.custom}>{name}</Text>
        <Text style={styles.custtext}>{price} AED</Text>
        {id === 1 ? (
          <View
            style={{flexDirection: 'row', marginTop: -10, marginBottom: 30}}>
            <Text style={{textDecorationLine: 'line-through'}}>1840 AED </Text>
            <Text style={{color: globalColors.lightgold}}> (50%)</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  custtext: {
    color: globalColors.black,
    fontWeight: '700',
    marginVertical: 10,
    fontSize: 16,
    fontFamily: 'Product Sans',
  },
  container: {
    backgroundColor: globalColors.headingBackground,
    marginHorizontal: 5,
  },
  image: {
    borderRadius: 5,
    width: wp('52%'),
    height: hp('26%'),
    resizeMode: 'contain',
  },
  dummy: {
    borderRadius: 5,
    width: wp('52%'),
    height: hp('26%'),
    resizeMode: 'contain',
  },
  name: {
    marginBottom: wp('5%'),
    fontFamily: 'Product Sans',
    color: globalColors.lightgold,
  },
  saveImagea: {
    position: 'absolute',
    marginTop: -6,
    marginLeft: wp('36%'),
    padding: 12,
    left: 14,
  },
  saveImage: {
    width: 32,
    resizeMode: 'contain',
    padding: 8,
    height: 32,
  },
  custom: {
    color: globalColors.black,
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Product Sans',
  },
});

export default Category;
