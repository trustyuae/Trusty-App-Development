import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet, RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Counter from '../../Components/Counter';
import Category from '../../Components/Category';
import { Images } from '../../Constants/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import PreviewImage from '../../Components/Preview/PreviewImage';
import { globalColors } from '../../Assets/Theme/globalColors';
import Product from '../../Components/Product/Product';
import HeadingImage from '../../Components/Preview/HeadingImage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { fetchCategories } from '../../Redux/Slice/categorySlice';
import { fetchProducts } from '../../Redux/Slice/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist } from '../../Redux/Slice/wishlistSlice';
import { getToken } from '../../Utils/localstorage';
import { SafeAreaView } from 'react-native';
import CustomStatusBar from '../../Components/StatusBar/CustomSatusBar';
const Home = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [newWitchList, setNewWitchList] = useState([]);
  const dispatch = useDispatch();
  const { categories, categoryStatus, categoryError } = useSelector(
    state => state.category,
  ); // Select category state from Redux store
  const { products, status, error } = useSelector(state => state.product);
  const { items } = useSelector(state => state.wishlist);
  const [tokenData, setTokenData] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  //  const [wishlist, setWishlist] = useState([items].map(item => ({id: item})));
  // console.log('inside home---->', products);
  useEffect(() => {
    data()

    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      data()
      dispatch(fetchProducts());
    }, [tokenData]) // Fetch data on focus or token change
  );

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await dispatch(fetchCategories());
      await dispatch(fetchProducts());
      data()
      const token = await getToken();
      if (token) {
        setTokenData(token);
        await dispatch(fetchWishlist(token));
      }
    } catch (error) {
      console.log('Error refreshing data:', error);
    }
    setRefreshing(false);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        if (token) {
          setTokenData(token);
          await dispatch(fetchWishlist(token));
        }
      } catch (error) {
        console.log('Error retrieving data:', error);
      }
    };
    fetchData();
  }, [dispatch, getToken]);
  const data = () => {
    if (items.Wishlist) {
      const itemIdList = items.Wishlist?.map(item => ({ id: item }));
      const productIds = new Set(itemIdList.map(item => Number(item.id)));
      const result = products.map(productItem => ({
        ...productItem,
        isWatchList: productIds.has(productItem.id),
      }));
      setWishlist(result);
    } else if (wishlist) {
      setWishlist(products);
    }
  }

  useEffect(() => {
    data()
  }, [items, products, categories, tokenData]);
  // console.log(
  //   '------======',
  //   wishlist?.map(data => console.log(data.isWatchList)),
  // );

  // useEffect(() => {
  //   dispatch(fetchWishlist(tokenData));
  // }, [tokenData, products, categories]);
  const navigateToCategoryProducts = category => {
    navigation.navigate('CategoryProducts', { category, products });
    // console.log("products",category);
  };
  const previewimages = {
    previewImages: Images.preview,
  };
  const onNextPress = () => {
    setStartIndex(startIndex => startIndex + 4);
  };
  const onBackPress = () => {
    setStartIndex(startIndex => Math.max(0, startIndex - 4));
  };

  return (
    <SafeAreaView style={{ backgroundColor: globalColors.statusBar }}>
      <View style={styles.container}>
        <CustomStatusBar color={globalColors.statusBar}></CustomStatusBar>
        {/* <StatusBar backgroundColor={globalColors.statusBar}></StatusBar> */}
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <HeadingImage />
          <Text style={styles.heading}>Our cave of wonders</Text>
          <PreviewImage uri={previewimages.previewImages} />
          <Text style={styles.heading}>Ready To Go</Text>
          <View style={styles.categoryContainer}>
            {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> */}
            {categories.map(category => (
              <Pressable
                key={category.id}
                onPress={() => navigateToCategoryProducts(category)}>
                <Category
                  key={category.id}
                  uri={category?.image?.src}
                  name={category.name}
                />
              </Pressable>
            ))}
            {/* </ScrollView> */}
          </View>
          <Text style={styles.heading}>Signature Selections</Text>
          <PreviewImage style={{ height: hp('10%') }} uri={Images.preview1} />
          <View style={{ flexDirection: 'column', marginTop: 15 }}>
            <View style={styles.productContainer}>
              {wishlist.slice(startIndex, startIndex + 4).map(product => (
                <Pressable
                  key={product?.id}
                  onPress={() =>
                    navigation.navigate('ProductDetail', {
                      userId: product.id,
                      isWatchList: product?.isWatchList,
                    })
                  }>
                  <Product
                    key={product?.id}
                    uri={product?.images[0]?.src}
                    name={product?.name}
                    price={product?.price}
                    saved={product?.saved}
                    product_id={product?.id}
                    isWatchList={product?.isWatchList}
                  />
                </Pressable>
              ))}
            </View>
            {/* </ScrollView> */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 10,
                paddingRight: 10,
                marginTop: 20,
                marginBottom: 20,
              }}>
              <TouchableOpacity
                onPress={onBackPress}
                disabled={startIndex === 0}
                style={{
                  backgroundColor: startIndex === 0 ? '#B9B9B9' : 'black',
                  borderRadius: wp('50%'),
                }}>
                <View>
                  <Icon
                    name="keyboard-arrow-left"
                    size={20}
                    color={globalColors.white}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onNextPress}
                disabled={startIndex + 4 >= products.length}
                style={{
                  backgroundColor:
                    startIndex + 4 >= products.length ? '#B9B9B9' : 'black',
                  borderRadius: wp('50%'),
                }}>
                <View>
                  <Icon
                    name="keyboard-arrow-right"
                    size={20}
                    color={globalColors.white}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.productContainer}>
              {wishlist.slice(startIndex + 2, startIndex + 4).map(product => (
                <Pressable
                  key={product?.id}
                  onPress={() =>
                    navigation.navigate('ProductDetail', { userId: product.id, isWatchList: product?.isWatchList, })
                  }>
                  <Product
                    key={product?.id}
                    uri={product?.images[0]?.src}
                    name={product?.name}
                    price={product?.price}
                    saved={product?.saved}
                    product_id={product?.id}
                    isWatchList={product?.isWatchList}></Product>
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: globalColors.headingBackground,
    justifyContent: 'center',
  },
  productContainer: {
    flexDirection: 'row',
    marginRight: wp('2.5%'),
    marginLeft: wp('2.5%'),
    alignItems: 'center',
    marginTop: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  bestSellerContiner: {
    backgroundColor: globalColors.white,
    marginBottom: hp('10%'),
  },
  heading: {
    textAlign: 'center',
    fontFamily: 'Intrepid Regular',
    fontWeight: '600',
    fontSize: 22,
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
    color: globalColors.black,
  },
  onBackPress: {
    alignItems: 'flex-start',
    // backgroundColor: 'black',
    width: 20,
    marginLeft: wp('3%'),
    borderRadius: 20,
    height: 20,
  },
  onNextPress: {
    alignItems: 'flex-end',
    marginTop: hp('-2.7%'),
    marginLeft: wp('90%'),
    width: 20,
    height: 20,
    borderRadius: 20,
    // backgroundColor: globalColors.black,
  },
  enabledButton: {
    backgroundColor: globalColors.black,
  },
  disabledButton: {
    backgroundColor: '#B9B9B9',
  },
});
export default Home;
