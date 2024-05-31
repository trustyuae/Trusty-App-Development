import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {fetchOrder} from '../../Redux/Slice/orderSlice';
import {getToken, getUserId} from '../../Utils/localstorage';
import OrderComponents from '../../Components/Order/OrderComponents';
import {globalColors} from '../../Assets/Theme/globalColors';

const Order = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {data, loading, error} = useSelector(state => state.order);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await getUserId();
        const token = await getToken();
        if (userId) {
          dispatch(fetchOrder(userId));
        }
      } catch (error) {
        console.log('Error retrieving data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.headingText}>Order page</Text>
          {loading ? (
            <ActivityIndicator
              style={styles.loader}
              size="large"
              color={globalColors.black}
            />
          ) : data && data.length > 0 ? (
            data.map(order => (
              <OrderComponents
                key={order.id}
                currency={order.currency}
                OrderDate={order.date_created}
                TotalAmount={order.total}
                status={order.status}
                line_items={order?.line_items[0]?.image?.src}
              />
            ))
          ) : (
            <Text style={styles.noOrdersText}>No orders available</Text>
          )}
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
  subContainer: {
    padding: wp('4%'),
    width: '100%',
    alignItems: 'center',
  },
  headingText: {
    color: globalColors.black,
    fontSize: 16,
    marginBottom: 10,
  },
  noOrdersText: {
    marginTop: 50,
    color: globalColors.black,
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  loader: {
    marginTop: 200,
  },
});

export default Order;
