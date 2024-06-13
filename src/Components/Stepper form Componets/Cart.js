import {
  Image,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {
  CartImg,
  Dummyproduct1,
  Dummyproduct2,
  NoProductImage,
  Plus,
  minus,
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
import { orderToCart } from '../../Redux/Slice/car_slice/placeordercart';
import { getToken, getUserId } from '../../Utils/localstorage';
import { fetchProfile } from '../../Redux/Slice/profileSlice';
import { Product } from '../../Constants/Images';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {updateToCart} from '../../Redux/Slice/car_slice/updatecart';
import { ProductViewToCart } from '../../Redux/Slice/car_slice/withoulogin/ViewProdcutcart';
import CustomStatusBar from '../StatusBar/CustomSatusBar';
import {globalColors} from '../../Assets/Theme/globalColors';

const Cart = ({
  count,
  setCount,
  number,
  setNumber,
  setOrderDetail,
  setTotal,
  scrollViewRef,
}) => {
  const handlepress = () => {};
  const dispatch = useDispatch();
  const {erros, loading, viewcartdata} = useSelector(
    state => state?.ViewToCart,
  );
  const state = useSelector(
    state => state.ProductView,
  );
  const {deteltedData} = useSelector(state => state?.DeleteToCart);
  const {isloading} = useSelector(state => state?.OrderToCart);
  const {data} = useSelector(state => state?.profile);
  const [cartData, setCartData] = useState([]);
  const [customerid, setCustomerID] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();




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

  const handleRemove = item => {
    const data = {
      product_id:item.product_id,
      variation_id:item.variation_id,
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
  };

  const handleIncrease = key => {
    const updatedCart = cartData?.map(item => {
      if (item.key === key) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });

    setCartData(updatedCart);

    const selectedItem = updatedCart.find(item => item.key === key);
    dispatch(
      updateToCart({
        product_id: selectedItem.product_id,
        variation_id: selectedItem.variation_id,
        quantity: selectedItem.quantity,
      }),
    );
  };

  const handleDecrease = key => {
    const updatedCart = cartData?.map(item => {
      if (item.key === key && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCartData(updatedCart);
    const selectedItem = updatedCart.find(item => item.key === key);
    dispatch(
      updateToCart({
        product_id: selectedItem.product_id,
        variation_id: selectedItem.variation_id,
        quantity: selectedItem.quantity,
      }),
    );
  };

  const update = cartData?.map(item => ({
    ...item,
    total: item.product_price * item.quantity,
  }));

  const totalSum = update?.reduce(
    (accumulator, currentItem) => accumulator + currentItem.total,
    0,
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(ViewToCart());
    }, [deteltedData, navigation])
  );
  // useEffect(()=>{
  //  dispatch(ProductViewToCart())
  // },[deleteToCart])



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



  return (
    <SafeAreaView style={{position:"relative"}}>
    <Icon
              name={'arrow-left'}
              size={25}
              color="black"
              style={{
                position: 'absolute',
                left: 10,
                top:-85,
              }}
              onPress={() =>  navigation.goBack()}></Icon>
      <CustomStatusBar color={globalColors.headingBackground}></CustomStatusBar>

      <View style={styles.container}>
        <Text style={styles.custText}>
          You have {viewcartdata?.cart_count} items in your cart
        </Text>

        <View style={styles.custborder} />

        {loading ? (
          <ActivityIndicator size="small" color="blue" />
        ) : (
          <View>
            {cartData?.map(Item => (
              <View
                style={{
                  marginVertical: 15,
                  flexDirection: 'row',
                  gap: 10,
                  position: 'relative',
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
                    backgroundColor: '#ffffff',
                    paddingVertical: 2,
                    position: 'absolute',
                    bottom: -8,
                    right: 0,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    {/* <View><Pressable onPress={setNumber(pre=>pre<=0 ?0:pre-1)}><Image source={minus}/></Pressable></View>
                    <View><Text>{number}</Text></View>
                    <View><Pressable onPress={setNumber(pre=>pre+1)}><Image source={Plus}/></Pressable></View> */}

                    <View>
                      <Text
                        style={{fontSize: 20, color: '#444444', marginLeft: 7}}
                        onPress={() => handleDecrease(Item.key)}>
                        -
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                          color: '#444444',
                          fontFamily: 'Intrepid Regular',
                          marginHorizontal: 30,
                        }}>
                        {Item.quantity}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{fontSize: 20, color: '#444444', marginRight: 7}}
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
                      height={100}
                      width={90}
                    />
                  ) : (
                    <View
                      style={{
                        height: 100,
                        width: 90,
                        backgroundColor: 'white',
                      }}></View>
                  )}
                </View>
                <View>
                  <Text
                    style={{color: 'black', fontFamily: 'Intrepid Regular'}}>
                    {Item.product_name}
                  </Text>
                  <Text
                    style={{
                      marginVertical: 2,
                      color: '#676766',
                      fontFamily: 'Intrepid Regular',
                    }}>
                    {Item.product_price} AED
                  </Text>
                  <Text
                    style={{
                      marginVertical: 3,
                      color: 'black',
                      fontFamily: 'Intrepid Regular',
                    }}>
                    Color :{' '}
                    <Text style={{color: '#676766'}}>
                      {Item?.mod_attributes?.color}
                    </Text>{' '}
                  </Text>
                  <Text
                    style={{color: 'black', fontFamily: 'Intrepid Regular'}}>
                    Size :{' '}
                    <Text style={{color: '#676766'}}>
                      {Item?.mod_attributes?.size}
                    </Text>{' '}
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

        <View style={{marginVertical: 10}}>
          <Text style={styles.custText}>SHIPPING</Text>
          <Text style={{marginTop: 5}}>
            Delivery fees Cash on Arrival 30 AED
          </Text>
          <Text style={{marginTop: 5}}>
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
          <Text>{totalSum} AED</Text>
        </View>

        <View style={styles.custborder} />

        <View style={{marginVertical: 10}}>
          <Text style={[styles.custText, styles.custmargin]}>
            DISCOUNT CODE
          </Text>
          <TextInput
            type="text"
            placeholder="Coupon code"
            style={styles.custInput}></TextInput>
        </View>

        <Button
          stylesofbtn={styles.custbtn}
          styleoffont={styles.custfontstyle}
          name={'Apply'}
          handlepress={handlepress}
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
  container: {
    marginHorizontal: wp('3%'),
    marginTop: hp('2%'),
  },
  custText: {
    color: 'black',
    fontWeight: '600',
    marginVertical: 5,
    fontFamily: 'Intrepid Regular',
  },
  custborder: {
    borderWidth: 0.8,
    marginTop: hp('1%'),
    borderColor: '#DBCCC1',
  },
  custInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#cccccc',
    paddingHorizontal: 20,
    borderRadius: 5,
    paddingVertical: 8,
  },
  custbtn: {
    backgroundColor: '#444444',
    padding: 7,
    marginHorizontal: 90,
    marginVertical: 20,
    borderRadius: 5,
  },
  custfontstyle: {
    color: 'white',
    textAlign: 'center',
  },
  custmargin: {
    marginBottom: 10,
  },
  custcheckoutbtn: {
    backgroundColor: '#000000',
    padding: 7,
    marginVertical: 20,
    borderRadius: 5,
  },
});
