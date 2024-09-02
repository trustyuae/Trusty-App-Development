import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { View } from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { globalColors } from '../Assets/Theme/globalColors';
import Product from '../Components/Product/Product';
import { ScrollView } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCategoryProducts,
  fetchProducts,
  resetCategoryProducts,
} from '../Redux/Slice/productSlice';
import { fetchWishlist } from '../Redux/Slice/wishlistSlice';
import { getToken } from '../Utils/localstorage';
import CustomStatusBar from '../Components/StatusBar/CustomSatusBar';
import { RefreshControl } from 'react-native';
import SkeletonLoader from '../Components/Loader/SkeletonLoader';

const CategoryProducts = ({ navigation }) => {
  const route = useRoute();
  const { category } = route.params;
  // const [productss, setProducts] = useState([]);
  const dispatch = useDispatch();
  const [wishlist, setWishlist] = useState([]);
  const [tokenData, setTokenData] = useState(null);
  const { categoryProducts, status, error } = useSelector(state => state.product);
  const { items } = useSelector(state => state.wishlist);
  const [refreshing, setRefreshing] = React.useState(false);
  const [page, setPage] = useState(1);
  const [msg, setMsg] = useState();

  // useEffect(() => {
  //   dispatch(fetchCategoryProducts({ categoryId: category.id, page: 1 }));
  //   refreshWishlist();
  // }, [dispatch, category.id]);

  // const loadMoreProducts = () => {
  //   const nextPage = page + 1;
  //   dispatch(fetchCategoryProducts({ categoryId: category.id, page: nextPage }));
  //   setPage(nextPage);
  // };

  useEffect(() => {
    fetchData();
  }, [dispatch, category, page]);

  const fetchData = async () => {
    try {
      const token = await getToken();
      if (token) {
        await dispatch(fetchWishlist({ tokenData: token }));
      }
      await dispatch(
        fetchCategoryProducts({ categoryId: category.id, page: page }),
      );
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    dispatch(resetCategoryProducts());
    setPage(1);
  }, [category]);

  const refreshWishlist = () => {
    const itemIdList = items?.Wishlist?.map(item => ({ id: item }));
    const productIds = new Set(itemIdList?.map(item => Number(item?.id)));
    const result = categoryProducts.map(productItem => ({
      ...productItem,
      isWatchList: productIds.has(productItem?.id),
    }));
    if (result) {
      setWishlist(result);
    }
  };
  useEffect(() => {
    refreshWishlist();
  }, [items, categoryProducts]);

  const loadMoreProducts = () => {
    const nextPage = page + 1;
    setPage(nextPage);
  };

  const handleEndReached = () => {
    if (status !== 'loading' && wishlist.length >= 10) {
      loadMoreProducts();
    }
  };

  useEffect(() => {
    if (wishlist.length <= 0) {
      setMsg('No Product');
    }
  }, [wishlist]);
  // useFocusEffect(
  //   React.useCallback(() => {
  //     dispatch(fetchCategoryProducts({ categoryId: category.id }));

  //     refreshWishlist();

  //   }, [dispatch, category.id])
  // );
  const renderProduct = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      onPress={() =>
        navigation.navigate('ProductDetail', {
          userId: item.id,
          isWatchList: item?.isWatchList,
        })
      }>
      <Product
        uri={item?.images?.[0]?.src}
        name={item?.name}
        price={item?.price}
        saved={item?.saved}
        product_id={item?.id}
        isWatchList={item?.isWatchList}
      />
    </TouchableOpacity>
  );

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    dispatch(resetCategoryProducts());
    await dispatch(
      fetchCategoryProducts({ categoryId: category.id, page: page }),
    );
    await dispatch(fetchWishlist(tokenData));
    refreshWishlist();
    setRefreshing(false);
  }, [category.id, tokenData]);
  const count = categoryProducts?.length;

  const [selectedValue, setSelectedValue] = useState('One');
  const data = ['One', 'Two', 'Three'];
  // const emojisWithIcons = ['Relevance', 'Lowest Price', 'Highest Price'];
  // const emojisWithIcons1 = ['Name', 'Price', 'Color'];
  const emojisWithIcons = [''];
  const emojisWithIcons1 = [''];

  setTimeout(() => {
    if (wishlist.length <= 0) {
      setMsg('No Product');
    }
  }, 5000);

  return (
    <SafeAreaView>
      <CustomStatusBar color={globalColors.headingBackground}></CustomStatusBar>

      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {/* <Text style={styles.TextHeading}>Women</Text> */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'baseline',
              fontSize: 12,
            }}>
            <Text style={styles.CategoryText}>{category.name}</Text>
            <Text>({count})</Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              marginRight: 10,
              marginLeft: 10,
              paddingRight: 20,
              borderBottomColor: '#ccc',
              marginBottom: 10,
              marginTop: 10,
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              // gap: wp('48%'),
              paddingLeft: 20,
              paddingRight: 10,
              justifyContent: 'space-between',
            }}>
            <SelectDropdown
              data={emojisWithIcons1}
              onSelect={(selectedItem, index) => { }}
              // style={{marginLeft: 0}}
              renderButton={(selectedItem, isOpen) => {
                return (
                  <View style={styles.dropdownButtonStyle}>
                    <Text
                      style={{
                        fontFamily: 'Intrepid Regular',
                        fontSize: 15,
                        color: globalColors.buttonBackground,
                      }}>
                      {(selectedItem && selectedItem.title) || 'filter '}
                    </Text>
                    <Icon
                      name={isOpen ? 'chevron-up' : 'chevron-down'}
                      style={styles.dropdownButtonArrowStyle}
                    />
                  </View>
                );
              }}
              renderItem={(item, index, isSelected) => {
                return (
                  <View
                    style={{
                      ...styles.dropdownItemStyle,
                      ...(isSelected && { backgroundColor: '#D2D9DF' }),
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'Intrepid Regular',
                        marginLeft: 4,
                        textAlign: 'center',
                        marginRight: 4,
                      }}>
                      {item}
                    </Text>
                  </View>
                );
              }}
            />
            <SelectDropdown
              data={emojisWithIcons}
              // onSelect={(selectedItem, index) => { }}
              // style={{marginLeft: 0}}
              renderButton={(selectedItem, isOpen) => {
                return (
                  <View style={styles.dropdownButtonStyle}>
                    <Text
                      style={{
                        fontFamily: 'Intrepid Regular',
                        fontSize: 15,
                        color: globalColors.buttonBackground,
                      }}>
                      {(selectedItem && selectedItem.title) || 'Sort By'}
                    </Text>
                    <Icon
                      name={isOpen ? 'chevron-up' : 'chevron-down'}
                      style={styles.dropdownButtonArrowStyle}
                    />
                  </View>
                );
              }}
              renderItem={(item, index, isSelected) => {
                return (
                  <SafeAreaView
                    style={{
                      ...styles.dropdownItemStyle,
                      ...(isSelected && { backgroundColor: '#D2D9DF' }),
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'Intrepid Regular',
                        marginLeft: 4,
                        marginRight: 1,
                      }}>
                      {item}
                    </Text>
                  </SafeAreaView>
                );
              }}
            />
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              marginRight: 10,
              marginLeft: 10,
              paddingRight: 20,
              borderBottomColor: '#ccc',
              marginBottom: 10,
              marginTop: 10,
            }}
          />
          <View style={styles.productContainer}>
            {status === 'loading' ? (
              // <ActivityIndicator
              //   size="large"
              //   color={globalColors.black}
              //   style={{ marginTop: '50%' }}
              // />
              <View style={{}}>
                <SkeletonLoader count={6} />
              </View>
            ) : status === 'failed' ? (
              <Text style={styles.errorText}>Error: {error}</Text>
            ) : wishlist.length > 0 ? (
              wishlist.map(product => (
                <TouchableOpacity
                  key={product.id}
                  onPress={() =>
                    navigation.navigate('ProductDetail', {
                      userId: product.id,
                      isWatchList: product?.isWatchList,
                    })
                  }>
                  <Product
                    key={product.id}
                    uri={product?.images?.[0]?.src}
                    name={product?.name}
                    price={product?.price}
                    saved={product?.saved}
                    product_id={product?.id}
                    isWatchList={product?.isWatchList}
                  />
                </TouchableOpacity>
              ))
            ) : (
              <Text>{msg}</Text>
            )}
          </View>

          {wishlist.length >= 10 && (
            <TouchableOpacity
              onPress={loadMoreProducts}
              style={styles.loadMoreButton}>
              <Text style={styles.loadMoreButtonText}>Load More</Text>
            </TouchableOpacity>
          )}

          {/* <FlatList
            data={wishlist}
            renderItem={renderProduct}
            keyExtractor={item => item.id.toString()}
            ListEmptyComponent={
              status === 'loading' ? (
                <SkeletonLoader count={6} />
              ) : (
                <Text style={styles.errorText}>{msg || error}</Text>
              )
            }
            ListFooterComponent={
              status === 'loading' ? (
                <View>
                  <ActivityIndicator
                    size="large"
                    color={globalColors.black}
                    style={{ marginVertical: 20, justifyContent: 'center' }}
                  />
                </View>
              ) : null
            }
            onEndReached={handleEndReached}
            onEndReachedThreshold={1}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={styles.productContainer}
          /> */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    marginTop: Platform.OS === 'ios' ? 0 : hp('7%'),
    backgroundColor: globalColors.headingBackground,
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingHorizontal: 11,
  },
  TextHeading: {
    fontSize: 10,
    fontSize: 14,
    // marginTop: hp('7%'),
    marginLeft: wp('2%'),
  },
  CategoryText: {
    fontSize: 25,
    // textTransform: 'uppercase',
    color: globalColors.black,
    marginLeft: wp('2%'),
  },

  dropdownItemStyle: {
    position: 'relative',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: globalColors.inputBorder,
    justifyContent: 'center',
    // width: 100,
    height: 40,
    color: globalColors.black,
  },
  dropdownButtonStyle: {
    width: 80,
    flexDirection: 'row',
  },
  loadMoreButton: {
    backgroundColor: globalColors.black,
    height: hp('4%'),
    alignSelf: 'center',
    justifyContent: 'center',
    width: wp('25%'),
    borderRadius: 5,
    marginBottom: hp('6%'),
    marginVertical: 10,
    color: globalColors.white,
    fontFamily: 'Intrepid Regular',
    fontSize: 12,
    fontWeight: 'bold',
  },
  loadMoreButtonText: {
    fontSize: 14,
    color: globalColors.white,
    fontFamily: 'Intrepid Regular',
    textAlign: 'center',
  },
});

export default CategoryProducts;
