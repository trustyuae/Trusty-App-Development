import React from 'react';
import {Image, Text, View} from 'react-native';
import {Images} from '../../Constants/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';

const Gifts = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Gift comming soon !!!</Text>
      <Image source={Images.gift}></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    marginTop: hp('20%'),
  },
  mainText: {
    textAlign: 'center',
    marginTop: hp('20%'),
  },
});

export default Gifts;
