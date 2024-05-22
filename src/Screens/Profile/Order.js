import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Images} from '../../Constants/index';
import Button from '../../Components/Button';
import {globalColors} from '../../Assets/Theme/globalColors';

const Order = () => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text>Order page</Text>
        <View style={styles.line} />
        <View style={styles.orderProducts}>
          <Image style={{}} source={Images.cart_img}></Image>
          <View style={{flexDirection: 'column', gap: 32, paddingLeft: 20}}>
            <View>
              <Text style={styles.headingText}>Order On</Text>
              <Text>May 15, 2024</Text>
            </View>
            <View>
              <Text style={styles.headingText}>Total Amount</Text>
              <Text>200 AED</Text>
            </View>
          </View>
          <View style={{gap: 75}}>
            <Text style={{color: globalColors.black}}>processing</Text>
            <Button
              name={'Details'}
              stylesofbtn={styles.stylesofbtn}
              styleoffont={styles.styleoffont}></Button>
          </View>
        </View>
        <View style={styles.line} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    marginTop: 120,
  },
  line: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    width: '100%',
    marginVertical: 10,
  },
  subContainer: {
    padding: wp('4%'),
  },
  orderProducts: {
    flexDirection: 'row',
    right: 'auto',
    // paddingHorizontal: wp('10%'),
  },
  stylesofbtn: {
    backgroundColor: globalColors.black,
  },
  headingText: {
    color: globalColors.black,
    fontSize: 16,
  },
  styleoffont: {
    color: globalColors.white,
    textAlign: 'center',
    fontFamily: 'Intrepid Regular',
  },
});

export default Order;
