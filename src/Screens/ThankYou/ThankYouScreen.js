import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { globalColors } from '../../Assets/Theme/globalColors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Images } from '../../Constants/index';
import Button from '../../Components/Button';
import { checkIcon } from '../../Constants/Icons';

const ThankYouScreen = () => {
  const handlepress = () => { };
  return (
    <View style={styles.container}>
      <ScrollView
        style={{ padding: wp('10%') }}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image width={58} height={58} source={checkIcon}></Image>
        </View>
        <Text style={styles.MainHeading}>Thank You</Text>
        <View style={styles.subHeadingContainer}>
          <Text style={styles.subHeadingOrder}>your order has been recevied</Text>
          <Text style={styles.subHeading}>We appreciate your business. You'll receive an email confirmation shortly.</Text>
        </View>
        {/* <Text style={styles.MainHeading}>ORDER DETAILS</Text> */}
        <View style={{ backgroundColor: globalColors.white }}>
          <View style={styles.table}>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.label}>Order Number:</Text>
                <Text style={styles.value}>3489</Text>

              </View>
              <View style={styles.cell}>
                <Text style={styles.label}>Date:</Text>
                <Text style={styles.value}>May 9, 2024</Text>

              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.label}>Payment method:</Text>
                <Text style={styles.value}>Cash on delivery</Text>

              </View>
              <View style={styles.cell}>
                <Text style={styles.label}>Total:</Text>
                <Text style={[styles.value, { color: globalColors.lightgold, fontWeight: '700' }]}>200.00 AED</Text>

              </View>

            </View>
          </View>
        </View>
        <View style={styles.imageContainer1}>
          <Image source={Images.confirmationTick}></Image>
        </View>
        <Button
          stylesofbtn={styles.custbtn}
          styleoffont={styles.custfontstyle}
          name={'Shop more'}
          handlepress={handlepress}
        />
      </ScrollView >
    </View >
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: globalColors.headingBackground,
  },
  custbtn: {
    backgroundColor: globalColors.black,
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  custfontstyle: {
    color: globalColors.white,
    textAlign: 'center',
    fontFamily: 'Intrepid Regular',
    fontSize: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: hp('3%'),
    marginBottom: hp('2%'),
  },
  imageContainer1: {
    marginTop: hp('5%'),
    alignItems: 'center',
    marginBottom: hp('3%'),
  },
  MainHeading: {
    fontSize: 22,
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
    fontFamily: 'Product Sans',
    fontWeight: '700',
    textTransform: 'uppercase',
    color: globalColors.lightgold,
    textAlign: 'center',
  },

  subHeadingContainer: {
    alignItems: 'center',
    color: globalColors.buttonBackground,
  },
  subHeadingOrder: {
    fontFamily: 'Product Sans',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 26,
    fontWeight: '700'
  },
  subHeading: {
    fontFamily: 'Product Sans',
    fontSize: 16,
    marginTop: hp('3%'),
    marginBottom: hp('3%'),
    textAlign: 'center',
    fontWeight: '400'
  },
  table: {
    borderWidth: 1,
    borderColor: globalColors.inputBorder,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: globalColors.inputBorder,
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    color: globalColors.mediumGray,
    fontFamily: 'Product Sans',
  },
  value: {
    fontSize: 16,
    fontWeight: '400',
    color: globalColors.productTextColor,
    fontFamily: 'Product Sans',
  },
  cell: {
    flex: 1,
    padding: 10,
    borderColor: globalColors.inputBorder,
    alignItems: 'center'
  },
});
export default ThankYouScreen;
