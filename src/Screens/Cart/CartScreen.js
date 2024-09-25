import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import StepperComponet from '../../Components/Stepper/StepperComponet';
import Cart from '../../Components/Stepper form Componets/Cart';
import Checkout from '../../Components/Stepper form Componets/Checkout';
import Confirmation from '../../Components/Stepper form Componets/Confirmation';
import { SafeAreaView } from 'react-native';
import CustomStatusBar from '../../Components/StatusBar/CustomSatusBar';
import { globalColors } from '../../Assets/Theme/globalColors';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../Components/Button';
import Toast from 'react-native-toast-message';
import { Alert } from 'react-native';
import { getToken, getUserId } from '../../Utils/localstorage';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { orderToCart } from '../../Redux/Slice/car_slice/placeordercart';
import { fetchProfile } from '../../Redux/Slice/profileSlice';
import { Images } from '../../Constants';
import { Image } from 'react-native';

const labels = ['Cart', 'Checkout', 'confirmation'];

const CartScreen = () => {
  const scrollViewRef = useRef();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(1);
  const [orderdetail, setOrderDetail] = useState([]);
  const [total, setTotal] = useState(0);
  const [getorderdetail, setGetorderDetail] = useState();
  const { isloading } = useSelector(state => state?.OrderToCart);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartData, setCartData] = useState([]);
  const { erros, viewcartdata } = useSelector(state => state?.ViewToCart);

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
  }, [dispatch, viewcartdata, count]);

  useEffect(() => {
    setCartData(viewcartdata?.cart_items);
  }, [viewcartdata]);

  const handleCheckout = () => {
    if (isLoggedIn) {
      if (cartData?.length > 0) {
        setOrderDetail(cartData);
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

  //checkout
  const { data, loading, error } = useSelector(state => state?.profile);
  const [customerid, setCustomerID] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const customer_id = await getUserId();
      setCustomerID(customer_id);
      dispatch(fetchProfile(customer_id));
    };
    fetchData();
  }, [count]);

  const product = cartData?.map(item => ({
    product_id: item.product_id,
    quantity: item.quantity,
  }));

  const handleConfirmpay = () => {
    const obj = {
      payment_method: 'COD',
      payment_method_title: 'Cash On Delivery',
      set_paid: 'false',
      customer_id: customerid,
      billing: {
        first_name: data?.billing?.first_name,
        last_name: data?.billing?.last_name,
        company: data?.billing?.company,
        address_1: data?.billing?.address_1,
        address_2: data?.billing?.address_2,
        city: data?.billing?.city,
        state: data?.billing?.state,
        postcode: data?.billing?.postcode,
        country: data?.billing?.country,
        email: data?.email,
        phone: data?.billing?.phone,
      },
      shipping: {
        first_name: data?.shipping?.first_name,
        last_name: data?.shipping?.last_name,
        address_1: data?.shipping?.address_1,
        address_2: data?.shipping?.address_2,
        city: data?.shipping?.city,
        state: data?.shipping?.state,
        postcode: data?.shipping?.postcode,
        country: data?.billing?.country,
      },
      line_items: product,
      shipping_lines: [
        {
          method_id: 'flat_rate',
          method_title: 'Flat Rate',
          total: viewcartdata?.total_price,
        },
      ],
    };

    if (cartData.length > 0) {
      dispatch(orderToCart(obj)).then(action => {
        if (orderToCart.fulfilled.match(action)) {
          setGetorderDetail();
          setCount(pre => (count >= 2 ? 0 : pre + 1));
        }
      });
    } else {
      Toast.show({
        type: 'info',
        text1: 'Please add product',
        position: 'bottom',
        visibilityTime: 1000,
      });
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const renderCartItems = () => (
    <Cart
      count={count}
      setCount={setCount}
      number={number}
      setOrderDetail={setOrderDetail}
      setTotal={setTotal}
      scrollViewRef={scrollViewRef}
    />
  );

  const renderDelivery = () => (
    <Checkout
      count={count}
      setCount={setCount}
      orderdetail={orderdetail}
      total={total}
      setGetorderDetail={setGetorderDetail}
    />
  );

  const renderConfirmation = () => (
    <Confirmation count={count} setCount={setCount} total={total} />
  );

  const renderContent = () => {
    switch (count) {
      case 0:
        return renderCartItems();
      case 1:
        return renderDelivery();
      case 2:
        return renderConfirmation();
      default:
        return null;
    }
  };

  return (
    <View style={{ backgroundColor: globalColors.headingBackground }}>
      <SafeAreaView style={Platform.OS === 'ios' && { marginTop: -25 }}>
        <CustomStatusBar
          color={globalColors.headingBackground}></CustomStatusBar>

        <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 45
          }}>
            <Image source={Images.Head} style={{
              width: 145,
              height: 32,

            }} />
          </View>


          <View>
            {count == 2 ? null : (
              <View style={{ marginTop: 30 }}>
                <StepperComponet
                  labels={labels}
                  count={count}
                  setCount={setCount}
                  stepCount={3}
                />
              </View>
            )}
            {renderContent()}
          </View>
        </ScrollView>
      </SafeAreaView>
      {count === 0 && (
        <View
          style={[
            {
              backgroundColor: globalColors.headingBackground,
              paddingTop: widthPercentageToDP('1.5%'),
            },
            cartData?.length < 1 && { marginTop: widthPercentageToDP('30%') },
          ]}>
          <Button
            stylesofbtn={styles.custcheckoutbtn}
            styleoffont={styles.custfontstyle}
            name={'Checkout'}
            handlepress={handleCheckout}
            loading={isloading}
          />
        </View>
      )}
      {count === 1 && (
        <View
          style={[
            {
              backgroundColor: globalColors.headingBackground,
              paddingTop: widthPercentageToDP('1.5%'),
            },
            cartData?.length < 1 && { marginTop: widthPercentageToDP('30%') },
          ]}>
          <Button
            stylesofbtn={styles.custcheckoutbtn}
            styleoffont={styles.custfontstyle}
            name={'Confirm'}
            handlepress={handleConfirmpay}
            loading={isloading}
          />
        </View>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? -25 : 0,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  scrollViewContent: {
    paddingBottom: 100, 
  },
  stepperContainer: {
    marginTop: 90,
  },
  cartButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: globalColors.primary,
    paddingVertical: 15,
    alignItems: 'center',
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  custcheckoutbtn: {
    backgroundColor: globalColors.black,
    padding: 10,
    // marginVertical: 20,
    // marginBottom: 25,
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 15,
    borderRadius: 5,
  },
  custfontstyle: {
    color: globalColors.white,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Intrepid Bold',
  },
});
