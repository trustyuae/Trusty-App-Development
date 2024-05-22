import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ProfileNavigations from '../../Navigation/ProfileNavigations';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {globalColors} from '../../Assets/Theme/globalColors';
const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Profile Information</Text>
      <Text style={styles.contactHeading}>Contact Details</Text>
      <View style={styles.contantContainer}>
        <View style={styles.subContantContainer}>
          <Text style={styles.textHeading}>Name</Text>
          <Text style={styles.textHeadingValue}>saf asd</Text>
        </View>
        <View style={styles.subContantContainer}>
          <Text style={styles.textHeading}>Email</Text>
          <Text style={styles.textHeadingValue}>saf asd</Text>
        </View>
        <View style={styles.subContantContainer}>
          <Text style={styles.textHeading}>Password</Text>
          <Text style={styles.textHeadingValue}>********</Text>
        </View>
        <View style={styles.subContantContainer}>
          <Text style={styles.textHeading}>Currency</Text>
          <Text style={styles.textHeadingValue}>IND</Text>
        </View>
        <View style={styles.subContantContainer}>
          <Text style={styles.textHeading}>Phone Number</Text>
          <Text style={styles.textHeadingValue}>1234567890</Text>
        </View>
        <View style={styles.subContantContainer}>
          <Text style={styles.textHeading}>Address</Text>
          <Text style={styles.textHeadingValue}>qqq</Text>
        </View>
      </View>
      <View style={styles.subContantContainer}>
        <Text style={styles.mainText}>Shipping Address</Text>
        <View style={styles.contantContainer}>
          <Text style={styles.textHeading}>Johnathan doe</Text>
          <Text style={styles.textHeading}>123 main St Near LandMark XYZ</Text>
          <Text style={styles.textHeading}>45678990</Text>
        </View>
      </View>

      <Text
        style={{
          marginLeft: wp('10%'),
          fontSize: 16,
          color: globalColors.black,
        }}>
        Logout
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: hp('20%'),
  },
  mainText: {
    fontFamily: 'Intrepid Regular',
    color: globalColors.black,
    fontSize: 18,
    marginBottom: hp('1%'),
    marginTop: hp('1%'),
    marginLeft: wp('10%'),
  },
  contantContainer: {
    alignSelf: 'center',
    backgroundColor: globalColors.white,
    width: wp('80%'),
    padding: 20,
  },
  textHeading: {
    color: globalColors.black,
    fontSize: 16,
    fontFamily: 'Intrepid Regular',
  },
  textHeadingValue: {
    color: globalColors.buttonBackground,
    fontSize: 16,
    fontFamily: 'Intrepid Regular',
  },
  subContantContainer: {
    marginBottom: wp('2%'),
  },
  contactHeading: {
    marginLeft: wp('10%'),
    marginBottom: hp('1%'),
    marginTop: hp('1%'),
    fontSize: 16,
    fontFamily: 'Intrepid Regular',
  },
});
export default Profile;
