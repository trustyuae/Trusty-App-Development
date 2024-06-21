import {
  Image,
  Text,
  View,
  Pressable,
  SafeAreaView,
  Modal,
  ScrollView,
} from 'react-native';
import {
  CartImg,
  EditICon,
  Groupicon,
  NoImg,
  PlusIcon,
  ProductIMG,
} from '../../Constants/Icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet} from 'react-native';
import Button from '../Button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {List} from 'react-native-paper';
import {useCallback, useEffect, useState} from 'react';
import ModalComponent from '../Model/Modalcomopnet';
import {useDispatch, useSelector} from 'react-redux';
import {OrderDetail} from '../../Redux/Slice/car_slice/orderdeatails';
import {deleteToCart} from '../../Redux/Slice/car_slice/deletecart';
import {Alert} from 'react-native';
import {Product} from '../../Constants/Images';
import {useFocusEffect} from '@react-navigation/native';
import {orderToCart} from '../../Redux/Slice/car_slice/placeordercart';
import {getUserId} from '../../Utils/localstorage';
import {clearToCart} from '../../Redux/Slice/car_slice/clearcart';
import {fetchProfile} from '../../Redux/Slice/profileSlice';
import Toast from 'react-native-toast-message';
import {updateToCart} from '../../Redux/Slice/car_slice/updatecart';
import CustomStatusBar from '../StatusBar/CustomSatusBar';
import {globalColors} from '../../Assets/Theme/globalColors';
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {ViewToCart} from '../../Redux/Slice/car_slice/viewcart';
import debounce from 'lodash/debounce';

const Checkout = ({
  count,
  setCount,
  orderdetail,
  setGetorderDetail,
  coupondiscount,
}) => {
  const {viewcartdata} = useSelector(state => state?.ViewToCart);
  const [expanded, setExpanded] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const {data, loading, error} = useSelector(state => state?.profile);
  const [cartData, setCartData] = useState(viewcartdata?.cartData);
  const {deteltedData} = useSelector(state => state?.DeleteToCart);
  const {orderData, iserror, isloading} = useSelector(
    state => state?.OrderToCart,
  );
  const [customerid, setCustomerID] = useState();
  const [billingdata, setBillingdata] = useState({});
  const [stateUpdate, setStateUpdate] = useState(false);
  const [phone, setPhone] = useState(data?.meta_data[3]?.value || '');
  const [shippingCountry, setShippingCountry] = useState(
    data?.shipping?.country || '',
  );
  const [shippingCity, setShippingCity] = useState(data?.shipping?.city || '');
  const [shippingAddress, setShippingAddress] = useState(
    data?.shipping?.address_1 || '',
  );
  
  const [title, setTitle] = useState(data?.meta_data[1]?.value || '');

  useEffect(() => {
    const fetchData = async () => {
      const customer_id = await getUserId();
      setCustomerID(customer_id);
      dispatch(fetchProfile(customer_id));
    };
    fetchData();
  }, [stateUpdate]);

  useFocusEffect(() => {
    setBillingdata(data);
    setPhone(data?.meta_data[2]?.value || '');
    setShippingCountry(data?.shipping?.country || '');
    setShippingCity(data?.shipping?.city || '');
    setShippingAddress(data?.shipping?.address_1 || '');
    setTitle(data?.meta_data[1]?.value || '');
  });

  const product = cartData?.map(item => ({
    product_id: item.product_id,
    quantity: item.quantity,
  }));

  useFocusEffect(
    useCallback(() => {
      dispatch(ViewToCart());
    }, [deteltedData]),
  );

  useEffect(() => {
    setCartData(viewcartdata?.cart_items);
  }, [viewcartdata, deteltedData]);

  const handleEditClick = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const update = cartData?.map(item => ({
    ...item,
    taxed: parseFloat(item.tax) * item.quantity,
    total_tax: parseFloat(item.tax) + item.product_price * item.quantity,
    total: item.product_price * item.quantity,
  }));

  const totalSum = update?.reduce(
    (accumulator, currentItem) => accumulator + currentItem.total,
    0,
  );

  // const tax = update?.reduce(
  //   (accumulator, currentItem) => accumulator + currentItem.taxed,
  //   0,
  // );

  // const totaltax = update?.reduce(
  //   (accumulator, currentItem) => accumulator + currentItem.total_tax,
  //   0,
  // );

  const debouncedUpdateCart =useCallback( debounce(async (selectedItem) => {
    await dispatch(
      updateToCart({
        product_id: selectedItem.product_id,
        variation_id: selectedItem.variation_id,
        quantity: selectedItem.quantity,
      }),
    );
    await dispatch(ViewToCart());
  }, 100),[])

  const handleIncrease =useCallback( key => {
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
  },[cartData,debouncedUpdateCart]);

  const handleDecrease =useCallback( key => {
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
  },[cartData,debouncedUpdateCart]);

  const handleRemove = useCallback(item => {
    const data = {
      product_id: item.product_id,
      variation_id: item.variation_id,
    };
    Alert.alert('Are You Sure', 'This Item Should Remove from Cart', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          dispatch(deleteToCart(data));
        },
      },
    ]);
  });

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
  return (
    <GestureHandlerRootView>
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
          onPress={() => setCount(pre => (count >= 2 ? 0 : pre - 1))}></Icon>
        <CustomStatusBar
          color={globalColors.headingBackground}></CustomStatusBar>

        <View style={styles.container}>
          <Text style={styles.custText}>DELIVERY</Text>

          <View style={styles.custborder} />

          <View style={{marginVertical: 10}}>
            <Text style={styles.custText}>SHIPPING ADDRESS</Text>
          </View>

          <View style={styles.custborder} />

          <View
            style={{
              marginTop: 10,
              position: 'relative',
            }}>
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <View>
                <Image source={Groupicon} />
              </View>

              <TouchableOpacity onPress={handleEditClick}>
                <Image source={EditICon} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginLeft: 30,
                marginTop: -20,
                marginVertical: 10,
                maxWidth: '80%',
              }}>
              <Text style={{color: 'black', fontFamily: 'Intrepid Regular'}}>
                {title}. {billingdata?.first_name} {billingdata?.last_name}
              </Text>
              <Text style={{fontFamily: 'Intrepid Regular', marginVertical: 2}}>
                {shippingAddress}, {shippingCountry},{shippingCity}
              </Text>
              <Text style={{fontFamily: 'Intrepid Regular'}}>+{phone}</Text>
            </View>
          </View>
          <View style={styles.custborder} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 5,
            }}>
            <Image source={PlusIcon} style={{marginHorizontal: 10}}></Image>
            <Text
              style={{
                textDecorationLine: 'underline',
                color: 'black',
                fontFamily: 'Intrepid Regular',
              }}>
              Add an address
            </Text>
          </View>
          <View style={styles.custborder} />
          <View
            style={{
              marginTop: 10,
            }}>
            <Text style={styles.custText}>SHIPPING METHOD</Text>
          </View>

          <View style={styles.custborder} />

          <View
            style={{
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Intrepid Regular',
                color: 'black',
                marginVertical: 5,
              }}>
              Delivery fees Cash On Arrivals 30 AED
            </Text>
          </View>
          <View style={styles.custborder} />

          <List.Section>
            <List.Accordion
              title="MY ORDERS"
              titleStyle={{color: '#444444'}}
              expanded={expanded}
              style={{
                backgroundColor: '#f6f1eb',
                paddingTop: -5,
                borderBottomWidth: expanded ? 1 : 0,
                borderBottomColor: '#D8CCC1',
                fontFamily: 'Intrepid Regular',
              }}
              onPress={() => setExpanded(!expanded)}>
              {cartData?.map(item => (
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
                      position:'absolute',
                      right: 0,
                    }}
                    onPress={() => handleRemove(item)}></Icon>

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

                      <View >
                        <Text
                          style={{
                            fontSize: 20,
                            color: '#444444',
                            marginLeft: 7,
                          }}
                          onPress={() => handleDecrease(item.key)}>
                            -
                        </Text>
                      </View>
                      <View >
                        <Text
                          style={{
                            fontSize: 20,
                            color: '#444444',
                            fontFamily: 'Intrepid Regular',
                            marginHorizontal: 30,
                          }}>
                          {item.quantity}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontSize: 20,
                            color: '#444444',
                            marginRight: 7,
                          }}
                          onPress={() => handleIncrease(item.key)}>
                          +
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View>
                    {item.product_image ? (
                      <Image
                        source={{uri: item?.product_image}}
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
                      style={{color: 'black', fontFamily: 'Intrepid Regular'}}>
                      {item.product_name}
                    </Text>
                    <Text
                      style={{
                        marginVertical: 2,
                        color: '#676766',
                        fontFamily: 'Intrepid Regular',
                      }}>
                      {item.product_price} AED
                    </Text>
                    <Text
                      style={{
                        marginVertical: 3,
                        color: 'black',
                        fontFamily: 'Intrepid Regular',
                      }}>
                      Color :{' '}
                      <Text style={{color: '#676766'}}>
                        {item?.mod_attributes?.color}
                      </Text>{' '}
                    </Text>
                    <Text
                      style={{color: 'black', fontFamily: 'Intrepid Regular'}}>
                      Size :{' '}
                      <Text style={{color: '#676766'}}>
                        {item?.mod_attributes?.size}
                      </Text>{' '}
                    </Text>
                  </View>
                  <View></View>
                </View>
              ))}
            </List.Accordion>
          </List.Section>

          <View style={styles.custborder} />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 5,
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
                  marginVertical: 5,
                }}>
                <Text style={styles.custText}>DISCOUNT PERCENTAGE</Text>
                <Text>{viewcartdata?.discount_percentage}% </Text>
              </View>
              <View style={styles.custborder} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 5,
                }}>
                <Text style={styles.custText}>SAVE</Text>
                <Text>{viewcartdata?.discount_amount} AED </Text>
              </View>
              <View style={styles.custborder} />
            </>
          ) : null}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 5,
            }}>
            <Text style={styles.custText}>SHIPPING</Text>
            <Text>0 AED</Text>
          </View>

          <View style={styles.custborder} />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 5,
            }}>
            <Text style={styles.custText}>TAXES</Text>
            {/* <Text>{tax?.toFixed(2)} AED</Text> */}
            <Text>{viewcartdata?.total_tax} AED</Text>
          </View>

          <View style={styles.custborder} />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 5,
            }}>
            <Text style={styles.custText}>TOTAL</Text>
            {/* <Text>{tax+totalSum} AED</Text> */}
            <Text>{viewcartdata?.total_price} AED</Text>
          </View>

          <Button
            stylesofbtn={styles.custcheckoutbtn}
            styleoffont={styles.custfontstyle}
            name={'Confirm And Pay'}
            handlepress={handleConfirmpay}
            loading={isloading}
          />
        </View>
        <ModalComponent
          visible={isModalVisible}
          onClose={closeModal}
          stateUpdate={stateUpdate}
          setStateUpdate={setStateUpdate}
          data={data}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Checkout;
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
