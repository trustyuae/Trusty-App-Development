import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import ProfileNavigations from '../../Navigation/ProfileNavigations';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {globalColors} from '../../Assets/Theme/globalColors';
import {Image} from 'react-native';
import {Images} from '../../Constants';
const Profile = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
            <Text style={styles.SubtextHeading}>
              123 main St Near LandMark XYZ
            </Text>
            <Text style={styles.textHeading}>45678990</Text>
          </View>
          <Text style={styles.mainText}>Billing Address</Text>
          <View style={styles.contantContainer}>
            <Text style={styles.textHeading}>Johnathan doe</Text>
            <Text style={styles.SubtextHeading}>
              123 main St Near LandMark XYZ
            </Text>
            <Text style={styles.textHeading}>45678990</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image style={{}} source={Images.Logout}></Image>
          <Text
            style={{
              marginLeft: wp('2%'),
              marginTop: -3,
              marginBottom: 10,
              fontSize: 16,
              color: globalColors.black,
            }}>
            Logout
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: hp('30%'),
    padding: 20,
  },
  mainText: {
    fontFamily: 'Intrepid Regular',
    color: globalColors.black,
    fontSize: 18,
    marginBottom: hp('1%'),
    marginTop: hp('1%'),
  },
  contantContainer: {
    backgroundColor: globalColors.white,
    padding: 20,
  },
  textHeading: {
    color: globalColors.black,
    fontSize: 16,
    fontFamily: 'Intrepid Regular',
  },
  SubtextHeading: {
    color: globalColors.black,
    fontSize: 16,
    paddingTop: 6,
    paddingBottom: 6,
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
    marginBottom: hp('1%'),
    marginTop: hp('1%'),
    fontSize: 16,
    fontFamily: 'Intrepid Regular',
  },
});
export default Profile;
