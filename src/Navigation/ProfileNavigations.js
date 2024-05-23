import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const ProfileNavigations = () => {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Text>Order</Text>
      <Text>Points</Text>
      <Text>Gifts</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: wp('15%'),
    alignContent: 'center',
  },
});
export default ProfileNavigations;
