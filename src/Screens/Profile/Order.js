import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Pressable,
  SafeAreaView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { fetchOrder } from '../../Redux/Slice/orderSlice';
import { getToken, getUserId } from '../../Utils/localstorage';
import OrderComponents from '../../Components/Order/OrderComponents';
import { globalColors } from '../../Assets/Theme/globalColors';
import CustomStatusBar from '../../Components/StatusBar/CustomSatusBar';

const Order = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { data, loading, error } = useSelector(state => state.order);
  const [refreshing, setRefreshing] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

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

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const handleLoadMore = async () => {
    if (!isFetchingMore) {
      setIsFetchingMore(true);
      await fetchData();
      setIsFetchingMore(false);
    }
  };

  const renderItem = useMemo(() => {
    return ({ item }) => (
      <Pressable>
        <OrderComponents
          key={item.id}
          currency={item.currency}
          OrderDate={item.date_created}
          TotalAmount={item.shipping_total}
          status={item.status}
          line_items={item?.line_items[0]?.image?.src}
          onPress={() => navigation.navigate('OrderDetail', { orderId: item.id })}
        />
      </Pressable>
    );
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar color={globalColors.headingBackground} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
        ListHeaderComponent={
          loading && !refreshing ? (
            <ActivityIndicator
              style={styles.loader}
              size="large"
              color={globalColors.black}
            />
          ) : null
        }
        ListFooterComponent={
          isFetchingMore ? (
            <ActivityIndicator
              size="large"
              color={globalColors.black}
            />
          ) : null
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? hp('22%') : hp('27%'),
    marginBottom: hp('3%'),
    flex: 1,
  },
  headingText: {
    color: globalColors.black,
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
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
