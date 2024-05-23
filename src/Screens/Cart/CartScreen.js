import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {CartImg, EditICon, Groupicon, PlusIcon} from '../../Constants/Icons';
import Button from '../../Components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StepperComponet from '../../Components/Stepper/StepperComponet';

const labels = ['Cart', 'Checkout', 'confirmation'];

const CartScreen = () => {
  const [count, setCount] = useState(0);

  const handlepress = () => {};

  const handleCheckout = () => {
    setCount(pre => (count >= 2 ? 0 : pre + 1));
  };

  return (
    <ScrollView>
      <View>
        <View style={{marginTop: 90}}>
          <StepperComponet labels={labels} count={count} stepCount={3} />
        </View>
        {count == 0 ? (
          <View style={styles.container}>
            <Text style={styles.custText}>You have 1 items in your cart</Text>

            <View style={styles.custborder} />

            <View
              style={{
                marginVertical: 15,
                flexDirection: 'row',
                gap: 10,
                justifyContent: 'space-evenly',
              }}>
              <View>
                <Image source={CartImg} />
              </View>
              <View>
                <Text style={{color: 'black'}}>Dummy Product 3 CHANEL</Text>
                <Text style={{marginVertical: 2, color: '#676766'}}>
                  200,00 AED
                </Text>
                <Text style={{marginVertical: 3, color: 'black'}}>
                  Color : <Text style={{color: '#676766'}}>red</Text>{' '}
                </Text>
                <Text style={{color: 'black'}}>Size</Text>
              </View>
              <View>
                <Icon name={'close'} size={30} color="black"></Icon>
                <View
                  style={{
                    backgroundColor: 'white',
                    padding: 5,
                    marginTop: 50,
                  }}>
                  <Text>- 1 +</Text>
                </View>
              </View>
            </View>

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
        ) : null}
        {count == 1 ? (
          <View style={styles.container}>
            <Text style={styles.custText}>DELIVERY</Text>

            <View style={styles.custborder} />

            <Text style={styles.custText}>SHIPPING ADDRESS</Text>

            <View style={styles.custborder} />

            <View
              style={{
                marginTop: 10,
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <Image source={Groupicon} />
                </View>
                <View>
                  <Image source={EditICon} />
                </View>
              </View>

              <View style={{marginLeft: 30, marginTop: -20}}>
                <Text>Mr. Safwan Aipuram Ap</Text>
                <Text>31,Madinath dubai,DH</Text>
                <Text>+971581563589</Text>
              </View>
            </View>
            <View style={styles.custborder} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image source={PlusIcon} style={{margin: 5}}></Image>
              <Text style={styles.custText}>Add an address</Text>
            </View>
            <View style={styles.custborder} />

            <Text style={styles.custText}>SHIPPING METHOD</Text>

            <View style={styles.custborder} />

            <View
              style={{
                marginVertical: 5,
              }}>
              <Text style={styles.custText}>
                Delivery fees Cash On Arrivals 30 AED
              </Text>
            </View>
            <View style={styles.custborder} />

            <View
              style={{
                marginVertical: 15,
                flexDirection: 'row',
                gap: 10,
                justifyContent: 'space-evenly',
              }}>
              <View>
                <Image source={CartImg} height={5} />
              </View>
              <View>
                <Text style={{color: 'black'}}>Dummy Product 3 CHANEL</Text>
                <Text style={{marginVertical: 2, color: '#676766'}}>
                  200,00 AED
                </Text>
                <Text style={{marginVertical: 3, color: 'black'}}>
                  Color : <Text style={{color: '#676766'}}>red</Text>{' '}
                </Text>
                <Text style={{color: 'black'}}>Size</Text>
              </View>
              <View>
                <Icon name={'close'} size={30} color="black"></Icon>
                <View
                  style={{
                    backgroundColor: 'white',
                    padding: 5,
                    marginTop: 50,
                  }}>
                  <Text>- 1 +</Text>
                </View>
              </View>
            </View>

            <View style={styles.custborder} />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 5,
              }}>
              <Text style={styles.custText}>SUBTOTAL</Text>
              <Text>200,00 AED</Text>
            </View>

            <View style={styles.custborder} />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 5,
              }}>
              <Text style={styles.custText}>SHIPPING</Text>
              <Text>30 AED</Text>
            </View>

            <View style={styles.custborder} />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 5,
              }}>
              <Text style={styles.custText}>TAXES</Text>
              <Text>10 AED</Text>
            </View>

            <View style={styles.custborder} />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
              }}>
              <Text style={styles.custText}>TOTAL</Text>
              <Text>10 AED</Text>
            </View>

            <Button
              stylesofbtn={styles.custcheckoutbtn}
              styleoffont={styles.custfontstyle}
              name={'Confirm And Pay'}
              handlepress={handleCheckout}
            />
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp('3%'),
    marginTop: hp('2%'),
  },
  custText: {
    fontWeight: 'bold',
    marginVertical: 10,
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
