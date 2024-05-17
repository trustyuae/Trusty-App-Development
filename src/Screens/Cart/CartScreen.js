import {StyleSheet, Text, View, Image, TextInput} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {CartImg} from '../../Constants/Icons';
import Button from '../../Components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
const CartScreen = () => {
  const handlepress = () => {};

  const handleCheckout = () => {};

  return (
    <View style={{flex: 1, marginTop: 50}}>
      <ProgressSteps borderWidth={1} progressBarColor={'#696969'}>
        <ProgressStep label="First Step" nextBtnText={' next'}>
          <View>
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
                <Text style={{fontWeight: 'bold'}}>SUBTOTAL</Text>
                <Text>200,00 AED</Text>
              </View>

              <View style={styles.custborder} />

              <View style={{marginVertical: 10}}>
                <Text style={{fontWeight: 'bold'}}>SHIPPING</Text>
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
                <Text style={{fontWeight: 'bold'}}>TOTAL</Text>
                <Text>200,00 AED</Text>
              </View>

              <View style={styles.custborder} />

              <View style={{marginVertical: 10}}>
                <Text style={{fontWeight: 'bold', marginVertical: 10}}>
                  DISCOUNT CODE
                </Text>
                <TextInput
                  type="text"
                  placeholder="Coupon code"
                  style={styles.custInput}></TextInput>
              </View>

              <Button
                styles={styles}
                name={'Apply'}
                handlepress={handlepress}
              />

              {/* <Button styles={styles} name={"Checkout"} handlepress={handleCheckout} /> */}
            </View>
          </View>
        </ProgressStep>
        <ProgressStep label="Second Step">
          <View style={{alignItems: 'center'}}>
            <Text>This is the content within step 2!</Text>
          </View>
        </ProgressStep>
        <ProgressStep label="Third Step">
          <View style={{alignItems: 'center'}}>
            <Text>This is the content within step 3!</Text>
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp('3%'),
    marginTop: hp('1%'),
  },
  custText: {
    fontWeight: 'bold',
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
});
