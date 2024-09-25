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
  Platform,
} from 'react-native';
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
import { addToCart } from '../../Redux/Slice/car_slice/addtocart';
import { getToken } from '../../Utils/localstorage';
import { useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomStatusBar from '../../Components/StatusBar/CustomSatusBar';
import { globalColors } from '../../Assets/Theme/globalColors';
import { Linking } from 'react-native';

import {
  addToWishlist,
  fetchWishlist,
  removeFromWishlist,
} from '../../Redux/Slice/wishlistSlice';
import SkeletonLoaderProductDetails from '../../Components/Loader/SkeletonLoaderProductDetails';
import {

  minusIcon,
  NoImg,
  plusIcon,
  shareIcon,
  shareIcon3x,
  tabbyLogo,
  tamara,
} from '../../Constants/Icons';
import ProductRelated from '../../Components/Product/ProductRelated';
import ButtonAddToCart from '../../Components/ButtonAddToCart';
import Icon from 'react-native-vector-icons/Ionicons';
import TabbyModal from '../../Components/Model/TabbyModal';
import TamaraModal from '../../Components/Model/TamaraModal';
import { Share } from 'react-native';

export default function Productdetailscreen({ route }) {
  // console.log("Route--------->", route)
  const scrollViewRef = useRef();
  const navigation = useNavigation();
  const { userId, isWatchList } = route?.params;
  const dispatch = useDispatch();
  const { loading, error, responseData } = useSelector(state => state?.getById);
  const { errormessage, partner } = useSelector(state => state?.PatnerGet);
  const { items } = useSelector(state => state.wishlist);
  const [changeColor, setChange] = useState('');
  const [saved, setSaved] = useState(isWatchList);
  const [id, setId] = useState(userId);
  const [changeSize, setChangeSize] = useState('');
  const [load, setLoding] = useState(false);
  const [wishlistrelated, setWishlistRelated] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [color, setColor] = useState([]);
  const [colorMeta, setColorMeta] = useState('');
  const [size, setSize] = useState([]);
  const [wishlistId, setWishListId] = useState();
  const [isWishlist, setIsWishlist] = useState(isWatchList);
  const [quantity, setQuantity] = useState(1);
  const [priceToTabby, setPriceTabby] = useState('')

  //modal
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };
  const initialText =
    'Choose your favorites garment size that is two inches more than your body measurement. e.g:- for bust size -36 inch, select garment size - Medium (M). There might be slight variation in the actual color of the product due to different screen';
  const additionalText =
    " Here is the additional information that appears when 'Read More' is clicked. It can include more details about the product, size chart, and other relevant information.";

  const [showMore, setShowMore] = useState(true);
  const [active, setInActive] = useState(true);


  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const activeInActiveHandler = () => {
    setInActive(!active)
  }

  const removeHtmlTags = (html) => {
    return html?.replace(/<\/?[^>]+(>|$)/g, '')
  }


  // Combine initial and additional text based on state
  const displayedText = showMore ? initialText + additionalText : initialText;

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handlepressTabby = () => {
    const url = `https://checkout.tabby.ai/promos/product-page/installments/en/?price=${responseData?.price}&currency=AED&merchant_code=AE&public_key=pk_xyz`;

    navigation.navigate('WebViewScreen', { url });
  };

  const handlepressTamara = () => {
    // const url = `https://checkout.tabby.ai/promos/product-page/installments/en/?price=${responseData?.price}&currency=AED&merchant_code=AE&public_key=pk_xyz`;
    const url = 'https://cdn.tamara.co/static/faq-en.html';

    navigation.navigate('WebViewScreen', { url });
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
    const metaData = responseData?.meta_data;
    setPriceTabby(responseData?.price / 4)
    const hardwareMeta = metaData?.find(meta => meta?.key === 'Hardware');
    setColorMeta(hardwareMeta?.value);
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
      // if (responseData?.type == 'simple' || responseData?.price == '') {
      //   Alert.alert(
      //     '',
      //     'This product does not have a price or  it should be simple type. Please check.',
      //   );
      //   setLoding(false);
      //   return;
      // }

      // if (changeSize == '' && changeColor == '') {
      //   Alert.alert('', 'Make sure you selected size and color');
      //   setLoding(false);
      //   return;
      // }
      // if (!changeSize && size) {
      //   Alert.alert('', 'Make sure you selected size');
      //   setLoding(false);
      //   return;
      // }
      // if (!changeColor && color) {
      //   Alert.alert('', 'Make sure you selected color');
      //   setLoding(false);
      //   return;
      // }
      const requiresSize = size && size.length > 0;

      // if (requiresSize && !changeSize) {
      //   Alert.alert('', 'Please select a size.');
      //   setLoding(false);
      //   return;
      // }
      dispatch(addToCart(data)).then(action => {
        if (addToCart.fulfilled.match(action)) {
          setLoding(false);
          setChange('');
          setChangeSize('');
          // navigation.navigate('Cart');
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
        if (isWishlist) {
          // await dispatch(fetchWishlist(tokenData));
          dispatch(removeFromWishlist({ product_id: userId, tokenData }));
          dispatch(fetchWishlist(tokenData));
          setIsWishlist(false);
        } else {
          // dispatch(fetchWishlist(tokenData));

          dispatch(addToWishlist({ product_id: userId, tokenData }));
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

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          `https://trustyuae.com/product/${responseData.slug}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  // console.log(changeColor);

  return (
    <GestureHandlerRootView>
      <CustomStatusBar color={globalColors.headingBackground}></CustomStatusBar>

      <SafeAreaView style={{ justifyContent: 'center' }}>
        <View style={{
          marginBottom: responseData?.stock_status === "onbackorder" && responseData?.price > 0 ? hp('8%') : 0,
          marginTop: Platform.OS === 'ios' ? 0 : hp('8%')
        }}>
          {loading ? (
            <SkeletonLoaderProductDetails />
          ) : (
            <>
              <View style={{ backgroundColor: globalColors.white }}>
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

                      <Text
                        style={{
                          color: globalColors.black,
                          fontWeight: '400',
                          fontSize: 22,
                          marginBottom: wp('-6%'),
                          fontFamily: 'Intrepid Regular',
                          // backgroundColor: 'red'

                        }}>
                        {responseData?.name}
                      </Text>


                    </View>
                    <View
                      style={{
                        position: 'relative',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        top: hp('-50%'),
                        // alignContent: 'flex-end',
                        // marginRight: hp('1%'),
                        alignContent: 'flex-end',
                      }}>
                      <View style={{
                        marginRight: wp('2%'),
                        backgroundColor: '#E8E8E8',
                        padding: 7,

                        borderRadius: 50,
                      }}>
                        <TouchableOpacity onPress={toggleSaved}>
                          {isWishlist ? (
                            <Image style={{ width: 26, height: 24 }} source={Images.SaveIconFillTransparant} />
                          ) : (
                            <Image style={{ width: 26, height: 24 }} source={Images.SavaIconUnFillTransparant} />
                          )}
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          backgroundColor: '#E8E8E8',
                          borderRadius: 50,
                          alignSelf: 'center',
                          padding: 7,
                          marginRight: wp('2%'),
                          overflow: 'hidden',
                        }}>
                        <TouchableOpacity onPress={onShare}>
                          {/* <Text>sdfds</Text> */}
                          <Image
                            style={{
                              width: 25,
                              height: 25,
                              resizeMode: 'contain',
                            }}
                            source={shareIcon3x}></Image>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.custAEDtext}>
                        AED {responseData?.price}
                      </Text>
                      <Text
                        style={{
                          color: globalColors.lightWhite,
                          fontSize: 18,
                          fontWeight: '400',
                          marginLeft: 5,
                          marginTop: 5,
                        }}>
                        /
                      </Text>
                      <Text style={styles.custAEDregularPrice}>
                        AED {responseData?.price}
                      </Text>
                    </View>
                    <View
                      style={{
                        borderBottomColor: '#BBBBBB',
                        borderBottomWidth: 2,
                        marginVertical: 10
                      }}>
                    </View>
                    <View>
                      <Text
                        style={{
                          color: '#5546DC',
                          marginBottom: 15,
                          fontSize: 14,
                          fontFamily: 'Intrepid Regular',

                          // color: '#6BB67A'
                        }}>
                        {
                          responseData?.stock_status === "instock"
                            ? "IN STOCK"
                            : responseData?.stock_status === "onbackorder"
                              ? "Pre-Order"
                              : responseData?.stock_status === "outofstock"
                                ? "Out Of Stock"
                                : responseData?.stock_status
                        }
                      </Text>
                    </View>
                    <View style={styles.containerTabby}>
                      <TouchableOpacity onPress={handlepressTabby} style={styles.infoContainer}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', gap: 3 }}>
                          <Text style={styles.paymentInfo}>4 Interest-free payments of <Text style={styles.amount}>AED {priceToTabby}</Text>.
                          </Text>
                          <View style={{ flexDirection: 'row', alignSelf: '' }}>
                            <Text style={styles.details}>No fees. Shariah-compliant.</Text>
                            {/* <TouchableOpacity > */}
                            <Text style={styles.learnMore}> Learn more</Text>
                            {/* </TouchableOpacity> */}
                          </View>
                        </View>
                        <View style={{ flexDirection: 'column', }}>
                          <TouchableOpacity onPress={handlepressTabby}>
                            <Image resizeMode="contain"
                              style={{ width: 60, height: 40 }} source={tabbyLogo}></Image>
                          </TouchableOpacity>

                          <TouchableOpacity>
                            <Image resizeMode="contain"
                              style={{ width: 60, height: 40, marginTop: -10 }} source={tamara}></Image>
                          </TouchableOpacity>

                        </View>
                      </TouchableOpacity>

                    </View>





                    {responseData?.type == 'variable' ? (
                      <Accordion
                        Size={size}
                        Color={color}
                        colorMeta={colorMeta}
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
                        colorMeta={colorMeta}
                        // Description={responseData?.description}
                        setChange={setChange}
                        changeColor={changeColor}
                        changeSize={changeSize}
                        setChangeSize={setChangeSize}
                      />
                    )}

                    {
                      responseData?.description && (
                        <TouchableOpacity style={{
                          backgroundColor: globalColors.headingBackground,
                          borderWidth: 1,
                          borderColor: '#e5e5e5',

                        }} onPress={toggleShowMore}>
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                            <Text style={{
                              color: globalColors.black,
                              fontSize: 16,
                              fontWeight: '600',
                              fontFamily: 'Intrepid Bold',

                              // fontFamily: 'Product Sans',
                            }}>Product details</Text>
                            <View style={{ paddingRight: wp('3.5%') }}>
                              <Icon
                                name={showMore ? 'chevron-down' : 'chevron-up'}
                                size={20}
                                color={'#000'}
                              ></Icon>
                            </View>
                          </View>
                          {showMore &&
                            <Text style={{
                              fontSize: 16,
                              fontWeight: '400',
                              color: globalColors.textColorLogin,
                              fontFamily: 'Intrepid Regular',
                              marginLeft: wp('5%'),
                            }}>
                              {removeHtmlTags(responseData?.description)}


                            </Text>
                          }
                          <View style={styles.custBorder} />

                        </TouchableOpacity>
                      )
                    }



                    <TouchableOpacity style={{
                      backgroundColor: globalColors.headingBackground,
                      borderWidth: 1,
                      borderColor: '#e5e5e5',

                    }} onPress={activeInActiveHandler}>
                      <View style={{
                        flexDirection: 'row',
                        marginTop: wp('1%'),
                        padding: wp('1%'),
                        justifyContent: 'space-between',
                      }}>
                        <Text style={{
                          color: globalColors.black,
                          fontSize: 16,
                          fontWeight: '600',
                          fontFamily: 'Intrepid Bold',
                        }}>Delivery Terms</Text>
                        <View style={{ paddingRight: wp('3.5%') }}>
                          <Icon
                            name={active ? 'chevron-down' : 'chevron-up'}
                            size={20}
                            color={'#000'}
                          ></Icon>
                        </View>
                      </View>
                      {active &&
                        <View style={{
                          flexDirection: 'column',
                          color: globalColors.newTextColor,
                          fontSize: 16,
                          fontWeight: '400',
                          // fontFamily: 'Product Sans',
                          marginLeft: wp('5%'),
                          marginTop: 5,
                        }}>
                          {responseData?.stock_status === "instock" ?
                            <Text style={{
                              // fontFamily: 'Product Sans',
                              fontWeight: '400',
                              fontSize: 16,
                              color: globalColors.textColorLogin,
                              fontFamily: 'Intrepid Regular',

                            }}>-Delivery In the UAE: 1-3 days</Text> :
                            <Text style={{
                              // fontFamily: 'Product Sans',
                              fontWeight: '400',
                              fontSize: 16,
                              color: globalColors.textColorLogin,
                              color: '#555',
                              fontFamily: 'Intrepid Regular',


                            }}>-Delivery within 3-4 weeks in UAE</Text>
                          }

                        </View>
                      }
                      <View style={styles.custBorder} />

                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text
                      style={{
                        textAlign: 'left',
                        marginTop: 20,
                        marginLeft: wp('4%'),
                        fontSize: 18,
                        color: globalColors.black,
                        fontWeight: '700',
                        fontFamily: 'Intrepid-Bold',
                      }}>
                      Related Products
                    </Text>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      style={styles.productContainer}>
                      {wishlistrelated
                        ?.map((product, key) => (
                          <View
                            key={key}
                            style={{
                              paddingHorizontal: wp('1.5%'),
                              justifyContent: 'space-between',
                              flexWrap: 'wrap',
                            }}>
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
              </View>
            </>
          )}

        </View>
        {
          responseData?.price > 0 && responseData?.stock_status === "onbackorder" && (
            <ButtonAddToCart
              stylesofbtn={styles.custbtn}
              styleoffont={styles.custfontstyle}
              handlepress={handlepress}
              image={'ds'}
              name={'Add To Cart'}
              loading={load}
            />
          )
        }
        {/* <ButtonAddToCart
          stylesofbtn={styles.custbtn}
          styleoffont={styles.custfontstyle}
          handlepress={handlepress}
          image={'ds'}
          name={'Add To Cart'}
          loading={load}
        /> */}

      </SafeAreaView >
    </GestureHandlerRootView >
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
    fontFamily: 'Intrepid-Bold',

    fontSize: 18,
    fontWeight: '700',
    marginTop: 5,
  },
  descrpation: {
    color: globalColors.newTextColor,
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Intrepid Regular',
    marginLeft: wp('5%'),
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
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 15,
  },
  custfontstyle: {
    textAlign: 'center',
    color: globalColors.white,
    fontWeight: '700',
    fontFamily: 'Intrepid Regular',
  },
  productContainer: {
    flexDirection: 'row',
    gap: 15,
    paddingVertical: wp('1%'),
    marginTop: hp('1%'),

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
  iconParentContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    paddingVertical: hp('1%'),
  },
  bottomContainerText: {
    fontFamily: 'Product Sans',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  custBorder: {
    marginTop: wp('1%'),
    borderBottomColor: globalColors.lightGray,
    borderBottomWidth: 1,
  },
  containerTabby: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 2,
    backgroundColor: '#f9f5f0',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between'
  },
  paymentInfo: {
    fontSize: 14,
    fontFamily: 'Intrepid Regular',
    color: '#000',
    textAlign: 'left'
  },
  amount: {
    fontWeight: 'bold',
    fontFamily: 'Intrepid-Bold',

    fontSize: 14,
    // flexWrap: 'wrap'
  },
  details: {
    fontSize: 14,
    fontFamily: 'Intrepid Regular',

    color: '#000',
    textAlign: 'left'

  },
  learnMore: {
    fontSize: 14,
    fontFamily: 'Intrepid Regular',
    color: '#000',
  },
  logo: {
    width: 50,
    height: 30,
    marginLeft: 10,
  },
});
