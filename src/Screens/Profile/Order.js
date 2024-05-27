import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Images} from '../../Constants/index';
import Button from '../../Components/Button';
import {globalColors} from '../../Assets/Theme/globalColors';
import OrderComponents from '../../Components/Order/OrderComponents';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {fetchOrder} from '../../Redux/Slice/orderSlice';

const Order = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {data, loading, error} = useSelector(state => state.order); // Update state slice name
  console.log('order Data-->', data);

  useEffect(() => {
    dispatch(fetchOrder());
  }, [dispatch]); // Add dispatch as dependency
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text>Order page</Text>
          {data &&
            data.map(order => (
              <OrderComponents
                key={order.id}
                currency={order.currency}
                OrderDate={order.date_created}
                TotalAmount={order.total}
                status={order.status}
                line_items={order?.line_items[0]?.image?.src}
              />
            ))}
          {/* <OrderComponents />
        <OrderComponents />
        <OrderComponents /> */}
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 120,
  },
  line: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    // width: '100%',
    marginVertical: 10,
  },
  subContainer: {
    padding: wp('4%'),
  },
  orderProducts: {
    flexDirection: 'row',
    right: 'auto',
    // paddingHorizontal: wp('10%'),
  },
  stylesofbtn: {
    backgroundColor: globalColors.black,
  },
  headingText: {
    color: globalColors.black,
    fontSize: 16,
  },
  styleoffont: {
    color: globalColors.white,
    textAlign: 'center',
    fontFamily: 'Intrepid Regular',
  },
});

export default Order;
