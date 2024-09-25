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

const Readytogo = ({ uri, name, price, product_id, isWatchList, img, description, id }) => {
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

  const toggleSaved = async () => {
    if (tokenData) {
      if (saved) {
        try {
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
      <View >


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
          <Image source={NoImg} style={styles.dummy} resizeMode="contain" />
        )}
        <Pressable onPress={toggleSaved} style={styles.saveImagea}>
          <Image
            style={styles.saveImage}
            source={saved ? Images.SaveIconFill3x : Images.saveIconUnFill3x}
          />
        </Pressable>
      </View>

      <View style={{ marginTop: hp('2%') }}>
        <Text style={styles.custom}>{name}</Text>
        <Text style={styles.custtext}>{price || 0} AED</Text>
        {id === 1 ? (
          <View
            style={{ flexDirection: 'row', marginTop: -10, marginBottom: 30 }}>
            <Text style={{ textDecorationLine: 'line-through' }}>1840 AED </Text>
            <Text style={{ color: globalColors.lightgold }}> (50%)</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  custtext: {
    color: globalColors.productPriceText,
    // marginVertical: 10,
    fontSize: 18,
    paddingHorizontal: wp('2%'),
    fontFamily: 'Intrepid Regular',
    // fontWeight: '700'
  },
  centercontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: globalColors.headingBackground,
    marginHorizontal: 5,
    // backgroundColor:'yellow'
  },
  imageContainer: {
    // borderRadius: hp('2%'),
    width: wp('27%'),
    height: hp('30%'),
    resizeMode: 'contain',
    position: 'relative',
    // backgroundColor: globalColors.productBackground,
  },
  detailsContainer: {
    marginTop: hp('1%'),
    height: hp('10%'),
    width: wp('30%'),
    justifyContent: 'center',
  },
  name: {
    width: wp("30%"),
    fontSize: 18,
    fontWeight: '400',
    textTransform: 'capitalize',
    fontFamily: 'Intrepid Regular',
    color: globalColors.black,
    fontWeight: '600',
    marginTop: wp('5%'),
  },
  price: {
    color: globalColors.black,
    fontWeight: "700",
    // marginVertical: 10,
    fontSize: 16,
    fontFamily: 'Intrepid Regular',
  },
  saveImagea: {
    position: 'absolute',
    marginTop: wp('0.1%'),
    marginLeft: wp('22%'),
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
    borderRadius: 5,
    width: wp('41%'),
    height: hp('19%'),
    resizeMode: 'contain',
  },
  dummy: {
    borderRadius: 5,
    width: wp('40%'),
    height: hp('21%'),
  },

  heading: {
    color: globalColors.lightgold,
    marginTop: hp('6%'),
    fontFamily: 'Intrepid Regular',
  },
  custom: {
    color: globalColors.newTextColorProduct,
    fontSize: 18,
    fontWeight: '400',
    // flexWrap: 'wrap',
    width: wp('41%'),
    paddingHorizontal: wp('2%'),
    fontFamily: 'Intrepid Regular',
  },
});

export default Readytogo;
