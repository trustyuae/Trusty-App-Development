import React from 'react';
import { Image, Platform, Pressable, SafeAreaView, Text } from 'react-native';
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
  onPress,
}) => {
  const date = new Date(OrderDate);
  const month = date.toLocaleString('default', { month: 'long' });
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  const formattedDate = `${month} ${day},${year}`;

  return (
    <SafeAreaView>
      <View style={{ flexDirection: 'row', paddingHorizontal: wp('5%') }}>
        {line_items ? (
          <Image
            style={{
              width: wp('28%'),
              height: hp('17%'),
              borderRadius: wp('2%'),
            }}
            source={{ uri: line_items }}
            resizeMethod="contain"></Image>
        ) : (
          <View
            style={{
              width: wp('30%'),
              height: hp('17%'),
              backgroundColor: 'white',
            }}></View>
        )}

        <View>
          <View style={{ flexDirection: 'row', }}>
            <View
              style={{
                backgroundColor: '#F0E354',
                borderRadius: 20,
                padding: 5,
                marginLeft: wp('4%'),
              }}>
              <Text style={styles.headingTextOrder}>PROCESSING</Text>
            </View>

            <View>
              <Text
                style={{
                  color: globalColors.productTextColor,
                  fontSize: 12,
                  fontFamily: 'Intrepid Regular',
                  textTransform: 'capitalize',
                  marginLeft: wp('10%'),
                }}>
                {/* {status} */}
                {formattedDate}
              </Text>
            </View>
          </View>

          <View style={{ marginVertical: hp('1%'), marginLeft: wp('5%') }}>
            <Text style={{ color: globalColors.black, fontFamily: 'Intrepid Regular', fontSize: 16 }}>
              Button-Front V-Neck Top
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginLeft: wp('38%'),
          marginTop: hp('-5%'),
          alignItems: "center",

        }}>
        <View>
          <Text style={{ fontFamily: 'Intrepid Regular', }}>

            {TotalAmount} {currency}
          </Text>
        </View>
        <View>
          <Image source={Images.Detailview} resizeMode='contain' style={{ marginLeft: wp('29.5%'), height: hp('5%'), width: wp('10%') }}></Image>
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
    color: globalColors.productTextColor,
    marginTop: 'auto',
    fontFamily: 'Intrepid Regular',
    fontSize: 16,
  },
  headingTextOrder: {
    paddingHorizontal: wp('1%'),
    textAlign: 'center',
    fontSize: 12,
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
    borderBottomColor: '#E6E6E6',
    borderBottomWidth: 1,
    marginVertical: 30,
    marginHorizontal: wp('3%')
  },
});
export default OrderComponents;
