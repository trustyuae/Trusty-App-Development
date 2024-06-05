import React, { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { globalColors } from '../../Assets/Theme/globalColors';
import { Images } from '../../Constants/index';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToWishlist,
  fetchWishlist,
  removeFromWishlist,
} from '../../Redux/Slice/wishlistSlice';
import { getToken } from '../../Utils/localstorage';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const Product = ({ uri, name, price, product_id, isWatchList }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // const wishlist = useSelector(state => state.wishlist.items);

  // const initialSaved = false;
  const [saved, setSaved] = useState(isWatchList);
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
  }, [dispatch, saved]);
  // useEffect(() => {
  //   if (wishlist && wishlist.length > 0) {
  //     const wishlistIds = wishlist.map(item => item.toString()); // convert Wishlist array to string array
  //     console.log('dd', wishlistIds);
  //     if (wishlistIds.includes(product_id.toString())) {
  //       setSaved(true);
  //     } else {
  //       setSaved(false);
  //     }
  //   }
  // }, [wishlist, product_id]);

  const toggleSaved = async () => {
    if (tokenData) {
      if (saved) {
        try {
          dispatch(removeFromWishlist({ product_id, tokenData }));
          setSaved(false);
          await dispatch(fetchWishlist(tokenData));
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          dispatch(addToWishlist({ product_id, tokenData }));
          setSaved(true);
          await dispatch(fetchWishlist(tokenData));
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      navigation.navigate('LoginCustomeNavigation');
      Toast.show({
        type: 'info',
        text1: 'Please login',
        text2: 'You need to login to save items to your wishlist',
        visibilityTime: 2000,
        autoHide: true,
      });
      console.log('No token available');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>


        <Image
          style={styles.image}
          source={{
            uri,
          }}
          resizeMode="cover"
        />
        <Pressable onPress={toggleSaved} style={styles.saveImagea}>
          <Image
            style={styles.saveImage}
            source={saved ? Images.saveIconFill : Images.saveIconUnFill}
          />
        </Pressable>
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
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // objectFit: 'resizeMode',
    // justifyContent: 'center',
    width: wp('46%'),
    position: 'relative',
    // height: hp('25%'),
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
    textTransform: 'capitalize',
    fontFamily: 'Intrepid Regular',
    color: globalColors.productTextColor,
  },
  price: {
    fontSize: 14.06,
    marginLeft: wp('2%'),
    fontFamily: 'Intrepid Regular',

    color: globalColors.productPriceText,
  },
  saveImagea: {
    position: 'absolute',
    marginTop: wp('3%'),
    // backgroundColor: 'red',
    marginLeft: wp('32%'),

    width: 12,
    height: 14,
    left: 19,
  },
  saveImage: {
    // position: 'absolute',
    // marginLeft: wp('15%'),
    width: 11,
    padding: 8,
    height: 13,
  },
  image: {
    width: wp('46%'),
    height: hp('25%'),
    // alignContent: 'center',
  },
});

export default Product;
