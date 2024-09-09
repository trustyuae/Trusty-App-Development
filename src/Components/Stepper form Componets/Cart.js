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
import { NoImg, callIcon, certifiedIcon, deleteImg, deliveryIcon, emailIcon, returnExchangeIcon } from '../../Constants/Icons';
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

const Cart = ({
  count,
  setCount,
  setOrderDetail,
  setTotal,
  scrollViewRef,
}) => {
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
  const [isWishlist, setIsWishlist] = useState(false)
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [promoCode, setPromoCode] = useState('');

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

  const handleRemoveItem = (item) => {
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
    <TouchableWithoutFeedback onPress={handleOutsideClick}>
      <SafeAreaView style={{ marginBottom: hp('4%') }}>
        <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>

          {/* <Icon
        name={'arrow-left'}
        size={25}
        color="black"
        style={{
          position: 'absolute',
          left: 10,
          top: -85,
        }}
        onPress={() => navigation.goBack()}>

      </Icon> */}
          <CustomStatusBar color={globalColors.headingBackground}></CustomStatusBar>

          <View style={styles.container}>
            <Text style={styles.custText}>
              You have {viewcartdata?.cart_count} items in your cart
            </Text>

            <View style={styles.custborder} />

            {loading ? (
              <View style={{ padding: 10 }}>
                <SkeletonLoaderOrder count={1} />
              </View>
            ) : (
              <View>
                {cartData?.map(Item => (
                  <View
                    style={{
                      marginVertical: 15,
                      flexDirection: 'row',
                      gap: 10,
                      position: 'relative',
                      transform: [{ translateX: selectedItem === Item.key ? -40 : 0 }],
                      transition: 'transform 0.3s ease',
                    }}>
                    {/* <Icon
                  name={'delete'}
                  size={20}
                  color="black"
                  style={{
                    position: 'absolute',
                    right: 0,
                  }}
                  onPress={() => handleRemove(Item)}></Icon> */}
                    {/* <Image style={{
                  position: 'absolute',
                  top: hp('7.8%'),
                  right: 0,
                  height: 24,
                  width: 24
                   }} source={deleteImg}></Image> */}

                    <Icon
                      name={'close'}
                      size={20}
                      color="#C3BEBA"
                      style={{
                        position: 'absolute',
                        right: 0,
                      }}
                      onPress={() => handleRemoveItem(Item)}>

                    </Icon>

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
                    <View >
                      <Text
                        style={{
                          color: globalColors.black,
                          fontFamily: 'Product Sans',
                          fontSize: 16,
                          width: wp('42%'),
                          marginBottom: wp('5%'),
                          fontWeight: '500'
                        }}>
                        {/* {Item.product_name} */}
                        {extractProductName(Item?.product_name)}
                      </Text>

                      {/* <Text
                    style={{
                      marginVertical: 3,
                      color: globalColors.cartProductTextColor,
                      fontFamily: 'Product Sans',
                      fontSize: 14,
                      fontWeight: '400'
                    }}>
                    Color :{' '}
                    <Text style={{ color: globalColors.black }}>
                      {Item?.mod_attributes?.color}
                    </Text>
                  </Text> */}
                      {
                        Item.mod_attributes.color ? (<Text
                          style={{
                            marginVertical: 3,
                            color: globalColors.cartProductTextColor,
                            fontFamily: 'Product Sans',
                            fontSize: 14,
                            fontWeight: '400'
                          }}>
                          Color :{' '}
                          <Text style={{ color: globalColors.black }}>
                            {Item?.mod_attributes?.color}
                          </Text>
                        </Text>) : ''
                      }
                      {/* <Text
                    style={{
                      color: globalColors.cartProductTextColor,
                      fontFamily: 'Product Sans',
                    }}>
                    Size :{' '}
                    <Text style={{ color: globalColors.black }}>
                      {Item?.mod_attributes?.size}
                    </Text>
                  </Text> */}
                      {
                        Item.mod_attributes.size ? (
                          <Text
                            style={{
                              color: globalColors.cartProductTextColor,
                              fontFamily: 'Product Sans',
                            }}>
                            Size :{' '}
                            <Text style={{ color: globalColors.black }}>
                              {Item?.mod_attributes?.size}
                            </Text>
                          </Text>
                        ) : <View style={{ marginTop: wp('1%') }} />
                      }
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
                          <View>
                            <Text
                              style={{
                                fontSize: 18,
                                color: globalColors.darkGray,
                                // marginLeft: 17,
                              }}
                              onPress={() => handleDecrease(Item.key)}>
                              -
                            </Text>
                          </View>
                          <View>
                            <Text
                              style={{
                                fontSize: 18,
                                color: globalColors.darkGray,
                                fontFamily: 'Intrepid Regular',
                                marginHorizontal: 20,
                                padding: 4,
                                backgroundColor: globalColors.white
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
                              +
                            </Text>
                          </View>
                          <Text
                            style={{
                              // marginVertical: wp('4%'),
                              // marginTop: wp('4%'),
                              color: globalColors.black,
                              fontFamily: 'Product Sans',
                              paddingLeft: wp('4%'),
                              fontSize: 16,
                              fontWeight: '700'
                            }}>
                            {Item.product_price} AED
                          </Text>
                        </View>

                      </View>


                      {/* <View
                    style={{
                      backgroundColor: globalColors.white,
                      paddingVertical: 2,
                      // position: 'absolute',
                      bottom: -8,
                      // right: 0,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        // backgroundColor: 'red',
                        // width: 30
                      }}>
                      <View >
                        <Text
                          style={{
                            fontSize: 20,
                            color: globalColors.darkGray,
                            marginLeft: 7,
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
                            fontSize: 20,
                            color: globalColors.darkGray,
                            fontFamily: 'Product Sans',

                            marginHorizontal: 30,
                          }}>
                          {Item.quantity}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontSize: 20,
                            color: globalColors.darkGray,
                            marginRight: 7,
                          }}
                          onPress={() => handleIncrease(Item.key)}>
                          <Icon name={'chevron-up'}
                            size={25}
                            color="black"></Icon>
                        </Text>
                      </View>
                    </View>
                  </View> */}

                    </View>
                    {
                      selectedItem === Item.key && (
                        <View style={{ width: '100%', flexDirection: 'row' }}>
                          <View style={{
                            width: '12%',
                            backgroundColor: '#D6852A',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                            {isWishlist ? (
                              <Pressable onPress={toggleSaved}>
                                <Image source={Images.saveIconFill} />
                              </Pressable>
                            ) : (
                              <Image source={Images.saveIconUnFill} />
                            )}
                          </View>

                          <TouchableOpacity style={{
                            width: '12%',
                            backgroundColor: globalColors.black,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                            onPress={() => handleRemove(Item)}
                          >
                            <Icon
                              name={'close'}
                              size={30}
                              color="white"
                              style={{
                                // position: 'absolute',
                                right: 0,
                              }}
                            >

                            </Icon>
                            <Text style={{
                              fontSize: 8,
                              fontFamily: 'Product Sans',
                              color: globalColors.white
                            }}>Remove</Text>
                          </TouchableOpacity>
                        </View>
                      )
                    }

                  </View>

                ))}
                <View style={styles.custborder} />
              </View>
            )}

            {/* <View style={styles.custborder} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
          }}>
          <Text style={styles.custText}>SUBTOTAL</Text>
          <Text>{totalSum} AED</Text>
        </View> */}


            {viewcartdata?.coupon_status ? (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // marginVertical: 10,
                  }}>
                  <Text style={styles.custText}>COUPON</Text>
                  <Text style={{ fontFamily: 'Intrepid Regular' }}>
                    {viewcartdata?.coupon_status}
                  </Text>
                </View>

                <View style={styles.custborder} />

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                  }}>
                  <Text style={styles.custText}>DISCOUNT PERCENTAGE</Text>
                  <Text>{viewcartdata?.discount_percentage}%</Text>
                </View>
                <View style={styles.custborder} />
              </>
            ) : null}

            {/* <View style={{
          marginVertical: 10, marginBottom: hp('3%'),
         }}>
          <Text style={{
            color: globalColors.black,
            fontSize: 16,
            fontWeight: 400,
          }}>Shipping</Text>
          <View>
            <View style={{
              color: globalColors.black,
              backgroundColor: globalColors.headingBackgroundLogin,
              fontWeight: '800',
              fontSize: 14,
              marginTop: hp('1%'),
              fontFamily: 'Product Sans',
            }}>
              <Text style={{
                marginLeft: wp(2),
                fontFamily: 'Product Sans',
                fontSize: 12,
                fontWeight: '700',
                borderRadius: 5,
                color: globalColors.textColorSignup,
                padding: 3,
                textTransform: 'uppercase',

              }}>
                Enter your address to view shipping options.
              </Text>
            </View>
           
            <View style={{ backgroundColor: globalColors.white, }}>


              <SelectDropdown
                data={countries}
                search
                searchPlaceHolder="Search Country"
                searchInputStyle={{ fontFamily: 'Product Sans' }}
                onSelect={(selectedItem, index) => {
                  setFormData({
                    ...formData,
                    selectedCountry: selectedItem.label,
                  });
                }}
                renderButton={(selectedItem, isOpen) => {
                  return (
                    <View style={styles.dropdownButtonStyle}>
                      <Text
                        style={{
                          fontFamily: 'Product Sans',
                          fontSize: 14,
                          color: globalColors.buttonBackground,
                        }}>
                        {selectedItem?.label || 'SELECT A COUNTRY'}
                      </Text>
                      <Icon
                        name={isOpen ? 'chevron-up' : 'chevron-down'}
                        style={styles.dropdownButtonArrowStyle}
                      />
                    </View>
                  );
                }}
                renderItem={(item, index, isSelected) => {
                  return (
                    <View
                      style={{
                        ...styles.dropdownItemStyle,
                        ...(isSelected && { backgroundColor: '#D2D9DF' }),
                      }}>
                      <Text style={styles.dropdownItemTxtStyle}>
                        {item.label}
                      </Text>
                    </View>
                  );
                }}
              />
              <View style={styles.separator} />
              <TextInput
                placeholder='CITY'
                placeholderTextColor={globalColors.textColorLogin}
                style={styles.inputfield}
              >
              </TextInput>
              <View style={styles.separator} />
              <Text
                style={styles.createAccountText}
              >
                Calculate
              </Text>
            </View>

          </View>
        </View> */}



            {/* <Text style={{
            color: globalColors.black,
            fontSize: 16,
            fontWeight: 400, fontFamily: 'Product Sans',
            marginVertical: 10
          }}>Shipping</Text>
          <Text style={{
            fontSize: 14,
            marginBottom: wp('2%'),
            marginLeft: wp('10%'),
            fontWeight: 400, fontFamily: 'Product Sans',
          }}>Shipping cost will be calculate during check out.</Text> */}

          </View>
          <View style={{ backgroundColor: globalColors.headingBackground, paddingLeft: wp('4%'), paddingRight: wp('4%') }}>
            {/* <View style={{ marginVertical: 10, flexDirection: 'row' }}>
            <Text style={
              // [styles.custText, styles.custmargin]
              {
                color: globalColors.black,
                fontSize: 16,
                fontWeight: 400,
              }
            }>
              Discount Code          </Text>
          </View> */}
            <View style={styles.container}>
              <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }} onPress={toggleInputField}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '400',
                  color: globalColors.black,
                  fontFamily: 'Product Sans',
                }}>Add a Promo code</Text>
                <Text style={styles.toggleIcon}>{isInputVisible ? '-' : '+'}</Text>
              </TouchableOpacity>

              {/* Input Field for Promo Code */}
              {isInputVisible && (
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
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
                  <TouchableOpacity style={styles.applyButton} onPress={handlepress}>
                    <Text style={styles.applyButtonText}>APPLY</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View style={{
              marginTop: hp('2%'),
            }}>
              <View style={styles.custborder} />

            </View>
            {/* <TextInput
            value={discount}
            onChangeText={text => setDiscount(text)}
            type="text"
            placeholder="Coupon code"
            style={styles.custInput}></TextInput> */}


            {/* <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'space-between',
            borderRadius: 7,
            padding: hp('2.5%'),
            backgroundColor: globalColors.headingBackground
          }}>
            <TextInput
              value={discount}
              onChangeText={text => setDiscount(text)}
              type="text"
              placeholder="Coupon code"
              style={styles.custInput}></TextInput>
            <Button
              stylesofbtn={styles.custbtn}
              styleoffont={[styles.custfontstyle, { color: globalColors.lightgold }]}
              name={'Apply'}
              handlepress={handlepress}
              loading={load}
            />
          </View> */}


            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: hp('3%'),
                // marginBottom: hp('1%'),
              }}>
              <Text style={styles.custText}>TOTAL </Text>
              <Text style={[styles.custText, { color: globalColors.lightgold }]}>{viewcartdata?.discount_sub_total} AED</Text>
            </View>
            <View style={styles.custborder} />

            <View style={{
              flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('2%'),
              // marginBottom: hp('2%')
            }}>
              <Text style={{
                fontSize: 16,
                fontWeight: '400', fontFamily: 'Product Sans',
              }}>Customer Service</Text>
              <View style={{
                flexDirection: 'column',
                alignItems: 'flex-end'
              }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{
                    fontSize: 12,
                    fontWeight: '400',
                    fontFamily: 'Product Sans',
                    color: globalColors.textColorSignup,
                    textAlign: 'right'
                  }}>Mon - Fri</Text>
                  <Text style={{
                    fontWeight: '400',
                    fontSize: 12,
                    textAlign: 'right',
                    fontFamily: 'Product Sans',
                  }}> 8am - 9pm EST</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{
                    fontWeight: '400',
                    fontSize: 12,
                    fontFamily: 'Product Sans',
                    color: globalColors.textColorSignup,

                  }}>Sat </Text>
                  <Text style={{
                    fontWeight: '400',
                    fontSize: 12,
                    fontFamily: 'Product Sans',
                  }}> 10am - 9pm EST</Text>
                </View>
              </View>

            </View>

            <View style={styles.infocontanier}>
              <Image source={callIcon}
                style={{ height: 15, width: 15 }}
                resizeMode="contain"></Image>
              <Text style={{
                marginLeft: wp('3%'), fontSize: 16,
                fontFamily: '400', fontFamily: 'Product Sans',

              }}>Call</Text>
              <Text style={{
                flex: 1,
                fontSize: 16,
                fontWeight: '700',
                textAlign: 'right', fontFamily: 'Product Sans',

              }}>+91 9898787889</Text>
            </View>

            <View style={styles.infocontanier}>
              <Image source={emailIcon}
                style={{ height: 15, width: 15 }}
                resizeMode="contain"></Image>
              <Text style={{
                marginLeft: wp('3%'), fontSize: 16,
                fontWeight: '400', fontFamily: 'Product Sans',

              }}>Email</Text>
              <Text style={{
                flex: 1,
                fontFamily: 'Product Sans',
                textAlign: 'right',
                fontSize: 16,
                fontWeight: '700',
              }}>dummyemail@contact.in</Text>
            </View>

            <View style={styles.iconParentContainer}>
              <View style={styles.iconContainer}>
                <Image
                  source={certifiedIcon}
                  style={{ height: 42, width: 35, marginBottom: wp('5%') }}
                  resizeMode="contain">
                </Image>
                <Text style={styles.bottomContainerText}>Free standard delivery</Text>
              </View>
              <View
                style={{
                  width: 1,
                  height: '40%',
                  backgroundColor: globalColors.textColorSignup,
                  left: wp('1%'),
                  top: wp('-5%'),
                }}
              />
              <View style={styles.iconContainer}>
                <Image
                  source={returnExchangeIcon}
                  style={{ height: 42, width: 35, marginBottom: wp('5%') }}
                  resizeMode="contain">
                </Image>
                <Text style={styles.bottomContainerText}>Returns & exchanges</Text>
              </View>
              <View
                style={{
                  width: 1,
                  height: '40%',
                  backgroundColor: globalColors.textColorSignup,
                  left: wp('1%'),
                  top: wp('-5%'),
                }}
              />
              <View style={styles.iconContainer}>
                <Image
                  source={deliveryIcon}
                  style={{ height: 42, width: 35, marginBottom: wp('5%') }}
                  resizeMode="contain">
                </Image>
                <Text style={styles.bottomContainerText}> shop         securely    </Text>
              </View>
            </View>

          </View>
        </ScrollView >
        {/* <View style={{ position: 'relative', bottom: 10 }}>
        <Button
          stylesofbtn={styles.custcheckoutbtn}
          styleoffont={styles.custfontstyle}
          name={'Checkout'}
          handlepress={handleCheckout}
          loading={isloading}
        />
      </View> */}

      </SafeAreaView >
    </TouchableWithoutFeedback>




  );
};

export default Cart;

const styles = StyleSheet.create({
  imageStyle: {
    height: 120,
    width: 130,
  },
  container: {
    marginHorizontal: wp('5%'),
    marginTop: hp('2%'),
  },
  custText: {
    color: globalColors.black,
    fontSize: 16,
    fontWeight: '400',
    marginBottom: hp('2%'),
    fontFamily: 'Product Sans',
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
    alignContent: 'center'
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
    paddingHorizontal: wp('42%')
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
    alignItems: 'center'
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
    fontSize: 20
  }
});
