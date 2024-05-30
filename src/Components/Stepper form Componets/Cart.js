import {Image, Text, View, TextInput, Pressable, Alert} from 'react-native';
import {CartImg, Plus, minus} from '../../Constants/Icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet} from 'react-native';
import Button from '../Button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ViewToCart} from '../../Redux/Slice/car_slice/viewcart';
import {deleteToCart} from '../../Redux/Slice/car_slice/deletecart';

const Cart = ({count, setCount, number, setNumber}) => {
  const handlepress = () => {};
  const [updated, setupdate] = useState(false);
  const dispatch = useDispatch();
  const {erros, loading, viewcartdata} = useSelector(
    state => state?.ViewToCart,
  );
  const {deteltedData} = useSelector(state => state?.DeleteToCart);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    setCartData(viewcartdata?.cart_items);
  }, [viewcartdata, deteltedData]);

  const handleCheckout = () => {
    setCount(count + 1);
  };

  const handleRemove = id => {
    const data = {
      product_id: id,
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
  };

  const update = cartData?.map(item => ({
    ...item,
    total: item.product_price * item.quantity,
  }));
  const totalSum = update?.reduce(
    (accumulator, currentItem) => accumulator + currentItem.total,
    0,
  );

  useEffect(() => {
    const fetch = async () => {
      let data = await dispatch(ViewToCart());
    };

    fetch();
  }, [deteltedData]);

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.custText}>
          You have {viewcartdata?.cart_count} items in your cart
        </Text>

        <View style={styles.custborder} />

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
              size={30}
              color="black"
              style={{
                position: 'absolute',
                right: 0,
              }}
              onPress={() => handleRemove(Item.product_id)}></Icon>

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
              <Image
                source={{uri: Item?.product_image}}
                height={70}
                width={70}
              />
            </View>
            <View>
              <Text style={{color: 'black', fontFamily: 'Intrepid Regular'}}>
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
                Color : <Text style={{color: '#676766'}}>{Item?.color}</Text>{' '}
              </Text>
              <Text style={{color: 'black', fontFamily: 'Intrepid Regular'}}>
                Size : <Text style={{color: '#676766'}}>{Item?.size}</Text>{' '}
              </Text>
            </View>
            <View></View>
          </View>
        ))}

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
          <Text>200,00 AED</Text>
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
        />
      </View>
    </View>
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
