import React from 'react';
import { Image, SafeAreaView, Text } from 'react-native';
import { StyleSheet, View } from 'react-native';
import Button from '../Button';
import { Images } from '../../Constants/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { globalColors } from '../../Assets/Theme/globalColors';

const OrderComponents = ({
  line_items,
  OrderDate,
  TotalAmount,
  status,
  currency,
}) => {
  const date = new Date(OrderDate);
  const formattedDate = date.toISOString().split('T')[0]; return (
    <SafeAreaView>
      <View style={styles.line} />
      <View style={{ flexDirection: 'row' }}>
        <Image
          style={{ width: wp('40%'), height: hp('18%') }}
          source={{ uri: line_items }}></Image>
        <View style={styles.orderProducts}>
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 10,
              // justifyContent: 'space-between', // Add this line
              gap: 50,
            }}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.headingTextOrder}>Order On</Text>
              <Text style={{ color: globalColors.buttonBackground }}>{formattedDate}</Text>

              <Text style={styles.headingText}>Total Amount</Text>
              <Text style={{
                fontFamily: 'Intrepid Regular',
                color: globalColors.buttonBackground
              }}


              >
                {TotalAmount} {currency}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'column',
                marginHorizontal: 'auto',
                marginRight: 'auto',
              }}>
              <Text style={{ color: globalColors.black, fontSize: 16, textTransform: 'capitalize' }}>{status}</Text>
              <Button
                name={'Details'}
                stylesofbtn={styles.stylesofbtn}
                styleoffont={styles.styleoffont}></Button>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.line} />
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 120 },
  orderProducts: {
    flexDirection: 'row',
    // right: 'auto',
    // paddingHorizontal: wp('10%'),
  },
  headingText: {
    color: globalColors.black,
    marginTop: 'auto',
    fontFamily: 'Intrepid Regular',
    fontSize: 16,
  },
  headingTextOrder: {
    fontSize: 16,
    fontFamily: 'Intrepid Regular',
    color: globalColors.black,
  },
  stylesofbtn: {
    backgroundColor: globalColors.black,
    marginTop: 'auto',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    paddingTop: 10,
    borderRadius: 4
  },
  styleoffont: {
    color: globalColors.white,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Intrepid Regular',
  },
  line: {
    borderBottomColor: globalColors.inputBorder,
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});
export default OrderComponents;
