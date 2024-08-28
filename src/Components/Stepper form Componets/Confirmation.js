import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { globalColors } from '../../Assets/Theme/globalColors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Images } from '../../Constants/index';
import Button from '../Button';
import { useNavigation } from '@react-navigation/native';
import { getOdrerdetail } from '../../Utils/localstorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearToCart } from '../../Redux/Slice/car_slice/clearcart';
import { useDispatch } from 'react-redux';
import CustomStatusBar from '../StatusBar/CustomSatusBar';
import { Dummyproduct1, Dummyproduct2, Dummyproduct3, checkIcon } from '../../Constants/Icons';

const Confirmation = ({ setCount, total }) => {
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
  console.log('=============>orderinfo*******************', orderdata?.line_items?.[0]?.name)

  return (
    <SafeAreaView>
      <CustomStatusBar color={globalColors.headingBackground}></CustomStatusBar>

      <View
        style={{
          backgroundColor: globalColors.white,
          height: hp('90%'),
          width: wp('100%'),
  }}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image width={58} height={58}
                style={{ 
               height:hp('10%'), 
               width:hp('10%')
               }} source={checkIcon}>

               </Image>
          </View>
          <Text style={styles.MainHeading}>Thank You</Text>
          <View style={styles.subHeadingContainer}>
            <Text style={styles.subHeadingOrder}>your order has been recevied</Text>
            <Text style={styles.subHeading}>We appreciate your business. You'll receive an email confirmation shortly.</Text>
            {/* <Text style={styles.subHeading}> */}

            {/* </Text> */}
          </View>
          {/* <Text style={styles.MainHeading}>ORDER DETAILS</Text> */}
          <View style={{ backgroundColor: globalColors.white, marginBottom: wp('5%') ,borderRadius:5}}>
            <View style={styles.table}>
              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text style={styles.label}>Order Number:</Text>
                  <Text style={styles.value}> {orderdata?.number}</Text>

                </View>
                <View style={styles.cell}>
                  <Text style={styles.label}>Date:</Text>
                  <Text style={styles.value}>
                    {/* May 9, 2024 */}
                    {formattedDate}
                  </Text>

                </View>
              </View>
              <View style={[styles.separator,{ width: '85%',}]} />

              <View style={styles.row}>
                <View style={styles.cell}>
                  {/* <Text style={styles.value}>200.00 AED</Text> */}
                  <Text style={styles.label}>Payment method:</Text>
                  <Text style={styles.value}> {orderdata?.payment_method_title}</Text>

                </View>
                <View style={styles.cell}>
                  <Text style={styles.label}>Total:</Text>
                  <Text style={[styles.value, { color: globalColors.lightgold, fontWeight: '700' }]}>{orderdata?.shipping_lines[0]?.total} {orderdata?.currency}</Text>
                </View>
              </View>
            </View>
          </View>
        </View >
        {/* <View style={styles.imageContainer1}>
            <Image source={Images.confirmationTick}></Image>
          </View> */}
        <View style={{
          paddingLeft: wp('5%'),
          paddingRight: wp('5%'),
          height:'auto'
        }}>
          <Text style={{
            textTransform: 'capitalize',
            fontSize: 16,
            fontWeight: '400',
            fontFamily: 'Product Sans',
            marginVertical: wp('5%')
          }}>
            Ordered items
            </Text>
          <View style={styles.separator} />
          <View style={{ flexDirection: 'row', marginTop: wp('5%') }}>
            <Image style={{ width: 80, height: 80 }} source={Dummyproduct3}></Image>
            <View style={{ paddingLeft: wp('5%') }}>
              <Text style={styles.custText}>{orderdata?.line_items?.[0]?.name}</Text>
              <View style={{ flexDirection: 'row', gap: wp('5%') }}><Text
                style={styles.productCart}>
                Color :{' '}
                <Text style={{ color: globalColors.black }}>
                  {/* {Item?.mod_attributes?.color} */}
                  Red
                </Text>
              </Text>
                <Text
                  style={styles.productCart}>
                  Size :{' '}
                  <Text style={{ color: globalColors.black }}>
                    {/* {Item?.mod_attributes?.color} */}
                    23
                  </Text>
                </Text>
              </View>
              <View>

                <Text style={styles.custText}>
                  {/* {viewcartdata?.discount_sub_total} AED */}
                  {orderdata?.shipping_lines[0]?.total} {orderdata?.currency}
                </Text>
              </View>
            </View>
          </View>

          <Button
            stylesofbtn={styles.custbtn}
            styleoffont={styles.custfontstyle}
            name={'Done'}
            handlepress={handlepress}
          />
        </View>
      </View >

    </SafeAreaView >
  );
};

export default Confirmation;

const styles = StyleSheet.create({
  container: {
    // padding: wp('10%'),
    // width: wp('100%'),
    // height: hp('100%'),
    // marginTop: hp('2%'),
    paddingTop: hp('4%'),
    backgroundColor: globalColors.headingBackground,
    paddingLeft: wp('5%'),
    paddingRight: wp('5%')
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
    fontFamily: 'Product Sans',
    fontWeight: '500',
    fontSize: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: hp('6%'),
    marginBottom: hp('2%'),
   
  },
  imageContainer1: {
    // marginTop: hp('5%'),
    alignItems: 'center',
    marginBottom: hp('3%'),
  },
  MainHeading: {
    fontSize: 22,
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
    fontFamily: 'Product Sans',
    fontWeight: '700',
    textTransform: 'uppercase',
    color: globalColors.lightgold,
    textAlign: 'center',
  },

  subHeadingContainer: {
    alignItems: 'center',
    color: globalColors.buttonBackground,
  },
  subHeadingOrder: {
    fontFamily: 'Product Sans',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 26,
    fontWeight: '700'
  },
  subHeading: {
    fontFamily: 'Product Sans',
    fontSize: 16,
    marginTop: hp('2%'),
    marginBottom: hp('3%'),
    textAlign: 'center',
    fontWeight: '400'
  },
  table: {
    // borderWidth: 1,
    // borderColor: globalColors.inputBorder,
  },
  row: {
    flexDirection: 'row',
    borderColor: globalColors.inputBorder,
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    color: globalColors.mediumGray,
    fontFamily: 'Product Sans',
  },
  value: {
    fontSize: 16,
    fontWeight: '400',
    marginTop:wp('1%'),
    color: globalColors.productTextColor,
    fontFamily: 'Product Sans',
  },
  cell: {
    flex: 1,
    padding: 10,
    borderColor: globalColors.inputBorder,
    alignItems: 'center'
  },
  productCart: {
    marginVertical: 3,
    color: globalColors.cartProductTextColor,
    fontFamily: 'Product Sans',
    fontSize: 14,
    fontWeight: '400'
  },
  custText: {
    color: globalColors.black,
    fontSize: 16,
    fontWeight: '700',
    // marginVertical: 5,
    fontFamily: 'Product Sans',
  },
  separator: {
    borderWidth: 0.5,
    borderColor: 'rgba(193, 177, 157, 1)',
    alignSelf: 'center',
    // backgroundColor: globalColors.borderColorlogin,
    width: '95%',
  },
});
