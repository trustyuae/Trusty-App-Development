import React from 'react';
import {Text} from 'react-native';
import {StyleSheet, View} from 'react-native';
import Button from '../Button';
import {Images} from '../../Constants';

const OrderComponents = () => {
  return (
    <View>
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
        <View style={{gap: 75, marginLeft: 30}}>
          <Text style={{color: globalColors.black}}>processing</Text>
          <Button
            name={'Details'}
            stylesofbtn={styles.stylesofbtn}
            styleoffont={styles.styleoffont}></Button>
        </View>
      </View>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
export default OrderComponents;
