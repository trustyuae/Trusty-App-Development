import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {globalColors} from '../../Assets/Theme/globalColors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Images} from '../../Constants/index';
import Button from '../../Components/Button';

const ThankYouScreen = () => {
  const handlepress = () => {};
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={Images.logoHome}></Image>
      </View>
      <Text style={styles.MainHeading}>Dear trusty</Text>
      <View style={styles.subHeadingContainer}>
        <Text style={styles.subHeading}>Thank you for your orders!</Text>
        <Text style={styles.subHeading}>We appreciate your business.</Text>
        <Text style={styles.subHeading}>
          You'll receive an email confirmation shortly.
        </Text>
      </View>
      <Text style={styles.MainHeading}>ORDER DETAILS</Text>
      <View style={styles.containerTable}>
        <View style={styles.table}>
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text style={styles.label}>Order Number:</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.value}>3489</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text style={styles.label}>Date:</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.value}>May 9, 2024</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text style={styles.label}>Total:</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.value}>200.00 AED</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text style={styles.label}>Payment method:</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.value}>Cash on delivery</Text>
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
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: wp('10%'),
    width: wp('100%'),
    height: hp('100%'),
    // marginTop: hp('2%'),
    backgroundColor: globalColors.headingBackground,
  },
  custbtn: {
    backgroundColor: globalColors.black,
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 20,
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
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
  },
  imageContainer1: {
    marginTop: hp('5%'),
    alignItems: 'center',
    marginBottom: hp('3%'),
  },
  MainHeading: {
    fontSize: 22,
    marginTop: hp('5%'),
    marginBottom: hp('2%'),
    fontFamily: 'Intrepid Regular',

    color: globalColors.productTextColor,
    textAlign: 'center',
  },

  subHeadingContainer: {
    alignItems: 'center',
    color: globalColors.buttonBackground,
  },
  subHeading: {
    fontFamily: 'Intrepid Regular',
    fontSize: 16,
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

    color: globalColors.productTextColor,
    fontFamily: 'Intrepid Regular',
  },
  value: {
    fontSize: 14,
    color: globalColors.productTextColor,
    fontFamily: 'Intrepid Regular',
  },
  cell: {
    flex: 1,
    padding: 10,
    borderColor: globalColors.inputBorder,
  },
});
export default ThankYouScreen;
