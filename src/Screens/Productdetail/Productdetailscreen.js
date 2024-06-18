import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from 'react-native';
// import { NotSaveICon, SaveICon } from '../../Constants/Icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Accordion from '../../Components/Accordion';
import Button from '../../Components/Button';
import MyCarousel from '../../Components/MyCarousel';
import Product from '../../Components/Product/Product';
import { Images } from '../../Constants';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { fetchById } from '../../Redux/Slice/SingleProductslice';
import { PartnerPerfect } from '../../Redux/Slice/perfectpatnerSlice';
import ProductBackup from '../../Components/Product/ProductBackup';
import { addToCart } from '../../Redux/Slice/car_slice/addtocart';
import { getToken, getUsername } from '../../Utils/localstorage';
import { color } from 'react-native-elements/dist/helpers';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomStatusBar from '../../Components/StatusBar/CustomSatusBar';
import { globalColors } from '../../Assets/Theme/globalColors';
import {
  addToWishlist,
  fetchWishlist,
  removeFromWishlist,
} from '../../Redux/Slice/wishlistSlice';
import SkeletonLoaderProductDetails from '../../Components/Loader/SkeletonLoaderProductDetails';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function Productdetailscreen({ route, }) {
  const scrollViewRef = useRef();
  const Navigation = useNavigation();
  const { userId, isWatchList } = route?.params;
  const dispatch = useDispatch();
  const { loading, error, responseData } = useSelector(state => state?.getById);

  const { errormessage, partner } = useSelector(state => state?.PatnerGet);
  const { items } = useSelector(state => state.wishlist);

  const { loa, err, cartdata } = useSelector(state => state);
  const [changeColor, setChange] = useState('');
  const [saved, setSaved] = useState(isWatchList);
  const [id, setId] = useState(userId);
  const [changeSize, setChangeSize] = useState('');
  const [load, setLoding] = useState(false);
  const [wishlistrelated, setWishlistRelated] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [color, setColor] = useState();
  const [size, setSize] = useState();


  const [wishlistId, setWishListId] = useState();
  const [isWishlist, setIsWishlist] = useState(isWatchList);

  useEffect(() => {
    dispatch(fetchById(id));
  }, [id]);

  useEffect(() => {
    dispatch(fetchById(userId));
  }, [userId]);
  useEffect(() => {
    responseData?.attributes?.forEach(attribute => {
      if (attribute.name.toLowerCase() === 'size') {
        setSize(
          attribute.options.map(option => {
            if (!isNaN(parseFloat(option)) && isFinite(option)) {
              return parseFloat(option);
            } else {
              return option;
            }
          }),
        );
      }
      if (attribute.name.toLowerCase() === 'color') {
        setColor(attribute?.options);
      }
    });
  }, [responseData]);

  useEffect(() => {
    const fetch = async () => {
      const token = await getToken();
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    fetch();
  }, []);

  const attributes = {};

  useEffect(() => {
    responseData?.attributes?.forEach(attribute => {
      if (attribute.name.toLowerCase() === 'size') {
        if (typeof changeSize === 'string') {
          attributes[attribute.slug] = changeSize.toLowerCase();
        } else {
          attributes[attribute.slug] = changeSize;
        }
      }
      if (attribute.name.toLowerCase() === 'color') {
        attributes[attribute.slug] = changeColor.toLowerCase();
      }
    });
  }, [changeSize, changeColor]);

  useEffect(() => {
    if (responseData?.categories[0]?.id && !load) {
      dispatch(PartnerPerfect(responseData?.categories[0]?.id));
      setWishlistRelated(partner);
    }
  }, [responseData]);

  const handlepress = async () => {
    setLoding(true);

    const data = {
      product_id: id,
      quantity: 1,
      attributes: attributes,
    };

    console.log(data);

    if (isLoggedIn) {
      if (changeSize == '' && changeColor == '') {
        Alert.alert('', 'Make sure you selected size and color');
        setLoding(false);
        return;
      }
      if (!changeSize) {
        Alert.alert('', 'Make sure you selected size');
        setLoding(false);
        return;
      }
      if (!changeColor) {
        Alert.alert('', 'Make sure you selected color');
        setLoding(false);
        return;
      }
      dispatch(addToCart(data)).then(action => {
        if (addToCart.fulfilled.match(action)) {
          setLoding(false);
          setChange('');
          setChangeSize('');
          navigation.navigate('Cart');
        }
      });
    } else {
      setLoding(false);
      Alert.alert('', 'please login and try again ', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => navigation.navigate('LoginCustomeNavigation'),
        },
      ]);
    }
  };

  const handleproduct = id => {
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
    setId(id);
  };

  // console.log("partner JSON-->", JSON.stringify(partner));

  useEffect(() => {
    if (items.Wishlist) {
      const itemIdList = items.Wishlist?.map(item => ({ id: item }));
      const itemIdListids = new Set(itemIdList.map(item => Number(item.id)));

      setWishListId(itemIdListids);
      const result = partner?.map(productItem => ({
        ...productItem,
        isWatchList: itemIdListids.has(productItem.id),
      }));

      setWishlistRelated(result);
    } else if (partner) {
      setWishlistRelated(partner);
    }
  }, [partner, toggleSaved]);

  const toggleSaved = async () => {
    const tokenData = await getToken();
    if (tokenData) {
      try {
        // Check if the product is in the wishlist
        // const isProductInWishlist = wishlistId?.has(userId);

        if (isWishlist) {
          // Product is in the wishlist, so remove it
          await dispatch(fetchWishlist(tokenData));
          dispatch(removeFromWishlist({ product_id: userId, tokenData }));
          setIsWishlist(false);
        } else {
          // Product is not in the wishlist, so add it
          dispatch(fetchWishlist(tokenData));

          dispatch(addToWishlist({ product_id: userId, tokenData }));
          setIsWishlist(true);
        }

        // Toggle the saved state
        setSaved(!isProductInWishlist);
      } catch (error) {
        console.log(error);
      }
    } else {
      navigation.navigate('LoginCustomeNavigation');
      Alert.alert(
        'Please login',
        'You need to login to save items to your wishlist',
      );
    }
  };

  // useEffect(() => {
  //   if (items.Wishlist) {
  //     const itemIdList = items.Wishlist?.map(item => ({ id: item }));
  //     const itemIdListids = new Set(itemIdList.map(item => Number(item.id)));

  //   }
  // })
  return (
    <GestureHandlerRootView >
      <CustomStatusBar color={globalColors.headingBackground}></CustomStatusBar>
      {/* <Icon
        name={'arrow-left'}
        size={25}
        color="black"
        style={{
          position:'absolute',
          left: 10,
          top:3,
          zIndex: 10,
        }}
        onPress={() => navigation.goBack()}></Icon> */}

      <SafeAreaView style={{ marginTop: hp('-7%') }}>
        <View>
          {loading ? (
            // <View style={styles.container}>
            <SkeletonLoaderProductDetails />
          ) : (
            // </View>
            <>
              <View>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  ref={scrollViewRef}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <MyCarousel views={responseData?.images} />
                  </View>

                  <View style={styles.custcontainer}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View>
                        <Text
                          style={{
                            color: '#444444',
                            fontWeight: '500',
                            marginBottom: 2,
                          }}>
                          {responseData?.name}
                        </Text>
                      </View>
                      <View>
                        {/* {saved?<Image source={SaveICon} onPress={() => setSaved(false)}/>:<Image source={NotSaveICon} onPress={() => setSaved(true)} />} */}
                        <TouchableOpacity onPress={toggleSaved}>
                          {isWishlist ? (
                            <Image source={Images.saveIconFill} />
                          ) : (
                            <Image
                              source={Images.saveIconUnFill}
                              style={styles.iconContainer}
                            />
                          )}
                        </TouchableOpacity>
                      </View>
                    </View>
                    <Text style={styles.custAEDtext}>
                      AED {responseData?.price}
                    </Text>
                    <View
                      style={{ borderBottomWidth: 1, borderColor: '#D8D8D8' }}>
                      <Text style={{ color: '#86D973', marginBottom: '10' }}>
                        {responseData?.stock_status}
                      </Text>
                    </View>

                    {responseData?.type !== 'simple' ? (
                      <Accordion
                        Size={size}
                        Color={color}
                        Description={responseData?.description}
                        setChange={setChange}
                        changeColor={changeColor.toUpperCase()}
                        changeSize={changeSize}
                        setChangeSize={setChangeSize}
                      />
                    ) : (
                      <Accordion
                        Size={[]}
                        Color={[]}
                        Description={responseData?.description}
                        setChange={setChange}
                        changeColor={changeColor}
                        changeSize={changeSize}
                        setChangeSize={setChangeSize}
                      />
                    )}
                    {/* <DummyAccordion attributes={responseData?.attributes}/> */}
                  </View>
                  <View style={{ borderTopWidth: 1, borderColor: '#DBCCC1' }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        marginTop: 20,
                        fontSize: 20,
                        color: '#4B4746',
                        fontFamily: 'Intrepid Regular',
                      }}>
                      The Perfect Partner
                    </Text>
                    <View style={styles.productContainer}>
                      {wishlistrelated
                        ?.map((product, key) => (
                          // console.log("=====related", product),
                          <View key={key}>
                            <TouchableOpacity
                              onPress={() => handleproduct(product?.id)}>
                              <Product
                                key={product?.id}
                                uri={product?.images[0]?.src}
                                name={product?.name}
                                price={product?.price}
                                saved={product?.saved}
                                product_id={product?.id}
                                isWatchList={product?.isWatchList}
                              />
                            </TouchableOpacity>
                          </View>
                        ))
                        .slice(0, 4)}
                    </View>
                  </View>
                </ScrollView>
                <Button
                  stylesofbtn={styles.custbtn}
                  styleoffont={styles.custfontstyle}
                  handlepress={handlepress}
                  name={'Add To Carts'}
                  loading={load}
                />
              </View>
            </>
          )}
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  Imgcontainer: {
    width: wp('100%'),
    height: hp('60%'),
    objectFit: 'cover',
  },
  custcontainer: {
    marginHorizontal: wp('3%'),
    marginTop: hp('-5%'),
  },
  cust_text: {
    fontWeight: '500',
    marginBottom: hp('0.5%'),
  },
  custAEDtext: {
    color: '#858483',
    marginLeft: 5,
    marginTop: 5,
  },
  custbtn: {
    backgroundColor: 'black',
    padding: 5,
    marginHorizontal: 110,
    borderRadius: 5,
    marginVertical: 0,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  custfontstyle: {
    textAlign: 'center',
    color: 'white',
  },
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: -2,
    paddingVertical: wp('1%'),
    // paddingHorizontal: wp('1.5%'),
    marginTop: hp('1%'),
    marginBottom: hp('7%'),
  },
  iconContainer: {
    height: 18,
    width: 15,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: hp('25%'),
  },
  container: {
    marginTop: '50%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
