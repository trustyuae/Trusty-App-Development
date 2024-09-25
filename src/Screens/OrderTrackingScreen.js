import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { globalColors } from '../Assets/Theme/globalColors';
import CustomStatusBar from '../Components/StatusBar/CustomSatusBar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import StepperComponentTracking from '../Components/Stepper/StepperComponentTracking';
import Button from '../Components/Button';
import { OrderByIdTrack } from '../Redux/Slice/orderSlice';
import { getToken } from '../Utils/localstorage';

const OrderTrackingScreen = ({ navigation }) => {
  const route = useRoute();
  const dispatch = useDispatch();
  const orderId = route.params.orderId;
  const {
    dataTrack: orderDetails,
    loading,
    error,
  } = useSelector(state => state.order);

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      dispatch(OrderByIdTrack({ orderId, token }));
    };
    fetchData();
  }, [dispatch, orderId]);

  const renderOrderStatus = () => {
    if (orderDetails) {
      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.statusContainer}>
            <StepperComponentTracking
              statusTimeline={orderDetails.statusTimeline}
            />
          </View>
        </ScrollView>
      );
    } else if (error) {
      return <Text style={styles.errorText}>Error: {error}</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar color={globalColors.headingBackground} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Order Tracking</Text>
        <View style={styles.orderDetails}>
          <Text style={styles.orderText}>
            Order ID: {orderDetails?.orderId}
          </Text>
          <Text style={styles.orderText}>
            Order Date: {orderDetails?.orderDate}
          </Text>
          <Text style={styles.orderText}>
            Total Amount: ${orderDetails?.totalAmount}
          </Text>
        </View>
        <View style={styles.divider} />
        <Text style={styles.subHeading}>Tracking Status</Text>
        {renderOrderStatus()}
        <View style={styles.divider} />
        <Button
          stylesofbtn={styles.custbtn}
          styleoffont={styles.custfontstyle}
          name={'Back'}
          handlepress={() => navigation.goBack()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.headingBackground,
    marginTop: hp('10%'),
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 60,
  },
  heading: {
    fontSize: 20,
    color: globalColors.black,
    fontFamily: 'Intrepid Regular',
    marginBottom: 20,
  },
  orderDetails: {
    marginBottom: 20,
  },
  orderText: {
    fontSize: 16,
    fontFamily: 'Intrepid Regular',
    color: globalColors.black,
    marginBottom: 5,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: globalColors.gray,
    marginVertical: 20,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Intrepid Regular',
    color: globalColors.black,
    marginBottom: 10,
  },
  statusContainer: {
    marginBottom: hp('5%'),
    alignSelf: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  custfontstyle: {
    color: 'white',
    fontFamily: 'Intrepid Regular',
    textAlign: 'center',
  },
  custbtn: {
    backgroundColor: globalColors.darkGray,
    padding: 7,
    marginHorizontal: 90,
    marginVertical: 20,
    borderRadius: 5,
  },
});

export default OrderTrackingScreen;

