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
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { ViewToCart } from '../../Redux/Slice/car_slice/viewcart';
const product=[
  {name:" Dummy Product 3 CHANEL",
   img:CartImg,
   price:20000,
   color:"red",
   size:"M" 
  },
  {name:" Dummy Product 3 CHANEL",
   img:CartImg,
   price:20000,
   color:"red",
   size:"M" 
  },

 
 
]





const Cart = ({count, setCount, number, setNumber,quntity,setQuntity}) => {
  const handlepress = () => {};

  const dispatch=useDispatch()
  const {erros,loading,viewcartdata}=useSelector(state=>state.ViewToCart)
  const total = viewcartdata?.cart_items?.map(item => item.product_price).reduce((acc, price) => acc + price, 0);
 
  console.log(total);

  useEffect(()=>{
    dispatch(ViewToCart())
  },[])

  const handleCheckout = () => {
    setCount(pre => (count >= 2 ? 0 : pre + 1));
  };

  const handleRemove=()=>{
    Alert.alert('Are You Sure', 'This Item Should Remove from Cart', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  }

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.custText}>You have {viewcartdata?.cart_count} items in your cart</Text>

        <View style={styles.custborder} />

       {viewcartdata?.cart_items?.map((Item)=>(
         <View
          style={{
            marginVertical: 15,
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'space-evenly',
          }}>
          <View>
            <Image source={{uri:Item?.product_image}} height={70} width={70}/>
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
          <View>
            <Icon
              name={'close'}
              size={30}
              color="black"
              style={{marginLeft: 70}} onPress={handleRemove}></Icon>
            <View
              style={{
                backgroundColor: '#ffffff',
                paddingVertical: 4,
                marginTop: 50,
                
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                {/* <View><Pressable onPress={setNumber(pre=>pre<=0 ?0:pre-1)}><Image source={minus}/></Pressable></View>
                <View><Text>{number}</Text></View>
                <View><Pressable onPress={setNumber(pre=>pre+1)}><Image source={Plus}/></Pressable></View> */}

                <View  >
                  <Text style={{fontSize: 20, color: '#444444',marginLeft:3}} onPress={(pre)=>Item.quantity-1}>-</Text>
                </View>
                <View >
                  <Text style={{fontSize: 20, color: '#444444',fontFamily: 'Intrepid Regular',marginHorizontal:32}}>{Item.quantity}</Text>
                </View>
                <View >
                  <Text style={{fontSize: 20, color: '#444444',marginLeft:7}} onPress={(pre)=>Item.quantity+1}>+</Text>
                </View>
              </View>
            </View>
          </View>
        </View>))}

        <View style={styles.custborder} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
          }}>
          <Text style={styles.custText}>SUBTOTAL</Text>
          <Text>200,00 AED</Text>
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
