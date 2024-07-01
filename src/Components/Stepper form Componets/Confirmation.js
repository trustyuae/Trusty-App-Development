import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {globalColors} from '../../Assets/Theme/globalColors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Images} from '../../Constants/index';
import Button from '../Button';
import {useNavigation} from '@react-navigation/native';
import {getOdrerdetail} from '../../Utils/localstorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {clearToCart} from '../../Redux/Slice/car_slice/clearcart';
import {useDispatch} from 'react-redux';
import CustomStatusBar from '../StatusBar/CustomSatusBar';

const Confirmation = ({setCount, total}) => {
  const dispatch = useDispatch();
  const [orderdata, setOrderData] = useState(null);
  const navigation = useNavigation();
  const today = new Date();
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate = today.toLocaleDateString('en-US', options);

  const handlepress = () => {
    setCount(0);
    AsyncStorage.removeItem('orderdata');
    navigation.navigate('DrawerHome');
  };

  useEffect(() => {
    const fetchData = async () => {
      const orderDetailData = await getOdrerdetail();
      setOrderData(orderDetailData);
      dispatch(clearToCart());
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <CustomStatusBar color={globalColors.headingBackground}></CustomStatusBar>

      <View style={styles.container}>
        <ScrollView
          style={{
            paddingLeft: wp('5%'),
            paddingRight: wp('5%'),
            paddingTop: wp('5%'),
            paddingBottom: wp('1%'),
          }}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.imageContainer}>
            <Image source={Images.logoHome}></Image>
          </View>
          <Text style={styles.MainHeading}>Dear trusty</Text>
          <View style={styles.subHeadingContainer}>
            <Text style={styles.subHeading}>Thank you for your orders!</Text>
            <Text style={styles.subHeading}>We appreciate your business.</Text>
            <Text style={styles.subHeading}>
              You'll receive an email confirmation shortly.
            </Text>
          </View>
          <Text style={styles.MainHeadingOrder}>ORDER DETAILS</Text>
          <View style={styles.containerTable}>
            <View style={styles.table}>
              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text style={styles.label}>Order Number:</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.value}>{orderdata?.number}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text style={styles.label}>Date:</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.value}>{formattedDate}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text style={styles.label}>Total:</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.value}>
                    {orderdata?.shipping_lines[0]?.total} {orderdata?.currency}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text style={styles.label}>Payment method:</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.value}>
                    {orderdata?.payment_method_title}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.imageContainer1}>
            <Image source={Images.confirmationTick}></Image>
          </View>
          <Button
            stylesofbtn={styles.custbtn}
            styleoffont={styles.custfontstyle}
            name={'Shop More'}
            handlepress={handlepress}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Confirmation;

const styles = StyleSheet.create({
  container: {
    // padding: wp('10%'),
    // width: wp('100%'),
    // height: hp('100%'),
    // marginTop: hp('2%'),
    // paddingTop: 30,
    backgroundColor: globalColors.headingBackground,
  },
  custbtn: {
    backgroundColor: globalColors.black,
    borderRadius: 4,
    paddingVertical: 12,
    // paddingHorizontal: 20,
    marginVertical: 20,
    borderRadius: 5,
  },
  custfontstyle: {
    color: globalColors.white,
    textAlign: 'center',
    fontFamily: 'Intrepid Regular',
    fontSize: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: hp('4%'),
    // marginBottom: hp('2%'),
  },
  imageContainer1: {
    marginTop: hp('4%'),
    marginBottom: hp('5%'),
    alignItems: 'center',
  },
  MainHeading: {
    fontSize: 22,
    marginTop: hp('6%'),
    marginBottom: hp('2%'),
    fontFamily: 'Intrepid Regular',

    color: globalColors.productTextColor,
    textAlign: 'center',
  },
  MainHeadingOrder: {
    fontSize: 22,
    marginTop: hp('3%'),
    marginBottom: hp('1%'),
    fontFamily: 'Intrepid Regular',

    color: globalColors.productTextColor,
    textAlign: 'center',
  },
  subHeadingContainer: {
    alignItems: 'center',
    color: globalColors.buttonBackground,
  },
  subHeading: {
    fontFamily: 'Intrepid Regular',
    fontSize: 16,
    color: globalColors.buttonBackground,
  },
  table: {
    borderWidth: 1,
    borderColor: globalColors.inputBorder,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: globalColors.inputBorder,
  },
  label: {
    fontSize: 14,

    color: globalColors.productTextColor,
    fontFamily: 'Intrepid Regular',
  },
  value: {
    fontSize: 14,
    color: globalColors.productTextColor,
    fontFamily: 'Intrepid Regular',
  },
  cell: {
    flex: 1,
    padding: 10,
    borderColor: globalColors.inputBorder,
  },
});
