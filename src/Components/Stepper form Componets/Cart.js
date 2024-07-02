import {
  Image,
  Text,
  View,
  TextInput,
  Alert,
  SafeAreaView,
} from 'react-native';
import {NoImg} from '../../Constants/Icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet} from 'react-native';
import Button from '../Button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ViewToCart} from '../../Redux/Slice/car_slice/viewcart';
import {deleteToCart} from '../../Redux/Slice/car_slice/deletecart';
import {getToken, getUserId} from '../../Utils/localstorage';
import {fetchProfile} from '../../Redux/Slice/profileSlice';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {updateToCart} from '../../Redux/Slice/car_slice/updatecart';
import CustomStatusBar from '../StatusBar/CustomSatusBar';
import {globalColors} from '../../Assets/Theme/globalColors';
import SkeletonLoaderOrder from '../Loader/SkeletonLoaderOrder';
import {CouponDetail} from '../../Redux/Slice/car_slice/coupon/couponcart';
import debounce from 'lodash/debounce';

const Cart = ({
  count,
  setCount,
  setOrderDetail,
  setTotal,
  scrollViewRef,
}) => {
  const dispatch = useDispatch();
  const {erros, loading, viewcartdata} = useSelector(
    state => state?.ViewToCart,
  );
  const {coupon, load, iserrors} = useSelector(state => state.CouponDetail);
  const state = useSelector(state => state?.ProductView);
  const {deteltedData} = useSelector(state => state?.DeleteToCart);
  const {isloading} = useSelector(state => state?.OrderToCart);
  const {data} = useSelector(state => state?.profile);
  const [cartData, setCartData] = useState([]);
  const [customerid, setCustomerID] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();
  const [discount, setDiscount] = useState();

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
  }, []);

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
        scrollViewRef.current.scrollTo({y: 0, animated: true});
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
            visibilityTime: 1500,
          });
        } else {
          Toast.show({
            type: 'error',
            text1: response?.payload?.message,
            position: 'bottom',
            visibilityTime: 1500,
          });
        }
      } else {
        Toast.show({
          type: 'error',
          text1: response?.payload?.message,
          position: 'bottom',
          visibilityTime: 1500,
        });
      }
    });
    setDiscount('');
  };

  return (
    <SafeAreaView style={{position: 'relative'}}>
      <Icon
        name={'arrow-left'}
        size={25}
        color="black"
        style={{
          position: 'absolute',
          left: 10,
          top: -85,
        }}
        onPress={() => navigation.goBack()}></Icon>
      <CustomStatusBar color={globalColors.headingBackground}></CustomStatusBar>

      <View style={styles.container}>
        <Text style={styles.custText}>
          You have {viewcartdata?.cart_count} items in your cart
        </Text>

        <View style={styles.custborder} />

        {loading ? (
          <View style={{padding: 10}}>
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
                  position:'relative',
                }}>
                <Icon
                  name={'close'}
                  size={20}
                  color="black"
                  style={{
                    position: 'absolute',
                    right: 0,
                  }}
                  onPress={() => handleRemove(Item)}></Icon>

                <View
                  style={{
                    backgroundColor: globalColors.white,
                    paddingVertical: 2,
                    position: 'absolute',
                    bottom: -8,
                    right: 0,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                          color: globalColors.darkGray,
                          marginLeft: 7,
                        }}
                        onPress={() => handleDecrease(Item.key)}>
                        -
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                          color: globalColors.darkGray,
                          fontFamily: 'Intrepid Regular',
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
                        +
                      </Text>
                    </View>
                  </View>
                </View>

                <View>
                  {Item.product_image ? (
                    <Image
                      source={{uri: Item?.product_image}}
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
                      fontFamily: 'Intrepid Regular',
                    }}>
                    {Item.product_name}
                  </Text>
                  <Text
                    style={{
                      marginVertical: 2,
                      color: globalColors.buttonBackground,
                      fontFamily: 'Intrepid Regular',
                    }}>
                    {Item.product_price} AED
                  </Text>
                  <Text
                    style={{
                      marginVertical: 3,
                      color: globalColors.black,
                      fontFamily: 'Intrepid Regular',
                    }}>
                    Color :{' '}
                    <Text style={{color: globalColors.buttonBackground}}>
                      {Item?.mod_attributes?.color}
                    </Text>
                  </Text>
                  <Text
                    style={{
                      color: globalColors.black,
                      fontFamily: 'Intrepid Regular',
                    }}>
                    Size :{' '}
                    <Text style={{color: globalColors.buttonBackground}}>
                      {Item?.mod_attributes?.size}
                    </Text>
                  </Text>
                </View>
                <View></View>
              </View>
            ))}
          </View>
        )}

        <View style={styles.custborder} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
          }}>
          <Text style={styles.custText}>SUBTOTAL</Text>
          <Text>{totalSum} AED</Text>
        </View>

        <View style={styles.custborder} />

        {viewcartdata?.coupon_status ? (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
              }}>
              <Text style={styles.custText}>COUPON</Text>
              <Text style={{fontFamily: 'Intrepid Regular'}}>
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

        <View style={{marginVertical: 10}}>
          <Text style={styles.custText}>SHIPPING</Text>
          <Text style={{marginTop: 5, fontFamily: 'Intrepid Regular'}}>
            Delivery fees Cash on Arrival 30 AED
          </Text>
          <Text style={{marginTop: 5, fontFamily: 'Intrepid Regular'}}>
            Shipping options will be updated during Checkout
          </Text>
        </View>

        <View style={styles.custborder} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Text style={styles.custText}>TOTAL </Text>
          <Text>{viewcartdata?.discount_sub_total} AED</Text>
        </View>

        <View style={styles.custborder} />

        <View style={{marginVertical: 10}}>
          <Text style={[styles.custText, styles.custmargin]}>
            DISCOUNT CODE
          </Text>
          <TextInput
            value={discount}
            onChangeText={text => setDiscount(text)}
            type="text"
            placeholder="Coupon code"
            style={styles.custInput}></TextInput>
        </View>

        <Button
          stylesofbtn={styles.custbtn}
          styleoffont={styles.custfontstyle}
          name={'Apply'}
          handlepress={handlepress}
          loading={load}
        />

        <Button
          stylesofbtn={styles.custcheckoutbtn}
          styleoffont={styles.custfontstyle}
          name={'Checkout'}
          handlepress={handleCheckout}
          loading={isloading}
        />
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  imageStyle: {
    height: 100,
    width: 90,
  },
  container: {
    marginHorizontal: wp('3%'),
    marginTop: hp('2%'),
  },
  custText: {
    color: globalColors.black,
    fontWeight: '600',
    marginVertical: 5,
    fontFamily: 'Intrepid Regular',
  },
  custborder: {
    borderWidth: 0.8,
    marginTop: hp('1%'),
    borderColor: globalColors.inputBorder,
  },
  custInput: {
    fontFamily: 'Intrepid Regular',
    backgroundColor: globalColors.white,
    borderWidth: 1,
    borderColor: globalColors.gray,
    paddingHorizontal: 20,
    borderRadius: 5,
    paddingVertical: 8,
  },
  custbtn: {
    backgroundColor: globalColors.darkGray,
    padding: 7,
    marginHorizontal: 90,
    marginVertical: 20,
    borderRadius: 5,
  },
  custfontstyle: {
    color: globalColors.white,
    textAlign: 'center',
    fontFamily: 'Intrepid Regular',
  },
  custmargin: {
    marginBottom: 10,
  },
  custcheckoutbtn: {
    backgroundColor: globalColors.black,
    padding: 7,
    marginVertical: 20,
    borderRadius: 5,
  },
});
