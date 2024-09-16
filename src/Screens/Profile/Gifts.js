import React from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native';
import { Gift, GiftImg } from '../../Constants/Icons';
import CustomStatusBar from '../../Components/StatusBar/CustomSatusBar';
import { globalColors } from '../../Assets/Theme/globalColors';
import Button from '../../Components/Button';

const Gifts = () => {
  return (
    <SafeAreaView>
      <CustomStatusBar color={globalColors.headingBackground}></CustomStatusBar>

      <View style={styles.container}>
        {/* <Text style={styles.mainText}>Gift comming soon !!!</Text> */}
        <Image source={GiftImg} style={styles.imgconatine}></Image>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Intrepid Regular',
            // paddingTop: hp('1%'),
            paddingRight: hp('5%'),
            paddingLeft: hp('5%'),
          }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
        <Button
          stylesofbtn={styles.custbtn}
          styleoffont={styles.custfontstyle}
          name={'Notify Me'}></Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    // marginTop: hp('20%'),
  },
  mainText: {
    textAlign: 'center',
    color: globalColors.black,
    fontFamily: 'Intrepid Regular',    // marginTop: hp('20%'),
  },
  imgconatine: {
    marginTop: hp('5%'),
    resizeMode: 'contain',
    width: hp('25%'),
    height: hp('30%'),
    marginHorizontal: 'auto',
  },
  custbtn: {
    backgroundColor: globalColors.black,
    padding: wp('2%'),
    alignSelf: 'center',
    width: hp('20%'),
    borderRadius: 5,
    fontFamily: 'Intrepid Regular',
    fontSize: 16,
    marginTop: hp('3%'),
  },
  custfontstyle: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Intrepid Regular',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default Gifts;
