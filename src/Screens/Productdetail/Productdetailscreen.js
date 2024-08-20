import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Pressable,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Accordion from '../../Components/Accordion';
import Button from '../../Components/Button';
import MyCarousel from '../../Components/MyCarousel';
import Product from '../../Components/Product/Product';
import {Images} from '../../Constants';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useRef, useState} from 'react';
import {fetchById} from '../../Redux/Slice/SingleProductslice';
import {PartnerPerfect} from '../../Redux/Slice/perfectpatnerSlice';
import {addToCart} from '../../Redux/Slice/car_slice/addtocart';
import {getToken} from '../../Utils/localstorage';
import {useNavigation} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import CustomStatusBar from '../../Components/StatusBar/CustomSatusBar';
import {globalColors} from '../../Assets/Theme/globalColors';
import {
  addToWishlist,
  fetchWishlist,
  removeFromWishlist,
} from '../../Redux/Slice/wishlistSlice';
import SkeletonLoaderProductDetails from '../../Components/Loader/SkeletonLoaderProductDetails';
import {
  certifiedIcon,
  deliveryIcon,
  minusIcon,
  NoImg,
  plusIcon,
  returnExchangeIcon,
  shareIcon,
} from '../../Constants/Icons';
import ProductRelated from '../../Components/Product/ProductRelated';
import ButtonAddToCart from '../../Components/ButtonAddToCart';

export default function Productdetailscreen({route}) {
  const scrollViewRef = useRef();
  const navigation = useNavigation();
  const {userId, isWatchList} = route?.params;
  const dispatch = useDispatch();
  const {loading, error, responseData} = useSelector(state => state?.getById);
  const {errormessage, partner} = useSelector(state => state?.PatnerGet);
  const {items} = useSelector(state => state.wishlist);
  const [changeColor, setChange] = useState('');
  const [saved, setSaved] = useState(isWatchList);
  const [id, setId] = useState(userId);
  const [changeSize, setChangeSize] = useState('');
  const [load, setLoding] = useState(false);
  const [wishlistrelated, setWishlistRelated] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [wishlistId, setWishListId] = useState();
  const [isWishlist, setIsWishlist] = useState(isWatchList);
  const [quantity, setQuantity] = useState(1);

  const initialText =
    'Choose your favorites garment size that is two inches more than your body measurement. e.g:- for bust size -36 inch, select garment size - Medium (M). There might be slight variation in the actual color of the product due to different screen';
  const additionalText =
    " Here is the additional information that appears when 'Read More' is clicked. It can include more details about the product, size chart, and other relevant information.";

  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  // Combine initial and additional text based on state
  const displayedText = showMore ? initialText + additionalText : initialText;

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(prevQuantity => (prevQuantity > 0 ? prevQuantity - 1 : 0));
  };
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

    if (isLoggedIn) {
      if (responseData?.type == 'simple' || responseData?.price == '') {
        Alert.alert(
          '',
          'This product does not have a price or  it should be simple type. Please check.',
        );
        setLoding(false);
        return;
      }

      if (changeSize == '' && changeColor == '') {
        Alert.alert('', 'Make sure you selected size and color');
        setLoding(false);
        return;
      }
      if (!changeSize && size) {
        Alert.alert('', 'Make sure you selected size');
        setLoding(false);
        return;
      }
      // if (!changeColor && color) {
      //   Alert.alert('', 'Make sure you selected color');
      //   setLoding(false);
      //   return;
      // }
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
    scrollViewRef.current.scrollTo({y: 0, animated: true});
    setId(id);
  };

  useEffect(() => {
    if (items.Wishlist) {
      const itemIdList = items.Wishlist?.map(item => ({id: item}));
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
        if (isWishlist) {
          // await dispatch(fetchWishlist(tokenData));
          dispatch(removeFromWishlist({product_id: userId, tokenData}));
          dispatch(fetchWishlist(tokenData));
          setIsWishlist(false);
        } else {
          // dispatch(fetchWishlist(tokenData));

          dispatch(addToWishlist({product_id: userId, tokenData}));
          dispatch(fetchWishlist(tokenData));
          setIsWishlist(true);
        }

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

  // console.log(changeColor);

  return (
    <GestureHandlerRootView>
      <CustomStatusBar color={globalColors.headingBackground}></CustomStatusBar>

      <SafeAreaView style={{marginTop: hp('-7%')}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {loading ? (
            <SkeletonLoaderProductDetails />
          ) : (
            <>
              <View style={{backgroundColor: globalColors.white}}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  ref={scrollViewRef}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {responseData?.images.length > 0 ? (
                      <MyCarousel views={responseData?.images} />
                    ) : (
                      <Image
                        source={NoImg}
                        style={styles.Imgcontainer}
                        resizeMode="cover"></Image>
                    )}
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
                            color: globalColors.black,
                            fontWeight: '400',
                            fontSize: 22,
                            marginBottom: 2,
                          }}>
                          {responseData?.name}
                        </Text>
                      </View>
                      <View
                        style={{
                          position: 'relative',
                          flexDirection: 'row',
                          top: hp(-'50'),
                          // alignContent: 'flex-end',
                        }}>
                        <View style={{marginRight: wp('2%')}}>
                          <TouchableOpacity onPress={toggleSaved}>
                            {isWishlist ? (
                              <Image source={Images.saveIconFill} />
                            ) : (
                              <Image source={Images.saveIconUnFill} />
                            )}
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            backgroundColor: 'white',
                            borderRadius: 50,
                            padding: 5,
                            overflow: 'hidden',
                          }}>
                          <TouchableOpacity>
                            {/* <Text>sdfds</Text> */}
                            <Image
                              style={{
                                width: 21,
                                height: 21,
                                resizeMode: 'contain',
                              }}
                              source={shareIcon}></Image>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.custAEDtext}>
                        AED {responseData?.price}
                      </Text>
                      <Text style={styles.custAEDregularPrice}>
                        AED {responseData?.regular_price}
                      </Text>
                    </View>
                    <View
                    // style={{
                    //   borderBottomWidth: 1,
                    //   borderColor: globalColors.lightGray,
                    // }}
                    >
                      <Text
                        style={{
                          color: globalColors.lightGreen,
                          marginBottom: 10,
                        }}>
                        {responseData?.stock_status}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={toggleShowMore}>
                      <Text style={styles.descrpation}>
                        {displayedText}

                        <Text style={styles.readMore}>
                          {showMore ? ' Read Less' : ' Read More'}
                        </Text>
                      </Text>
                    </TouchableOpacity>
                    {/* {responseData?.type == 'variable' ? (
                      <Accordion
                        Size={size}
                        Color={color}
                        // Description={responseData?.description}
                        setChange={setChange}
                        changeColor={changeColor.toUpperCase()}
                        changeSize={changeSize}
                        setChangeSize={setChangeSize}
                      />
                    ) : (
                      <Accordion
                        Size={[]}
                        Color={[]}
                        // Description={responseData?.description}
                        setChange={setChange}
                        changeColor={changeColor}
                        changeSize={changeSize}
                        setChangeSize={setChangeSize}
                      />
                    )} */}
                    <View
                      style={{
                        backgroundColor: globalColors.headingBackground,
                        flexDirection: 'row',
                        borderRadius: 10,
                        paddingTop: hp('2%'),
                        padding: hp('2%'),
                        paddingBottom: hp('2%'),
                        flex: 1,
                        justifyContent: 'space-between',
                      }}>
                      <View style={{alignItems: 'center'}}>
                        <Image source={deliveryIcon}></Image>
                        <View
                          style={{
                            flexDirection: 'row',
                            gap: 1,
                            marginTop: hp('2.5%'),
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                              alignItems: 'center',
                              fontFamily: '400',
                              fontFamily: 'Product Sans',
                            }}>
                            Free Delivery
                          </Text>
                          <View
                            style={{
                              width: 1,
                              height: '100%',
                              backgroundColor: globalColors.lightPink,
                              left: 10,
                              top: 0,
                            }}
                          />
                        </View>
                      </View>
                      <View style={{alignItems: 'center'}}>
                        <Image source={returnExchangeIcon}></Image>
                        <View
                          style={{
                            flexDirection: 'row',
                            gap: 1,
                            marginTop: hp('2%'),
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                              textAlign: 'center',
                              fontFamily: '400',
                              fontFamily: 'Product Sans',
                            }}>
                            7 Days return & exchange
                          </Text>
                          <View
                            style={{
                              width: 1,
                              height: '100%',
                              backgroundColor: globalColors.lightPink,
                              left: 10,
                              top: 0,
                            }}
                          />
                        </View>
                      </View>
                      <View style={{alignItems: 'center'}}>
                        <Image source={certifiedIcon}></Image>
                        <View style={{marginTop: hp('2%')}}>
                          <Text
                            style={{
                              fontSize: 14,
                              alignItems: 'center',
                              fontFamily: '400',
                              fontFamily: 'Product Sans',
                            }}>
                            Top Brand
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={{
                        textAlign: 'left',
                        marginTop: 20,
                        marginLeft: wp('4%'),
                        fontSize: 20,
                        color: globalColors.black,
                        fontWeight: '700',
                        fontFamily: 'Product Sans',
                      }}>
                      Related Products
                    </Text>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      style={styles.productContainer}>
                      {wishlistrelated
                        ?.map((product, key) => (
                          <View key={key} style={{paddingLeft: 10}}>
                            <TouchableOpacity
                              onPress={() => handleproduct(product?.id)}>
                              <ProductRelated
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
                        .slice(0, 6)}
                    </ScrollView>
                  </View>
                </ScrollView>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundColor: globalColors.headingBackground,
                  }}>
                  <View
                    style={{
                      alignItems: 'flex-end',

                      height: hp('12%'),
                      justifyContent: 'center',
                    }}>
                    <ButtonAddToCart
                      stylesofbtn={styles.custbtn}
                      styleoffont={styles.custfontstyle}
                      handlepress={handlepress}
                      image={'ds'}
                      name={'Add To Cart'}
                      loading={load}
                    />
                  </View>
                  <View
                    style={{
                      backgroundColor: globalColors.headingBackground,
                      paddingHorizontal: 10,
                      position: 'absolute',
                      // bottom: -1,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Pressable onPress={handleDecrement}>
                        <Image source={minusIcon}></Image>
                      </Pressable>
                      <View>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: '700',
                            color: globalColors.darkGray,
                            fontFamily: 'Product Sans',
                            marginHorizontal: 20,
                          }}>
                          {/* {Item.quantity} */}
                          {quantity}
                        </Text>
                      </View>
                      <Pressable onPress={handleIncrement}>
                        <Image source={plusIcon}></Image>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  Imgcontainer: {
    width: wp('100%'),
    height: hp('50%'),
    objectFit: 'cover',
    marginBottom: hp('8%'),
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
    color: globalColors.black,
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 5,
    marginTop: 5,
  },
  descrpation: {
    color: globalColors.black,
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Product Sans',
    marginLeft: 5,
    marginTop: 5,
    marginBottom: hp('4%'),
  },
  custAEDregularPrice: {
    color: globalColors.lightWhite,
    textDecorationLine: 'line-through',
    fontSize: 18,
    fontWeight: '400',
    marginLeft: 5,
    marginTop: 5,
  },
  custbtn: {
    backgroundColor: globalColors.black,
    padding: hp('2%'),
    width: wp('55%'),
    // marginHorizontal: 110,
    borderRadius: 5,
    // marginVertical: 0,
    // position: 'absolute',
    // bottom: 20,
    // left: 20,
    right: 20,
  },
  custfontstyle: {
    textAlign: 'center',
    marginLeft: 10,
    fontSize: 16,
    color: globalColors.white,
    fontFamily: 'Product Sans',
    fontWeight: '700',
  },
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'center',
    gap: 5,
    paddingVertical: wp('1%'),
    marginTop: hp('1%'),
    // marginBottom: hp('7%'),
  },
  iconContainer: {
    height: 18,
    width: 15,
  },
  readMore: {
    color: globalColors.black,
    fontSize: 16,
    fontWeight: '500',
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
  delivarySection: {
    backgroundColor: globalColors.headingBackground,
  },
});
