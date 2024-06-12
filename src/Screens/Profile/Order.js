import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
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
import {SafeAreaView} from 'react-native';
import CustomStatusBar from '../../Components/StatusBar/CustomSatusBar';

const Order = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {data, loading, error} = useSelector(state => state.order);
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

  const handleLoadMore = async () => {
    if (!isFetchingMore) {
      setIsFetchingMore(true);
      await fetchData();
      setIsFetchingMore(false);
    }
  };

  const renderItem = ({item}) => (
    <OrderComponents
      key={item.id}
      currency={item.currency}
      OrderDate={item.date_created}
      TotalAmount={item.total}
      status={item.status}
      line_items={item?.line_items[0]?.image?.src}
    />
  );

  return (
    // <View style={styles.container}>
    //   <Text style={styles.headingText}>Order page</Text>
    //   {loading && !refreshing ? (
    //     <ActivityIndicator
    //       style={styles.loader}
    //       size="large"
    //       color={globalColors.black}
    //     />
    //   ) : data && data.length > 0 ? (
    //     <FlatList
    //       data={data}
    //       renderItem={renderItem}
    //       keyExtractor={item => item.id.toString()}
    //       refreshControl={
    //         <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
    //       }
    //       // onEndReached={handleLoadMore}
    //       // onEndReachedThreshold={0.1}
    //       ListFooterComponent={
    //         isFetchingMore ? (
    //           <ActivityIndicator size="large" color={globalColors.black} />
    //         ) : null
    //       }
    //       showsVerticalScrollIndicator={false}
    //     />
    //   ) : (
    //     <Text style={styles.noOrdersText}>No orders available</Text>
    //   )}
    // </View>
    <SafeAreaView>
      <CustomStatusBar color={globalColors.headingBackground}></CustomStatusBar>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.subContainer}>
            {/* <Text style={styles.headingText}>Order page</Text> */}
            {loading && !refreshing ? (
              <ActivityIndicator
                style={styles.loader}
                size="large"
                color={globalColors.black}
              />
            ) : data && data.length > 0 ? (
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
                // onEndReached={handleLoadMore}
                // onEndReachedThreshold={0.1}
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
            ) : (
              <Text style={styles.noOrdersText}>No orders available</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? hp('22%') : hp('27%'),
    marginBottom: hp('3%'),
    // padding: 10,
    //ios =120
    flex: 1,
    // width: '100%',
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
