import React from 'react';
import {Image, Platform, Pressable, SafeAreaView, Text} from 'react-native';
import {StyleSheet, View} from 'react-native';
import Button from '../Button';
import {Images} from '../../Constants/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {globalColors} from '../../Assets/Theme/globalColors';

const OrderComponents = ({
  line_items,
  OrderDate,
  TotalAmount,
  status,
  currency,
  onPress,
}) => {
  const date = new Date(OrderDate);
  console.log('ss', OrderDate);
  const month = date.toLocaleString('default', {month: 'long'});
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  const formattedDate = `${month} ${day},  ${year}`;

  return (
    <SafeAreaView>
      <View style={styles.line} />
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {line_items ? (
          <Image
            style={{width: wp('30%'), height: hp('17%')}}
            source={{uri: line_items}}></Image>
        ) : (
          <View
            style={{
              width: wp('30%'),
              height: hp('17%'),
              backgroundColor: 'white',
            }}></View>
        )}
        <View style={styles.orderProducts}>
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 10,
              // justifyContent: 'space-between', // Add this line
              gap: Platform.OS === 'ios' ? 50 : wp('16%'),
            }}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.headingTextOrder}>Order On</Text>
              <Text style={{color: globalColors.buttonBackground}}>
                {formattedDate}
              </Text>

              <Text style={styles.headingText}>Total Amount</Text>
              <Text
                style={{
                  fontFamily: 'Intrepid Regular',
                  color: globalColors.buttonBackground,
                  fontSize: 14,
                }}>
                {TotalAmount} {currency}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'column',
                marginHorizontal: 'auto',
              }}>
              <Text
                style={{
                  color: globalColors.productTextColor,
                  fontSize: 14,
                  textTransform: 'capitalize',
                }}>
                {status}
              </Text>

              <Button
                name={'Details'}
                stylesofbtn={styles.stylesofbtn}
                styleoffont={styles.styleoffont}
                handlepress={onPress}></Button>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.line} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {marginTop: 120},
  orderProducts: {
    flexDirection: 'row',
    // right: 'auto',
    // paddingHorizontal: wp('10%'),
  },
  headingText: {
    color: globalColors.productTextColor,
    marginTop: 'auto',
    fontFamily: 'Intrepid Regular',
    fontSize: 16,
  },
  headingTextOrder: {
    fontSize: 16,
    fontFamily: 'Intrepid Regular',
    color: globalColors.productTextColor,
  },
  stylesofbtn: {
    backgroundColor: globalColors.black,
    marginTop: 'auto',
    paddingLeft: 15,
    alignItems: 'center',
    paddingRight: 15,
    paddingBottom: 5,
    paddingTop: 5,
    borderRadius: 4,
  },
  styleoffont: {
    color: globalColors.white,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Intrepid Regular',
  },
  line: {
    borderBottomColor: globalColors.inputBorder,
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});
export default OrderComponents;
