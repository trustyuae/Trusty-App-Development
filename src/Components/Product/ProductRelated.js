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
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { NoImg } from '../../Constants/Icons';

const ProductRelated = ({
  uri,
  name,
  price,
  product_id,
  isWatchList,
  img,
  description,
}) => {
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
          await dispatch(removeFromWishlist({ product_id, tokenData }));
          setSaved(false);
          // await dispatch(fetchWishlist(tokenData));
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          // await dispatch(fetchWishlist(tokenData));
          await dispatch(addToWishlist({ product_id, tokenData }));
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
      <View style={styles.imageContainer}>
        {uri ? (
          <View>
            <Image
              style={styles.image}
              source={{
                uri: uri,
              }}
              // source={img}
              resizeMode="cover"
            />
          </View>
        ) : (
          <Image source={NoImg} style={styles.dummy} resizeMode="cover" />
        )}
        <Pressable onPress={toggleSaved} style={styles.saveImagea}>
          <Image
            style={styles.saveImage}
            source={saved ? Images.saveIconFill : Images.saveIconUnFill}
          />
        </Pressable>
      </View>

      <View style={styles.detailsContainer}>
        {/* <Text style={styles.name}>{description.length > 20 ? `${description.substring(0, 20)}...` : description}</Text> */}
        <Text style={styles.name}>{name}</Text>
        {price ? (
          <Text style={styles.price}>{price} AED</Text>
        ) : (
          <Text style={styles.price}>200 AED</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centercontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignContent: 'center',
    // marginHorizontal: wp('1%'),
    borderRadius: 5,
    // marginRight: 5,
    // marginBottom: hp('2%'),
    overflow: 'hidden',
    height: hp("32%"),
    // backgroundColor:'yellow'
  },
  imageContainer: {
    width: wp('32%'),
    height: hp('18%'),
    position: 'relative',
    // backgroundColor: globalColors.productBackground,
  },
  detailsContainer: {
    marginTop: hp('2%'),
    marginBottom: 5,
    height: hp('10%'),
    width: wp('46%'),
    justifyContent: 'center',
  },
  name: {
    width: wp('44%'),
    fontSize: 17,
    fontWeight: '400',
    textTransform: 'capitalize',
    fontFamily: 'Intrepid Regular',
    color: globalColors.newTextColorProduct,
    marginTop: hp('2%'),
    paddingHorizontal: wp('2%'),

  },
  price: {
    fontSize: 18,
    marginTop: wp('1%'),
    fontFamily: 'Intrepid Regular',
    fontWeight: '300',
    paddingHorizontal: wp('2%'),

    color: globalColors.productPriceText,
  },
  saveImagea: {
    position: 'absolute',
    marginTop: wp('0.1%'),
    marginLeft: wp('28%'),
    padding: 12,
    left: 15,
  },
  saveImage: {
    width: 32,
    resizeMode: 'contain',
    padding: 8,
    height: 32,
  },
  image: {
    borderRadius: 6,
    width: wp('46%'),
    height: hp('21%'),
  },
  dummy: {
    borderRadius: 5,
    width: wp('46%'),
    height: hp('21%'),
  },

  heading: {
    color: globalColors.lightgold,
    marginTop: hp('6%'),
    fontFamily: 'Product Sans',
  },
});

export default ProductRelated;
