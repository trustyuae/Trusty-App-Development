import React from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native';
import { Gift } from '../../Constants/Icons';

const Gifts = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.mainText}>Gift comming soon !!!</Text>
        <Image source={Gift} style={styles.imgconatine}></Image>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    marginTop: hp('20%'),
  },
  mainText: {
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Intrepid Regular',
    marginTop: hp('20%'),
  },
  imgconatine: {
    marginTop: 10,
    marginHorizontal: 'auto',
  },
});

export default Gifts;
