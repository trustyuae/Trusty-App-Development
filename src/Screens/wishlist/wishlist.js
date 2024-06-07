import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {globalColors} from '../../Assets/Theme/globalColors';
import {Images} from '../../Constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import WishListCard from '../../Components/wishListCard/wishListCard';

const wishlist = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={{marginRight: 15}}
            source={Images.saveIconUnFill}></Image>
          <Text style={styles.mainHeading}>My Wishlist</Text>
        </View>

        <WishListCard />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: Platform.OS === 'android' ? hp('6%') : 0,
    backgroundColor: globalColors.headingBackground,
  },
  mainHeading: {
    color: globalColors.black,
    fontFamily: 'Intrepid Regular',
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
  },
  productHeading: {
    height: hp('6%'),
    marginTop: hp('2%'),
    justifyContent: 'space-between',
    backgroundColor: globalColors.white,
    flexDirection: 'row',
  },
});
export default wishlist;
