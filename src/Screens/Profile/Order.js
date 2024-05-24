import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Images} from '../../Constants/index';
import Button from '../../Components/Button';
import {globalColors} from '../../Assets/Theme/globalColors';
import OrderComponents from '../../Components/Order/OrderComponents';

const Order = () => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text>Order page</Text>

        <OrderComponents />
        <OrderComponents />
        <OrderComponents />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 120,
  },
  line: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    // width: '100%',
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
