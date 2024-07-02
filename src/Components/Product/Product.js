import React, {useEffect, useState} from 'react';
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
import {globalColors} from '../../Assets/Theme/globalColors';
import {Images} from '../../Constants/index';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToWishlist,
  fetchWishlist,
  removeFromWishlist,
} from '../../Redux/Slice/wishlistSlice';
import {getToken} from '../../Utils/localstorage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {NoImg} from '../../Constants/Icons';

const Product = ({uri, name, price, product_id, isWatchList}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [saved, setSaved] = useState(isWatchList === true);
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
          // await dispatch(fetchWishlist(tokenData));
          dispatch(removeFromWishlist({product_id, tokenData}));
          setSaved(false);
          // await dispatch(fetchWishlist(tokenData));
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          // await dispatch(fetchWishlist(tokenData));
          dispatch(addToWishlist({product_id, tokenData}));
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
        visibilityTime: 2000,
        autoHide: true,
      });
      console.log('No token available');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {uri ? (
          <Image
            style={styles.image}
            source={{
              uri,
            }}
            resizeMode="cover"
          />
        ) : (
          <Image source={NoImg} style={styles.image} resizeMode="contain" />
        )}
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
    width: wp('46%'),
    position: 'relative',

    backgroundColor: globalColors.productBackground,
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
    marginTop: wp('2%'),
    marginLeft: wp('30%'),
    padding: 12,
    left: 19,
  },
  saveImage: {
    width: 11,
    resizeMode: 'contain',

    padding: 8,
    height: 13,
  },
  image: {
    width: wp('46%'),
    height: hp('25%'),
    objectFit: 'cover',
  },
});

export default Product;
