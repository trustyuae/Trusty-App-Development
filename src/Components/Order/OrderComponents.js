import React from 'react';
import {Image, Text} from 'react-native';
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
}) => {
  console.log('line Items-->', line_items);
  return (
    <View>
      <View style={styles.line} />
      <View style={{flexDirection: 'row'}}>
        <Image
          style={{width: wp('30%'), height: hp('20%')}}
          source={{uri: line_items}}></Image>
        <View style={styles.orderProducts}>
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 10,
              // justifyContent: 'space-between', // Add this line
              gap: 50,
            }}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.headingTextOrder}>Order On</Text>
              <Text>{OrderDate}</Text>

              <Text style={styles.headingText}>Total Amount</Text>
              <Text>
                {TotalAmount} {currency}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'column',
                marginHorizontal: 'auto',
                marginRight: 'auto',
              }}>
              <Text style={{color: globalColors.black}}>{status}</Text>
              <Button
                name={'Details'}
                stylesofbtn={styles.stylesofbtn}
                styleoffont={styles.styleoffont}></Button>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.line} />
    </View>
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
    color: globalColors.black,
    marginTop: 'auto',
    fontSize: 16,
  },
  headingTextOrder: {
    fontSize: 16,
    color: globalColors.black,
  },
  stylesofbtn: {
    backgroundColor: globalColors.black,
    marginTop: 'auto',
  },
  styleoffont: {
    color: globalColors.white,
    textAlign: 'center',
    fontFamily: 'Intrepid Regular',
  },
  line: {
    borderBottomColor: globalColors.inputBorder,
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});
export default OrderComponents;
