import {
  Image,
  Text,
  View,
  TextInput,
  Alert,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  NoImg,
  deleteImg,
} from '../../Constants/Icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet } from 'react-native';
import Button from '../Button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ViewToCart } from '../../Redux/Slice/car_slice/viewcart';
import { deleteToCart } from '../../Redux/Slice/car_slice/deletecart';
import { getToken, getUserId } from '../../Utils/localstorage';
import { fetchProfile } from '../../Redux/Slice/profileSlice';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { updateToCart } from '../../Redux/Slice/car_slice/updatecart';
import CustomStatusBar from '../StatusBar/CustomSatusBar';
import { globalColors } from '../../Assets/Theme/globalColors';
import SkeletonLoaderOrder from '../Loader/SkeletonLoaderOrder';
import { CouponDetail } from '../../Redux/Slice/car_slice/coupon/couponcart';
import debounce from 'lodash/debounce';
import SelectDropdown from 'react-native-select-dropdown';
import { Images } from '../../Constants';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import ContactUsScreen from '../Model/ContactUsScreen';

const Cart = ({ count, setCount, setOrderDetail, setTotal, scrollViewRef }) => {
  const dispatch = useDispatch();
  const { erros, loading, viewcartdata } = useSelector(
    state => state?.ViewToCart,
  );
  const { coupon, load, iserrors } = useSelector(state => state.CouponDetail);
  const state = useSelector(state => state?.ProductView);
  const { deteltedData } = useSelector(state => state?.DeleteToCart);
  const { isloading } = useSelector(state => state?.OrderToCart);
  const { data } = useSelector(state => state?.profile);
  const [cartData, setCartData] = useState([]);
  const [customerid, setCustomerID] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();
  const [discount, setDiscount] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isWishlist, setIsWishlist] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleModal = () => {
    setModalVisible(true);

  }
  const closeModal = () => {
    setModalVisible(false);
  };
  const toggleInputField = () => {
    setIsInputVisible(!isInputVisible);
  };

  useEffect(() => {
    const fetch = async () => {
      let userid = await getUserId();
      const token = await getToken();
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      dispatch(fetchProfile(userid));

      setCustomerID(userid);
    };
    fetch();
  }, [dispatch]);

  useEffect(() => {
    setCartData(viewcartdata?.cart_items);
  }, [viewcartdata, deteltedData]);

  const handleRemove = useCallback(
    item => {
      const data = {
        product_id: item.product_id,
        variation_id: item.variation_id,
      };

      Alert.alert('Are You Sure', 'This Item Should Remove from Cart', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            dispatch(deleteToCart(data));
            setCartData(viewcartdata?.cart_items);
          },
        },
      ]);
    },
    [viewcartdata],
  );

  const handleRemoveItem = item => {
    if (isLoggedIn) {
      setSelectedItem(item.key);
    } else {
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
  const handleOutsideClick = () => {
    setSelectedItem(null); // Reset translateX by deselecting the item
  };
  const debouncedUpdateCart = useCallback(
    debounce(async selectedItem => {
      await dispatch(
        updateToCart({
          product_id: selectedItem.product_id,
          variation_id: selectedItem.variation_id,
          quantity: selectedItem.quantity,
        }),
      );
      await dispatch(ViewToCart());
    }, 200),
    [],
  );

  const handleIncrease = useCallback(
    key => {
      const updatedCart = cartData?.map(item => {
        if (item.key === key) {
          const updatedItem = {
            ...item,
            quantity: item.quantity + 1,
          };
          debouncedUpdateCart(updatedItem);
          return updatedItem;
        }
        return item;
      });
      setCartData(updatedCart);
    },
    [cartData, debouncedUpdateCart],
  );

  const handleDecrease = useCallback(
    key => {
      const updatedCart = cartData?.map(item => {
        if (item.key === key && item.quantity > 1) {
          const updatedItem = {
            ...item,
            quantity: item.quantity - 1,
          };
          debouncedUpdateCart(updatedItem);
          return updatedItem;
        }
        return item;
      });
      setCartData(updatedCart);
    },
    [cartData, debouncedUpdateCart],
  );

  const update = cartData?.map(item => ({
    ...item,
    total_tax: parseFloat(item.tax) * item.quantity,
    total: item.product_price * item.quantity,
  }));

  const totalSum = update?.reduce(
    (accumulator, currentItem) => accumulator + currentItem.total,
    0,
  );

  const totaltax = update?.reduce(
    (accumulator, currentItem) => accumulator + currentItem.total_tax,
    0,
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(ViewToCart());
    }, [deteltedData]),
  );

  const product = cartData?.map(item => ({
    product_id: item.product_id,
    quantity: item.quantity,
  }));

  const handleCheckout = () => {
    if (isLoggedIn) {
      if (cartData?.length > 0) {
        setOrderDetail(cartData);
        setTotal(totalSum);
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
        setCount(count + 1);
      } else {
        Toast.show({
          type: 'info',
          text1: 'Please add product',
          position: 'bottom',
          visibilityTime: 1000,
        });
      }
    } else {
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

  const handlepress = () => {
    const payload = {
      coupon_code: discount,
    };

    dispatch(CouponDetail(payload)).then(response => {
      if (response?.payload?.success) {
        if (response?.payload?.success) {
          dispatch(ViewToCart());
          Toast.show({
            type: 'success',
            text1: response?.payload?.message,
            position: 'bottom',
            visibilityTime: 3000,
          });
        } else {
          Toast.show({
            type: 'error',
            text1: response?.payload?.message,
            position: 'bottom',
            visibilityTime: 3000,
          });
        }
      } else {
        Toast.show({
          type: 'error',
          text1: response?.payload?.message,
          position: 'bottom',
          visibilityTime: 3000,
        });
      }
    });
    setDiscount('');
  };

  const extractProductName = str => {
    const parts = str.split(' - ');
    return parts[0].trim();
  };

  return (
    <GestureHandlerRootView >
      <TouchableWithoutFeedback onPress={handleOutsideClick}>
        <SafeAreaView style={{
          marginBottom: hp('4%'), height: hp('85%'),
        }}>
          <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>
            <CustomStatusBar color={globalColors.headingBackground}></CustomStatusBar>

            <View style={styles.container}>
              <Text style={styles.custText}>
                You have {viewcartdata?.cart_count} items in your cart
              </Text>

              {
                viewcartdata?.cart_count ? <View style={styles.custborder} /> : ''
              }


              {loading ? (
                <View style={{ padding: 10 }}>
                  <SkeletonLoaderOrder count={1} />
                </View>
              ) : (
                <View>
                  {cartData?.map(Item => (
                    <PanGestureHandler
                      onGestureEvent={({ nativeEvent }) => {
                        const translationX = nativeEvent.translationX;
                        if (translationX < -30) {
                          // Swiped left, show the Wishlist and Close button
                          setSelectedItem(Item.key);
                        } else if (translationX > 30) {
                          setSelectedItem(null);
                        }
                      }}
                    >
                      <View
                        style={{
                          marginVertical: 15,
                          flexDirection: 'row',
                          gap: wp('1.5%'),
                          position: 'relative',
                          transform: [{ translateX: selectedItem === Item.key ? wp('-15%') : 0 }],
                          transition: 'transform 0.3s ease',
                        }}>

                        <Icon
                          name={'close'}
                          size={20}
                          color="#C3BEBA"
                          style={{
                            position: 'absolute',
                            right: 0,
                          }}
                          onPress={() => handleRemoveItem(Item)}></Icon>

                        <View>
                          {Item.product_image ? (
                            <Image
                              source={{ uri: Item?.product_image }}
                              style={styles.imageStyle}
                            />
                          ) : (
                            <Image
                              source={NoImg}
                              style={styles.imageStyle}
                              resizeMode="contain"
                            />
                          )}
                        </View>
                        <View>
                          <Text
                            style={{
                              color: globalColors.black,
                              fontFamily: 'Intrepid Bold',
                              fontWeight: '500',
                              fontSize: 16,
                              width: wp('42%'),
                              marginBottom: wp('5%'),
                              fontWeight: 'bold',
                            }}>
                            {/* {Item.product_name} */}
                            {extractProductName(Item?.product_name)}
                          </Text>


                          {Item.mod_attributes.color ? (
                            <Text
                              style={{
                                marginVertical: 3,
                                color: globalColors.cartProductTextColor,
                                fontFamily: 'Intrepid Regular',
                                fontSize: 14,
                                fontWeight: '400',
                              }}>
                              Color :{' '}
                              <Text style={{ color: globalColors.black }}>
                                {Item?.mod_attributes?.color}
                              </Text>
                            </Text>
                          ) : (
                            ''
                          )}

                          {Item.mod_attributes.size ? (
                            <Text
                              style={{
                                color: globalColors.cartProductTextColor,
                                fontFamily: 'Intrepid Regular',
                              }}>
                              Size :{' '}
                              <Text style={{ color: globalColors.black }}>
                                {Item?.mod_attributes?.size}
                              </Text>
                            </Text>
                          ) : (
                            <View style={{ marginTop: wp('1%') }} />
                          )}
                          <View
                            style={{
                              // backgroundColor: globalColors.white,
                              paddingVertical: 2,
                              // position: 'absolute',
                              bottom: -8,
                              alignItems: 'center',
                              justifyContent: 'center',
                              right: 0,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <View style={{
                                flexDirection: 'row',
                                borderRadius: 7,
                                backgroundColor: globalColors.white,
                                padding: 5
                              }}>
                                <View>
                                  <Text
                                    style={{
                                      fontSize: 18,
                                      color: globalColors.darkGray,
                                      // marginLeft: 17,
                                    }}
                                    onPress={() => handleDecrease(Item.key)}>
                                    <Icon name={'chevron-down'}
                                      size={25}
                                      color="black"></Icon>
                                  </Text>
                                </View>
                                <View>
                                  <Text
                                    style={{
                                      fontSize: 18,
                                      color: globalColors.lightgold,
                                      fontFamily: 'Intrepid Regular',
                                      marginHorizontal: wp('1%'),
                                      padding: 4,
                                      backgroundColor: globalColors.white,
                                    }}>
                                    {Item.quantity}
                                  </Text>
                                </View>
                                <View>
                                  <Text
                                    style={{
                                      fontSize: 18,
                                      color: globalColors.darkGray,
                                      // marginRight: 7,
                                    }}
                                    onPress={() => handleIncrease(Item.key)}>
                                    <Icon name={'chevron-up'}
                                      size={25}
                                      color="black"></Icon>
                                  </Text>
                                </View>
                              </View>
                              <Text
                                style={{
                                  // marginVertical: wp('4%'),
                                  // marginTop: wp('4%'),
                                  color: globalColors.black,
                                  fontFamily: 'Intrepid Bold',
                                  paddingLeft: wp('5%'),
                                  fontSize: 16,
                                  fontWeight: '700',
                                }}>
                                {Item.product_price} AED
                              </Text>
                            </View>
                          </View>

                        </View>
                        {selectedItem === Item.key && (
                          <View style={{ width: '100%', height: '100%', flexDirection: 'row' }}>
                            <View
                              style={{
                                // width: '12%',
                                backgroundColor: '#D6852A',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderTopLeftRadius: 10,
                                borderBottomLeftRadius: 10,
                              }}>
                              {isWishlist ? (
                                <Pressable onPress={toggleSaved}>
                                  <Image source={Images.SaveIconFillTransparant}
                                    style={{ width: "55%", height: "20%", tintColor: "red", top: -4 }} />
                                  <Text
                                    style={{
                                      fontSize: 8,
                                      fontFamily: 'Intrepid Regular',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      color: 'black',
                                    }}>
                                    Remove
                                  </Text>
                                </Pressable>
                              ) : (
                                <View style={{ width: wp('10%'), alignItems: 'center' }}>
                                  <Image source={Images.SavaIconUnFillTransparant}
                                    style={{
                                      width: wp('5.5%'),
                                      height: wp("5%"),
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      tintColor: "white",
                                      marginTop: wp('2%'),
                                    }} />
                                  <View style={{ alignItems: 'center', }}>
                                    <Text style={{
                                      fontSize: 8,

                                      fontFamily: 'Intrepid Regular',
                                      alignSelf: 'center',
                                      marginTop: 3,
                                      color: globalColors.white
                                    }}>
                                      Add To {"\n"}
                                      Wishlist
                                    </Text>
                                  </View>
                                </View>

                              )}
                            </View>

                            <TouchableOpacity
                              style={{
                                width: '12%',
                                backgroundColor: globalColors.black,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderTopRightRadius: 10,
                                borderBottomRightRadius: 10,
                              }}
                              onPress={() => handleRemove(Item)}>
                              <Icon
                                name={'close'}
                                size={30}
                                color="white"
                                style={{
                                  // position: 'absolute',
                                  right: 0,
                                }}></Icon>
                              <Text
                                style={{
                                  fontSize: 8,
                                  fontFamily: 'Intrepid Regular',
                                  color: globalColors.white,
                                }}>
                                Remove
                              </Text>
                            </TouchableOpacity>
                          </View>




                        )}

                      </View>
                    </PanGestureHandler>

                  ))}
                  <View style={styles.custborder} />
                </View>
              )
              }

            </View>
            <View
              style={{
                backgroundColor: globalColors.headingBackground,

              }}>

              <View style={{ backgroundColor: 'white' }}>
                <View style={{
                  marginHorizontal: wp('5%'),
                  marginTop: hp('2%'),
                  paddingLeft: wp('4%'),
                  paddingRight: wp('4%'),
                }}>
                  <TouchableOpacity
                    style={{ flexDirection: 'row', justifyContent: 'space-between', }}
                    onPress={toggleInputField}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '400',
                        color: globalColors.black,
                        fontFamily: 'Intrepid Regular',
                      }}>
                      Add a Promo code
                    </Text>
                    <Text style={styles.toggleIcon}>
                      {isInputVisible ? '-' : '+'}
                    </Text>
                  </TouchableOpacity>

                  {/* Input Field for Promo Code */}
                  {isInputVisible && (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: globalColors.headingBackground,
                        marginTop: 10,
                        borderWidth: 1,
                        borderColor: '#ddd',
                        padding: 5,
                        borderRadius: 5,
                      }}>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter Promo code"
                        placeholderTextColor={globalColors.textColorLogin}
                        value={discount}
                        onChangeText={text => setDiscount(text)}
                      />
                      <TouchableOpacity
                        style={styles.applyButton}
                        onPress={handlepress}>
                        <Text style={styles.applyButtonText}>APPLY</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                <View
                  style={{
                    marginTop: hp('2%'),
                  }}>
                  <View style={{
                    borderWidth: 0.8,
                    width: '92%',
                    alignSelf: 'center',

                    // marginTop: hp('1%'),
                    borderColor: globalColors.inputBorder,
                  }} />
                </View>
              </View>

              <View
                style={{
                  marginTop: hp('3%'),
                  paddingLeft: wp('4%'),
                  paddingRight: wp('4%'),
                  // marginBottom: hp('5%'),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.custText}>SUBTOTAL</Text>
                  <Text
                    style={[styles.custText, { color: globalColors.lightgold }]}>
                    {totalSum} AED
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.custText}>TOTAL </Text>
                  <Text
                    style={[styles.custText, { color: globalColors.lightgold }]}>
                    {viewcartdata?.discount_sub_total} AED
                  </Text>
                </View>
              </View>
              <View style={{
                paddingLeft: wp('4%'),
                paddingRight: wp('4%'),
                borderWidth: 0.8,
                width: '92%',
                alignSelf: 'center',

                // marginTop: hp('1%'),
                borderColor: globalColors.inputBorder,
              }} />

              <View style={{
                paddingLeft: wp('4%'),
                paddingRight: wp('4%'),
              }}>
                <Text style={styles.subHeading}>Need help ?</Text>
                <Text style={styles.contactInfo}>Get in touch with our global coustmer service team</Text>
                <View style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: wp('1%')
                }}>
                  <Button
                    name={'CONTACT US'}
                    stylesofbtn={styles.custcontactusbtn}
                    styleoffont={styles.custcontactfontstyle}
                    handlepress={handleModal}

                  ></Button>
                </View>

              </View>

            </View>
          </ScrollView>
          <ContactUsScreen
            visible={modalVisible}
            onClose={closeModal}
          >
          </ContactUsScreen>

        </SafeAreaView>

      </TouchableWithoutFeedback>



    </GestureHandlerRootView >
  );
};

export default Cart;

const styles = StyleSheet.create({
  imageStyle: {
    height: 120,
    borderRadius: 5,
    width: 130,
  },
  container: {
    marginHorizontal: wp('5%'),
    marginTop: hp('2%'),
    // height: hp('100%')
  },
  custText: {
    color: globalColors.black,
    fontSize: 16,
    fontWeight: '400',
    marginBottom: hp('2%'),
    fontFamily: 'Intrepid Regular',
  },
  custborder: {
    borderWidth: 0.8,
    // marginTop: hp('1%'),
    borderColor: globalColors.inputBorder,
  },
  custInput: {
    fontFamily: 'Product Sans',
    backgroundColor: globalColors.white,
    borderWidth: 1,
    borderColor: globalColors.gray,
    paddingHorizontal: 20,
    width: wp('40%'),
    borderRadius: 5,
    paddingVertical: 8,
  },
  custbtn: {
    backgroundColor: globalColors.headingBackground,
    padding: 7,
    borderWidth: 2,
    padding: 10,
    borderColor: globalColors.lightgold,
    borderRadius: 5,
  },
  custfontstyle: {
    color: globalColors.white,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Product Sans',
  },
  custmargin: {
    marginBottom: 10,
  },
  custcheckoutbtn: {
    backgroundColor: globalColors.black,
    padding: 12,
    // marginVertical: 20,
    marginBottom: 25,
    borderRadius: 5,
  },
  infocontanier: {
    flexDirection: 'row',
    backgroundColor: globalColors.headingBackground,
    marginTop: hp('2%'),
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    alignContent: 'center',
  },
  inputfield: {
    backgroundColor: globalColors.white,
    width: '100%',
    fontFamily: 'Product Sans',
    fontSize: 14,
    fontWeight: '400',
    padding: hp('3%'),
  },
  createAccountText: {
    textAlign: 'center',
    marginVertical: 20,
    marginHorizontal: 20,
    marginTop: hp('2%'),
    borderWidth: 2,
    padding: 10,
    borderColor: globalColors.lightgold,
    borderRadius: 6,
    fontSize: 16,
    fontWeight: '700',
    color: globalColors.lightgold,
    fontFamily: 'Product Sans',
  },
  dropdownButtonStyle: {
    // height: 50,
    height: hp('6.5%'),
    fontSize: wp('3.1%'),
    backgroundColor: globalColors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: hp('3%'),
    borderColor: globalColors.inputBorder,
    // marginBottom: hp('1.5%'),
  },
  dropdownButtonArrowStyle: {
    fontSize: wp('5%'),
    paddingHorizontal: wp('42%'),
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontFamily: 'Product Sans',

    fontSize: wp('3.1%'),
    fontWeight: '500',
    // color: '#151E26',
  },
  separator: {
    borderWidth: 0.5,
    borderColor: 'rgba(193, 177, 157, 1)',
    alignSelf: 'center',
    // backgroundColor: globalColors.borderColorlogin,
    width: '85%',
  },
  iconParentContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    paddingVertical: hp('3%'),
    alignItems: 'center',
  },
  bottomContainerText: {
    fontFamily: 'Product Sans',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  applyButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  toggleIcon: {
    fontSize: 20,
  },
  subHeading: {
    color: globalColors.black,
    fontWeight: '700',
    fontSize: 18,
    marginVertical: wp('4%')
  },
  contactInfo: {
    fontFamily: 'Intrepid Regular',
    fontSize: 16,
    color: globalColors.cartProductTextColor,
    // marginVertical: wp('2%')
    marginBottom: wp('4%')
  },
  custcontactusbtn: {
    backgroundColor: globalColors.white,
    height: wp('10%'),
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('50%'),
    marginBottom: 25,
    borderRadius: 7,
  },
  custcontactfontstyle: {
    color: globalColors.black,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Product Sans',
  },
});

