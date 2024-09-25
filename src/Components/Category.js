import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import {Images} from '../Constants/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {globalColors} from '../Assets/Theme/globalColors';
import {NoImg} from '../Constants/Icons';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

const Category = ({uri, name, description, price, id, isWatchList}) => {
  const dispatch=useDispatch()
  const [imageUri, setImageUri] = useState(uri);
  const [saved, setSaved] = useState(isWatchList === true);
  const handleImageError = () => {
    setImageUri(null);
  };

  const [tokenData, setTokenData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        if (token) {
          setTokenData(token);
        }
      } catch (error) {
        console.log('Error retrieving data:', error);
      }
    };

    fetchData();
  }, [dispatch, tokenData]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        if (tokenData) {
          await dispatch(fetchWishlist(tokenData));
        }
      };

      fetchData();
    }, [saved, dispatch, isWatchList, tokenData]),
  );

  const toggleSaved = async () => {
    if (tokenData) {
      if (saved) {
        try {
          // await dispatch(fetchWishlist(tokenData));
          await dispatch(removeFromWishlist({product_id, tokenData}));
          setSaved(false);
          // await dispatch(fetchWishlist(tokenData));
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          // await dispatch(fetchWishlist(tokenData));
          await dispatch(addToWishlist({product_id, tokenData}));
          setSaved(true);
          // await dispatch(fetchWishlist(tokenData));
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      navigation.navigate('LoginCustomeNavigation');
      Toast.show({
        type: 'info',
        text1: 'Please login',
        position: 'bottom',
        text2: 'You need to login to save items to your wishlist',
        visibilityTime: 3000,
        autoHide: true,
      });
      console.log('No token available');
    }
  };



  return (
    <View style={styles.container}>
      {imageUri == null || imageUri === '' ? (
        <Image style={styles.image} source={NoImg} onError={handleImageError} />
      ) : (
        <Image
          style={styles.image}
          source={{uri: uri}}
          onError={handleImageError}
        />
      )}
      <Pressable onPress={toggleSaved} style={styles.saveImagea}>
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
    borderRadius: hp('2%'),
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
    marginTop: hp('1.5%'),
    marginLeft: wp('34%'),
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
